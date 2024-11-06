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

if (isset($data->username) && isset($data->email) && isset($data->phone) && isset($data->address) && isset($data->password)) {
    $username = $data->username;
    $email = $data->email;
    $phone = $data->phone;
    $address = $data->address;
    $password = password_hash($data->password, PASSWORD_DEFAULT); // Mã hóa mật khẩu
    $role_as = 0; // Mặc định vai trò là người dùng (0)

    // Kiểm tra xem người dùng đã tồn tại hay chưa
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username OR email = :email");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => false, "message" => "Tên người dùng hoặc email đã tồn tại."]);
    } else {
        // Thêm người dùng mới vào cơ sở dữ liệu
        $stmt = $conn->prepare("INSERT INTO users (username, email, phone, address, password, role_as) VALUES (:username, :email, :phone, :address, :password, :role_as)");
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':role_as', $role_as);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Đăng ký thành công!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Đăng ký thất bại!"]);
        }
    }
} else {
    echo json_encode(["success" => false, "message" => "Thiếu thông tin!"]);
}

// Đóng kết nối
$conn = null;
?>
