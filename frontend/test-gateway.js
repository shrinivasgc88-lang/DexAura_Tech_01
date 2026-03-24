#!/bin/bash or node
/**
 * Test PHP Gateway Connection
 * Checks if the PHP contact.php is reachable
 */

const axios = require('axios');

const PHP_GATEWAY = 'https://dexaura.org/api/contact.php';

async function testGateway() {
  console.log('🔍 Testing PHP Gateway Connection');
  console.log('═'.repeat(50));
  console.log(`\nTarget: ${PHP_GATEWAY}\n`);

  try {
    console.log('Attempting GET request (test)...');
    const response = await axios.get(PHP_GATEWAY, {
      timeout: 10000,
      headers: {
        'User-Agent': 'DexAura-Contact-Tester/1.0'
      }
    });

    console.log('✅ PHP Gateway is REACHABLE');
    console.log(`Status: ${response.status}`);
    console.log(`Response: ${JSON.stringify(response.data, null, 2)}`);

  } catch (error) {
    console.error('❌ PHP Gateway is NOT reachable');
    console.error(`\nError: ${error.message}`);
    console.error(`Code: ${error.code}`);

    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Response: ${error.response.data}`);
    }

    console.log('\n🔧 Troubleshooting:');
    console.log('1. Upload contact-api.php to dexaura.org/api/contact.php');
    console.log('2. Make sure the file path is correct');
    console.log('3. Check file permissions (644 or 755)');
    console.log('4. Verify the PHP file is readable');
    console.log('5. Check for PHP errors in your hosting logs');
  }
}

testGateway();
