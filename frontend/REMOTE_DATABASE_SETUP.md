# DexAura Contact Form - Remote Database Setup Guide

## Architecture

```
React Frontend (Contact.jsx)
         ↓
         ↓ POST /api/contact
         ↓
Node.js Express Server (port 5000)
         ↓
         ↓ Forward request via HTTP
         ↓
PHP Gateway (dexaura.org/api/contact.php)
         ↓
         ↓ INSERT query
         ↓
Remote MySQL (dexaura.org database)
```

---

## 📋 Setup Steps

### **Step 1: Upload PHP Gateway to dexaura.org**

1. **Get the PHP Gateway file:**
   - File: `frontend/contact-api.php` (in your project)

2. **Upload via cPanel File Manager or FTP:**
   - Go to: `public_html/api/`
   - If `api` folder doesn't exist, create it
   - Upload `contact-api.php` (rename to `contact.php`)

3. **File should be at:**
   ```
   https://dexaura.org/api/contact.php
   ```

4. **Test the PHP gateway (optional):**
   - Visit: `https://dexaura.org/api/contact.php` in your browser
   - Should return: `{"success":true,"total":0,"data":[]}`

---

### **Step 2: Create database_contact_submissions Table**

**Check if table exists:**

1. Go to **cPanel → phpMyAdmin**
2. Select database: `u556304640_DexAura`
3. Check if table `contact_submissions` exists

**If NOT, create it:**

1. Click on database name
2. Click "SQL" tab
3. Copy and paste this SQL:

```sql
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
```

4. Click "Go" or "Execute"
5. Should see: "✓ Table created successfully"

---

### **Step 3: Update .env on Your Local Machine**

Update `frontend/.env`:

```env
REACT_APP_BACKEND_URL=http://0.0.0.0:8000
REACT_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE

# MySQL Database Configuration (Remote)
MYSQL_HOST=dexaura.org
MYSQL_USER=u556304640_DexAura_User
MYSQL_PASSWORD=DexAura@8867
MYSQL_DATABASE=u556304640_DexAura

# Node.js Server Configuration
PORT=5000
NODE_ENV=development
REACT_APP_API_URL=http://localhost:5000
```

---

### **Step 4: Install Dependencies**

```bash
cd frontend
npm install
```

---

### **Step 5: Start the Servers**

**Terminal 1 - Start Node.js Server:**
```bash
cd frontend
npm run server
```

You should see:
```
╔════════════════════════════════════════╗
║  DexAura Contact API Server            ║
║  Port: 5000                            ║
║  Mode: Remote MySQL via PHP Gateway   ║
║  Gateway: dexaura.org/api/contact.php ║
╚════════════════════════════════════════╝
```

**Terminal 2 - Start React Frontend:**
```bash
cd frontend
npm start
```

---

### **Step 6: Test the Contact Form**

1. Open: `http://localhost:3000/contact`
2. Fill out the form
3. Click "Send Message"
4. You should see: **"Message sent successfully! We'll get back to you soon."**

---

## ✅ Verify Data Saved

### **Check in cPanel phpMyAdmin:**

1. Go to cPanel → phpMyAdmin
2. Select database: `u556304640_DexAura`
3. Click on `contact_submissions` table
4. Click "Browse" tab
5. Should see your submission!

---

## 🔧 Troubleshooting

### **Error: "Cannot reach PHP gateway at dexaura.org"**

**Solution:**
1. Check if PHP file was uploaded correctly
2. Navigate to: `https://dexaura.org/api/contact.php`
3. Should show JSON response

### **Error: "Missing database table"**

**Solution:**
1. Go to phpMyAdmin
2. Make sure `contact_submissions` table exists
3. Run the CREATE TABLE SQL from Step 2

### **Error: "Database connection failed"**

**Solution:**
1. Verify credentials in PHP file match .env
2. Check if your hosting supports remote connections from PHP
3. Login to cPanel and test database directly

### **No data appears in database**

**Solution:**
1. Check browser console for errors (F12)
2. Check server logs in Terminal 1
3. Verify PHP gateway is returning success response

---

## 📊 API Endpoints

### **POST /api/contact** - Submit Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Test message"
  }'
```

---

## 🎯 What Happens When You Submit:

1. ✓ React form sends POST to `http://localhost:5000/api/contact`
2. ✓ Node.js server receives and validates data
3. ✓ Server forwards to `https://dexaura.org/api/contact.php`
4. ✓ PHP script connects to remote MySQL
5. ✓ Data inserted into `contact_submissions` table
6. ✓ Response returned to React
7. ✓ Success message shown to user

---

## 📁 Files Involved

| File | Purpose |
|------|---------|
| `frontend/server.js` | Node.js Express gateway |
| `frontend/contact-api.php` | PHP database handler (upload to dexaura.org) |
| `frontend/.env` | Configuration |
| `frontend/src/pages/Contact.jsx` | React form |
| `frontend/src/utils/api.js` | API client |

---

## 🚀 Next Steps

After confirmation:

1. ✅ Contact form saves to remote database
2. Create admin dashboard to view submissions
3. Add email notifications when contacted
4. Implement chat history storage
5. Add authentication for admin panel

---

## 📞 Support

If you encounter any issues:

1. Check PHP gateway is reachable: `https://dexaura.org/api/contact.php`
2. Verify database credentials match
3. Check phpMyAdmin for table and data
4. Review error logs in terminal
5. Check browser console (F12) for errors

---

**Ready to deploy!** 🎉
