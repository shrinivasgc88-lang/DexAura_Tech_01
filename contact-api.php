<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database Configuration
$db_host = 'dexaura.org';
$db_user = 'u556304640_DexAura_User';
$db_password = 'DexAura@8867';
$db_name = 'u556304640_DexAura';

// mysqli connection
$mysqli = new mysqli($db_host, $db_user, $db_password, $db_name);

// Check connection
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database connection failed',
        'message' => $mysqli->connect_error,
        'code' => 'DB_CONNECTION_ERROR'
    ]);
    exit;
}

// Set charset
$mysqli->set_charset("utf8mb4");

// Create contacts table if it doesn't exist
$create_table_sql = "CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    country VARCHAR(10),
    company VARCHAR(255),
    subject VARCHAR(100),
    message LONGTEXT NOT NULL,
    submission_type VARCHAR(50),
    status VARCHAR(20) DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
)";

if (!$mysqli->query($create_table_sql)) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to create table',
        'message' => $mysqli->error,
        'code' => 'TABLE_ERROR'
    ]);
    exit;
}

// Get request method and action
$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : 'submit';

try {
    switch ($method) {
        case 'POST':
            // Handle form submission
            if ($action === 'submit' || !isset($_GET['action'])) {
                $data = json_decode(file_get_contents('php://input'), true);
                
                // Validate required fields
                if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
                    throw new Exception('Missing required fields: name, email, message');
                }
                
                // Prepare and execute insert
                $stmt = $mysqli->prepare("
                    INSERT INTO contact_submissions 
                    (name, email, phone, country, company, subject, message, submission_type, status) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new')
                ");
                
                if (!$stmt) {
                    throw new Exception($mysqli->error);
                }
                
                $stmt->bind_param(
                    'ssssssss',
                    $data['name'],
                    $data['email'],
                    $data['phone'],
                    $data['country'],
                    $data['company'],
                    $data['subject'],
                    $data['message'],
                    $data['submission_type']
                );
                
                if (!$stmt->execute()) {
                    throw new Exception($stmt->error);
                }
                
                $id = $stmt->insert_id;
                $stmt->close();
                
                http_response_code(201);
                echo json_encode([
                    'success' => true,
                    'id' => $id,
                    'message' => 'Contact submission saved to MySQL database',
                    'data' => array_merge($data, [
                        'id' => $id,
                        'status' => 'new',
                        'created_at' => date('c')
                    ])
                ]);
            }
            break;
            
        case 'GET':
            // Handle GET requests
            if ($action === 'list') {
                $result = $mysqli->query("
                    SELECT * FROM contact_submissions 
                    ORDER BY created_at DESC
                    LIMIT 100
                ");
                
                if (!$result) {
                    throw new Exception($mysqli->error);
                }
                
                $submissions = [];
                while ($row = $result->fetch_assoc()) {
                    $submissions[] = $row;
                }
                
                echo json_encode([
                    'success' => true,
                    'total' => count($submissions),
                    'data' => $submissions
                ]);
                
            } else if ($action === 'get') {
                $id = isset($_GET['id']) ? intval($_GET['id']) : null;
                
                if (!$id) {
                    throw new Exception('Missing ID parameter');
                }
                
                $stmt = $mysqli->prepare("
                    SELECT * FROM contact_submissions 
                    WHERE id = ?
                ");
                
                if (!$stmt) {
                    throw new Exception($mysqli->error);
                }
                
                $stmt->bind_param('i', $id);
                if (!$stmt->execute()) {
                    throw new Exception($stmt->error);
                }
                
                $result = $stmt->get_result();
                $submission = $result->fetch_assoc();
                $stmt->close();
                
                if (!$submission) {
                    http_response_code(404);
                    echo json_encode(['error' => 'Submission not found']);
                } else {
                    echo json_encode([
                        'success' => true,
                        'data' => $submission
                    ]);
                }
                
            } else if ($action === 'health') {
                echo json_encode([
                    'status' => 'healthy',
                    'database' => 'connected',
                    'gateway' => 'operational'
                ]);
            }
            break;
            
        case 'PATCH':
            // Handle status updates
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (empty($data['id']) || empty($data['status'])) {
                throw new Exception('Missing id or status field');
            }
            
            $stmt = $mysqli->prepare("
                UPDATE contact_submissions 
                SET status = ? 
                WHERE id = ?
            ");
            
            if (!$stmt) {
                throw new Exception($mysqli->error);
            }
            
            $stmt->bind_param('si', $data['status'], $data['id']);
            
            if (!$stmt->execute()) {
                throw new Exception($stmt->error);
            }
            
            $stmt->close();
            
            echo json_encode([
                'success' => true,
                'message' => 'Status updated successfully'
            ]);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Request failed',
        'message' => $e->getMessage(),
        'code' => 'REQUEST_ERROR'
    ]);
} finally {
    $mysqli->close();
}
?>
