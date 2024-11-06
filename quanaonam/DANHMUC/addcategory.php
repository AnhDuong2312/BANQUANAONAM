<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Kiểm tra phương thức yêu cầu
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Kết nối với database
    $conn = new mysqli("localhost", "root", "", "qlqa");

    if ($conn->connect_error) {
        die(json_encode(["success" => false, "message" => "Kết nối database thất bại."]));
    }

    // Nhận các trường từ form
    $name = $_POST['name'];
    $slug = $_POST['slug'];
    $description = $_POST['description'];

    // Xử lý upload hình ảnh
    if (isset($_FILES['image']) && $_FILES['image']['error'] == UPLOAD_ERR_OK) {
        $image = $_FILES['image'];
        $imagePath = 'uploads/' . basename($image['name']);
        
        // Kiểm tra nếu thư mục không tồn tại, tạo thư mục
        if (!is_dir('uploads')) {
            mkdir('uploads', 0777, true);
        }

        // Di chuyển file vào thư mục uploads
        if (move_uploaded_file($image['tmp_name'], $imagePath)) {
            $imageUrl = $imagePath;
        } else {
            echo json_encode(["success" => false, "message" => "Lỗi khi upload hình ảnh."]);
            exit();
        }
    } else {
        $imageUrl = null;
    }

    // Lưu dữ liệu vào cơ sở dữ liệu
    $stmt = $conn->prepare("INSERT INTO categories (name, slug, description, image_url) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $slug, $description, $imageUrl);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Danh mục đã được thêm thành công!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Có lỗi xảy ra khi thêm danh mục."]);
    }

    // Đóng kết nối
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Yêu cầu không hợp lệ."]);
}
?>
