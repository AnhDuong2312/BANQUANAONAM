<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: POST");

// Kết nối cơ sở dữ liệu
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'qlqa';

$conn = new mysqli($host, $user, $password, $database);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

// Kiểm tra xem yêu cầu có phải là POST không
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Kiểm tra các trường có tồn tại không
    if (isset($_POST['id'], $_POST['name'], $_POST['slug'], $_POST['description'])) {
        $id = $_POST['id'];
        $name = $_POST['name'];
        $slug = $_POST['slug'];
        $description = $_POST['description'];
        
        $image_url = ''; // Khởi tạo biến hình ảnh
        if (isset($_FILES['image']) && $_FILES['image']['error'] == UPLOAD_ERR_OK) {
            $target_dir = "uploads/"; // Thư mục để lưu file
            $target_file = $target_dir . basename($_FILES["image"]["name"]);
            move_uploaded_file($_FILES["image"]["tmp_name"], $target_file); // Di chuyển file vào thư mục

            $image_url = $target_file; // Lưu đường dẫn file
        }

        // Cập nhật dữ liệu vào cơ sở dữ liệu
        $sql = "UPDATE categories SET name=?, slug=?, description=?, image_url=? WHERE id=?";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) {
            echo json_encode(["message" => "Lỗi chuẩn bị câu truy vấn: " . $conn->error]);
            exit;
        }

        // Liên kết các tham số với câu truy vấn
        $stmt->bind_param("ssssi", $name, $slug, $description, $image_url, $id);
        $stmt->execute();

        // Kiểm tra xem có hàng nào được cập nhật không
        if ($stmt->affected_rows > 0) {
            echo json_encode(["message" => "Cập nhật thành công", "updated_id" => $id]);
        } else {
            echo json_encode(["message" => "Không có thay đổi nào được thực hiện hoặc không tìm thấy danh mục."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["message" => "Thiếu thông tin trong yêu cầu."]);
    }
} else {
    echo json_encode(["message" => "Phương thức không hợp lệ."]);
}

// Đóng kết nối
$conn->close();
?>
