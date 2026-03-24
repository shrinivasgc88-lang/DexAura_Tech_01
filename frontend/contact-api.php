<?php
/**
 * Contact Form API Gateway
 * Saves contact submissions to MySQL database
 * Place this at: https://dexaura.org/api/contact.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database credentials (use same as in .env)
$db_host = 'localhost';
$db_user = 'u556304640_DexAura_User';
$db_password = 'DexAura@8867';
$db_name = 'u556304640_DexAura';

try {
    // Create connection
    $conn = new mysqli($db_host, $db_user, $db_password, $db_name);
    
    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }
    
    // Handle POST request
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields: name, email, message']);
            exit;
        }
        
        // Prepare the statement
        $stmt = $conn->prepare("
            INSERT INTO contact_submissions 
            (name, email, phone, country, company, subject, message, submission_type, status, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new', NOW())
        ");
        
        if (!$stmt) {
            throw new Exception("Prepare failed: " . $conn->error);
        }
        
        // Bind parameters
        $stmt->bind_param(
            'ssssssss',
            $data['name'],
            $data['email'],
            $data['phone'] ?? null,
            $data['country'] ?? null,
            $data['company'] ?? null,
            $data['subject'] ?? 'general',
            $data['message'],
            $data['submission_type'] ?? 'general'
        );
        
        // Execute
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode([
                'success' => true,
                'id' => $conn->insert_id,
                'message' => 'Contact submission saved successfully',
                'data' => [
                    'id' => $conn->insert_id,
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'phone' => $data['phone'] ?? null,
                    'country' => $data['country'] ?? null,
                    'company' => $data['company'] ?? null,
                    'subject' => $data['subject'] ?? 'general',
                    'message' => $data['message'],
                    'submission_type' => $data['submission_type'] ?? 'general',
                    'status' => 'new',
                    'created_at' => date('Y-m-d H:i:s')
                ]
            ]);
        } else {
            throw new Exception("Execute failed: " . $stmt->error);
        }
        
        $stmt->close();
    }
    // Handle GET request (optional - for testing)
    else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $result = $conn->query("SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 100");
        
        if (!$result) {
            throw new Exception("Query failed: " . $conn->error);
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
    }
    
    $conn->close();
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
