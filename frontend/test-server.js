const http = require('http');

// Test the server
const options = {
  hostname: 'localhost',
  port: 8001,
  path: '/',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('✅ SERVER IS RUNNING!');
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.log('❌ SERVER NOT RESPONDING');
  console.log('Error:', error.message);
  process.exit(1);
});

req.on('timeout', () => {
  console.log('❌ SERVER TIMEOUT');
  req.destroy();
  process.exit(1);
});

req.end();
