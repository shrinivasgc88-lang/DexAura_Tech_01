/**
 * Database Setup Script - Creates MySQL tables for contact submissions
 * Run this once: node setup-db.js
 */

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

async function setupDatabase() {
  let connection;
  try {
    // Create connection to MySQL server (without database)
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      connectTimeout: 30000, // 30 second timeout for remote servers
      enableKeepAlive: true
    });

    console.log('✅ Connected to MySQL Server');

    const dbName = process.env.MYSQL_DATABASE || 'dexaura';

    // Create database if it doesn't exist
    console.log(`📦 Creating database '${dbName}' if not exists...`);
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`✅ Database '${dbName}' ready`);

    // Select the database
    await connection.execute(`USE ${dbName}`);

    // Create contact_submissions table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        country VARCHAR(10),
        company VARCHAR(255),
        subject VARCHAR(100) DEFAULT 'general',
        message LONGTEXT NOT NULL,
        submission_type VARCHAR(50) DEFAULT 'general',
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_status (status),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    console.log('📋 Creating table: contact_submissions...');
    await connection.execute(createTableQuery);
    console.log('✅ Table created successfully');

    // Display table structure
    console.log('\n📊 Table Structure:');
    const [columns] = await connection.execute('DESCRIBE contact_submissions');
    console.table(columns);

    console.log('\n✨ Database setup completed successfully!');
    console.log('\nYou can now:');
    console.log('1. Start the server: npm run server');
    console.log('2. Contact form submissions will be saved to MySQL');

  } catch (error) {
    console.error('❌ Database setup error:', error.message);
    console.error('Full error details:', error);
    console.error('\nTroubleshooting tips:');
    console.error('1. Check if MySQL is running: tasklist | findstr mysql');
    console.error('2. Verify credentials in .env file');
    console.error('3. Test connection: mysql -u root -p');
    console.error('4. Ensure npm install was run: npm install');
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
