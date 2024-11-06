<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

// Kết nối cơ sở dữ liệu
$host = 'localhost';
$user = 'root';  // Tên người dùng cơ sở dữ liệu
$password = '';  // Mật khẩu của cơ sở dữ liệu
$database = 'qlqa';  // Tên cơ sở dữ liệu

$conn = new mysqli($host, $user, $password, $database);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

// Lấy danh sách tất cả danh mục
$sql = "SELECT id, name, slug, description, image_url FROM categories";
$result = $conn->query($sql);

$categories = [];

if ($result->num_rows > 0) {
    // Lưu kết quả vào mảng
    while ($row = $result->fetch_assoc()) {
        // Chỉnh sửa đường dẫn hình ảnh
        $baseUrl = 'http://localhost/quanaonam/DANHMUC/uploads/'; // Căn cứ đường dẫn
        $row['image_url'] = $baseUrl . basename($row['image_url']);
        $categories[] = $row;
    }
}

// Trả về dữ liệu dưới dạng JSON
header('Content-Type: application/json');
echo json_encode(['success' => true, 'data' => $categories]);

$conn->close();
?>
