<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

// Kết nối đến cơ sở dữ liệu
$host = 'localhost';
$dbname = 'qlqa';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Lấy danh sách người dùng
    $stmt = $pdo->prepare("SELECT id, username, email, phone, address, role_as FROM users");
    $stmt->execute();

    // Trả về dữ liệu dưới dạng JSON
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Kiểm tra và chỉ trả về người dùng có role_as = 0
    $filteredUsers = array_filter($users, function($user) {
        return $user['role_as'] === "0";
    });
    
    echo json_encode(array_values($filteredUsers));

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
