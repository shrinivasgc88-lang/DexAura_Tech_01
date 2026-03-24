const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PHP Gateway URL for remote MySQL
const PHP_GATEWAY = 'https://dexaura.org/api/contact.php';

// Test API endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'Node.js Server Running', 
    message: 'DexAura Contact API',
    mode: 'Remote MySQL via PHP Gateway',
    gateway: PHP_GATEWAY
  });
});

// Contact Form Submission Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, country, company, subject, message, submission_type } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({
        error: 'Missing required fields: name, email, message',
        code: 'VALIDATION_ERROR'
      });
    }

    console.log(`[CONTACT] Received submission from ${email}`);
    console.log(`[CONTACT] Forwarding to PHP gateway: ${PHP_GATEWAY}`);

    // Forward to PHP gateway
    const response = await axios.post(PHP_GATEWAY, {
      name,
      email,
      phone: phone || '',
      country: country || '',
      company: company || '',
      subject: subject || 'general',
      message,
      submission_type: submission_type || 'general'
    }, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'DexAura-Contact-API/1.0'
      },
      maxRedirects: 5
    });

    console.log(`✅ Contact submission saved: ID ${response.data.id}`);
    
    res.status(201).json(response.data);

  } catch (error) {
    console.error('❌ Contact submission error:');
    console.error(`   Message: ${error.message}`);
    console.error(`   Code: ${error.code}`);
    
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Response: ${JSON.stringify(error.response.data)}`);
      
      res.status(error.response.status || 500).json({
        error: error.response.data.error || 'Failed to save contact submission',
        message: error.response.data.message || error.message,
        code: 'GATEWAY_ERROR'
      });
    } else if (error.code === 'ECONNREFUSED') {
      console.error(`   Cannot connect to PHP gateway`);
      res.status(503).json({
        error: 'PHP gateway is not reachable',
        message: 'Please ensure contact.php is uploaded to https://dexaura.org/api/contact.php',
        code: 'GATEWAY_UNREACHABLE'
      });
    } else if (error.code === 'ENOTFOUND') {
      console.error(`   Cannot resolve domain`);
      res.status(503).json({
        error: 'Cannot reach dexaura.org',
        message: 'Check your internet connection',
        code: 'DNS_ERROR'
      });
    } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      console.error(`   Request timeout`);
      res.status(504).json({
        error: 'PHP gateway request timeout',
        message: 'The server took too long to respond. Please try again.',
        code: 'TIMEOUT'
      });
    } else {
      console.error(`   Unknown error: ${error.stack}`);
      res.status(500).json({
        error: 'Failed to save contact submission',
        message: error.message,
        code: 'SERVER_ERROR'
      });
    }
  }
});

// Get all submissions
app.get('/api/contact/submissions', async (req, res) => {
  try {
    const response = await axios.get(PHP_GATEWAY + '?action=list', { timeout: 5000 });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch submissions',
      message: error.message
    });
  }
});

// Get single submission
app.get('/api/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(PHP_GATEWAY + `?action=get&id=${id}`, { timeout: 5000 });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch submission',
      message: error.message
    });
  }
});

// Update submission status
app.patch('/api/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const response = await axios.patch(PHP_GATEWAY, {
      action: 'update',
      id,
      status
    }, { timeout: 5000 });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update submission',
      message: error.message
    });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const response = await axios.get(PHP_GATEWAY + '?action=health', { timeout: 5000 });
    res.json(response.data);
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      gateway: 'unreachable',
      message: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start Server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  DexAura Contact API Server            ║
║  Port: ${PORT}                               ║
║  Mode: Remote MySQL via PHP Gateway   ║
║  Gateway: https://dexaura.org/api/contact.php ║
╚════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n✋ Shutting down gracefully...');
  process.exit(0);
});
