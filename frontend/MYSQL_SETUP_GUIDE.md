# DexAura Contact Form - MySQL Setup Guide

## Architecture Overview

```
React Frontend (Contact.jsx)
         ↓
         ↓ POST /api/contact
         ↓
Node.js Express Server (server.js)
         ↓
         ↓ INSERT INTO MySQL
         ↓
MySQL Database (contact_submissions table)
```

---

## Installation Steps

### 1. **Configure MySQL Connection**

Edit `frontend/.env` and set your MySQL credentials:

```env
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=dexaura
PORT=5000
REACT_APP_API_URL=http://localhost:5000
```

**Note:** Change `MYSQL_PASSWORD` to your actual MySQL root password.

---

### 2. **Install Dependencies**

```bash
cd frontend
npm install
```

This will install:
- `express` - Web server
- `mysql2` - MySQL driver with promise support
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variables
- `concurrently` - Run multiple commands

---

### 3. **Create Database and Table**

Run the database setup script (do this once):

```bash
npm run setup-db
```

This will:
- ✅ Create the `dexaura` database (if it doesn't exist)
- ✅ Create the `contact_submissions` table
- ✅ Set up proper indexes

**Output should look like:**
```
✅ Connected to MySQL Server
📦 Creating database 'dexaura' if not exists...
✅ Database 'dexaura' ready
📋 Creating table: contact_submissions...
✅ Table created successfully

📊 Table Structure:
┌────┬──────────────┬────────┬──────┬─────────┬──────────────┐
│ id │ Field        │ Type   │ Null │ Key     │ Default      │
├────┼──────────────┼────────┼──────┼─────────┼──────────────┤
│ 1  │ id           │ int    │ NO   │ PRI     │ NULL         │
│ 2  │ name         │ varchar│ NO   │         │ NULL         │
│ 3  │ email        │ varchar│ NO   │ MUL     │ NULL         │
│ 4  │ phone        │ varchar│ YES  │         │ NULL         │
│ ... (more columns)
```

---

### 4. **Start the Node.js Server**

```bash
npm run server
```

**Expected output:**
```
╔════════════════════════════════════════╗
║  DexAura Node.js Contact API Server    ║
║  Port: 5000                            ║
║  MySQL: Connected                      ║
╚════════════════════════════════════════╝
```

---

### 5. **Start React Frontend (in another terminal)**

```bash
npm start
```

Or use concurrently to start both together:

```bash
npm run dev
```

---

## API Endpoints

### **POST /api/contact** - Submit Contact Form
Submit a new contact form submission.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "country": "+91",
  "company": "ABC Corp",
  "subject": "quote",
  "message": "I need a quote for...",
  "submission_type": "general"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "id": 1,
  "message": "Contact submission saved successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+919876543210",
    "country": "+91",
    "company": "ABC Corp",
    "subject": "quote",
    "message": "I need a quote for...",
    "submission_type": "general",
    "status": "new",
    "created_at": "2024-03-23T10:30:00Z"
  }
}
```

---

### **GET /api/contact/submissions** - List All Submissions
Retrieve all contact submissions (last 100).

**Response:**
```json
{
  "success": true,
  "total": 5,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "status": "new",
      "created_at": "2024-03-23T10:30:00Z"
    },
    ...
  ]
}
```

---

### **GET /api/contact/:id** - Get Single Submission
Retrieve a specific contact submission.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "...",
    "status": "new",
    "created_at": "2024-03-23T10:30:00Z"
  }
}
```

---

### **PATCH /api/contact/:id** - Update Submission Status
Update the status of a contact submission.

**Request:**
```json
{
  "status": "contacted"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Status updated"
}
```

---

## Database Schema

### `contact_submissions` Table

```sql
CREATE TABLE contact_submissions (
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
```

---

## Troubleshooting

### **Error: "Cannot create connection - ECONNREFUSED"**
- MySQL server is not running
- Check credentials in `.env`
- Verify MySQL is listening on port 3306

**Fix:**
```bash
# Windows
net start MySQL80  # or your MySQL version

# macOS
brew services start mysql

# Linux
sudo systemctl start mysql
```

---

### **Error: "Access denied for user 'root'@'localhost'"**
- Wrong MySQL password in `.env`

**Fix:**
```bash
# Test MySQL connection
mysql -u root -p

# Then enter your password
```

---

### **Error: "Unknown database 'dexaura'"**
- Database hasn't been created yet

**Fix:**
```bash
npm run setup-db
```

---

### **Frontend shows "Network Error" on submit**
- Node.js server is not running
- Make sure to run `npm run server` first

---

## File Structure

```
frontend/
├── server.js              ← Node.js Express server
├── setup-db.js            ← Database setup script
├── .env                   ← MySQL configuration
├── package.json           ← Dependencies + scripts
├── src/
│   ├── pages/
│   │   └── Contact.jsx    ← Updated to use contactApi
│   └── utils/
│       └── api.js         ← Updated with contactApi
└── ...
```

---

## Development Workflow

### **Option 1: Run Both Simultaneously**
```bash
npm run dev
```
This starts the Node.js server and React dev server in parallel.

### **Option 2: Run Separately**
Terminal 1:
```bash
npm run server
```

Terminal 2:
```bash
npm start
```

---

## Production Deployment

### **For Production:**

1. **Update `.env`:**
```env
NODE_ENV=production
MYSQL_HOST=your-production-mysql-host
MYSQL_USER=prod_user
MYSQL_PASSWORD=secure_password
MYSQL_DATABASE=dexaura_prod
```

2. **Build React:**
```bash
npm run build
```

3. **Serve both:**
```bash
NODE_ENV=production npm run server
```

4. **Use a process manager (PM2):**
```bash
npm install -g pm2
pm2 start server.js --name "dexaura-contact-api"
```

---

## Testing

### **Test with cURL:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test"
  }'
```

### **Test with Postman:**
1. Set method to `POST`
2. URL: `http://localhost:5000/api/contact`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "name": "John",
  "email": "john@test.com",
  "message": "Test message"
}
```

---

## Next Steps

1. ✅ Forms now save to MySQL via Node.js
2. Consider adding authentication to admin endpoints
3. Add email notifications when contacted
4. Create admin dashboard to view submissions
5. Add chat history storage to MySQL

---

## Support

If you encounter issues:
1. Check console logs in browser (F12)
2. Check terminal output from Node.js server
3. Verify MySQL connection with: `mysql -u root -p -e "USE dexaura; SELECT * FROM contact_submissions;"`
4. Ensure ports 3000 (React) and 5000 (Node) are available
