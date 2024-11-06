<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Kết nối đến cơ sở dữ liệu
$host = "localhost";
$db_name = "qlqa"; // Tên cơ sở dữ liệu của bạn
$username = "root"; // Tên đăng nhập của MySQL
$password = ""; // Mật khẩu của MySQL

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(["success" => false, "message" => "Kết nối thất bại: " . $e->getMessage()]);
    exit;
}

// Nhận dữ liệu JSON từ yêu cầu POST
$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) && isset($data->password)) {
    $email = $data->email;
    $password = $data->password;

    // Truy vấn người dùng từ cơ sở dữ liệu
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    
    // Kiểm tra nếu người dùng tồn tại
    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Kiểm tra mật khẩu
        if (password_verify($password, $user['password'])) {
            // Đăng nhập thành công, trả về id và role_as của người dùng
            echo json_encode([
                "success" => true,
                "message" => "Đăng nhập thành công!",
                "id" => $user['id'], // Gửi thông tin ID người dùng
                "role_as" => $user['role_as'] // Gửi thông tin vai trò
            ]);
        } else {
            // Mật khẩu không chính xác
            echo json_encode(["success" => false, "message" => "Mật khẩu không chính xác!"]);
        }
    } else {
        // Người dùng không tồn tại
        echo json_encode(["success" => false, "message" => "Email không tồn tại!"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Thiếu thông tin!"]);
}

// Đóng kết nối
$conn = null;
?>
