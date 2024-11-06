<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Database connection parameters
$host = 'localhost';
$dbName = 'qlqa';
$username = 'root'; // Replace with your database username
$password = ''; // Replace with your database password

// Create a connection to the database
$conn = new mysqli($host, $username, $password, $dbName);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set response type to JSON
header('Content-Type: application/json');

// Query to fetch contact messages
$sql = "SELECT * FROM contacts"; 

$result = $conn->query($sql);

$messages = [];

if ($result->num_rows > 0) {
    // Fetch all messages
    while ($row = $result->fetch_assoc()) {
        $messages[] = [
            'id' => $row['id'],
            'user_id' => $row['user_id'],
            'name' => $row['name'],
            'email' => $row['email'],
            'subject' => $row['subject'],
            'message' => $row['message'],
            'created_at' => $row['created_at'],
        ];
    }
}

// Output the result as JSON
echo json_encode($messages);

// Close the database connection
$conn->close();
?>
