<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "qlqa";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sqlOrderDetails = "SELECT * FROM order_detail";
$resultOrderDetails = $conn->query($sqlOrderDetails);

$ordersByUser = [];
if ($resultOrderDetails->num_rows > 0) {
    while ($orderDetail = $resultOrderDetails->fetch_assoc()) {
        $userId = $orderDetail['user_id'];

        // Truy vấn thông tin người dùng theo user_id
        if (!isset($ordersByUser[$userId])) {
            $sqlUser = "SELECT username, email, phone, address FROM users WHERE id = ?";
            $stmtUser = $conn->prepare($sqlUser);
            $stmtUser->bind_param("i", $userId);
            $stmtUser->execute();
            $resultUser = $stmtUser->get_result();
            $user = $resultUser->fetch_assoc();
            $stmtUser->close();

            if ($user) {
                $ordersByUser[$userId] = [
                    "user" => $user,
                    "orders" => []
                ];
            }
        }

        // Thêm đơn hàng vào danh sách của người dùng
        $ordersByUser[$userId]["orders"][] = $orderDetail;
    }
}

echo json_encode(array_values($ordersByUser));

$conn->close();

?>
