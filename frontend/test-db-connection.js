/**
 * Database Connection Test
 * Tests MySQL connectivity before running setup
 */

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

async function testConnection() {
  console.log('🔍 DATABASE CONNECTION TEST');
  console.log('═'.repeat(50));
  
  console.log('\n📋 Configuration:');
  console.log(`   Host: ${process.env.MYSQL_HOST || 'localhost'}`);
  console.log(`   User: ${process.env.MYSQL_USER || 'root'}`);
  console.log(`   Database: ${process.env.MYSQL_DATABASE || 'dexaura'}`);
  console.log(`   Password: ${process.env.MYSQL_PASSWORD ? '***' : '(empty)'}`);
  
  let connection;
  try {
    console.log('\n🔗 Attempting connection...');
    
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      waitForConnections: true,
      connectionLimit: 1,
      queueLimit: 0
    });

    console.log('✅ Connected to MySQL successfully!');

    // Test basic query
    const [result] = await connection.execute('SELECT VERSION()');
    console.log(`✅ MySQL Version: ${result[0]['VERSION()']}`);

    // Check if database exists
    const [databases] = await connection.execute(`SHOW DATABASES LIKE '${process.env.MYSQL_DATABASE || 'dexaura'}'`);
    if (databases.length > 0) {
      console.log(`✅ Database '${process.env.MYSQL_DATABASE || 'dexaura'}' exists`);
      
      // Check tables in database
      await connection.execute(`USE ${process.env.MYSQL_DATABASE || 'dexaura'}`);
      const [tables] = await connection.execute('SHOW TABLES');
      console.log(`✅ Tables found: ${tables.length}`);
      if (tables.length > 0) {
        console.log('   Tables:');
        tables.forEach(t => console.log(`   - ${Object.values(t)[0]}`));
      }
    } else {
      console.log(`⚠️  Database '${process.env.MYSQL_DATABASE || 'dexaura'}' does NOT exist (will be created by setup-db.js)`);
    }

    console.log('\n✨ All checks passed! You can run: npm run setup-db');
    return true;

  } catch (error) {
    console.error('\n❌ Connection failed!');
    console.error(`   Error: ${error.message}`);
    console.error(`   Code: ${error.code}`);
    
    console.log('\n🔧 Troubleshooting:');
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('   → MySQL server disconnected');
    } else if (error.code === 'ER_ACCESS_DENIED_FOR_USER') {
      console.log('   → Check MYSQL_PASSWORD in .env file');
      console.log('   → Run: mysql -u root -p (and enter password to verify)');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('   → MySQL server is not running');
      console.log('   → Windows: net start MySQL80');
      console.log('   → macOS: brew services start mysql');
      console.log('   → Linux: sudo systemctl start mysql');
    } else if (error.code === 'ENOTFOUND') {
      console.log('   → Cannot resolve hostname');
      console.log('   → Check MYSQL_HOST in .env (should be "localhost" for local MySQL)');
    } else {
      console.log(`   → Check .env credentials`);
      console.log(`   → Verify MySQL service is running`);
    }
    
    return false;
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n✅ Connection closed');
    }
  }
}

testConnection().then(success => {
  process.exit(success ? 0 : 1);
});
