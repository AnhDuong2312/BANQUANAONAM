-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 06, 2024 lúc 05:28 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `qlqa`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_order`
--

CREATE TABLE `cart_order` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `size` varchar(5) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `cart_order`
--

INSERT INTO `cart_order` (`id`, `user_id`, `product_id`, `product_name`, `product_image`, `size`, `quantity`, `price`, `created_at`) VALUES
(24, 5, 7, 'Quần âu nam 2024', 'http://localhost/quanaonam/PRODUCT/uploads/1730048208-3.png', 'L', 2, 400.00, '2024-11-04 17:01:21'),
(25, 5, 17, 'Áo phông cổ tròn Crew Neck T-shirt', 'http://localhost/quanaonam/PRODUCT/uploads/1730087205-aophong5.png', 'L', 2, 350.00, '2024-11-04 17:01:33'),
(30, 6, 8, 'Quần bò jeans 2024', 'http://localhost/quanaonam/PRODUCT/uploads/1730048300-2.png', 'S', 1, 650.00, '2024-11-05 07:27:12'),
(31, 3, 8, 'Quần bò jeans 2024', 'http://localhost/quanaonam/PRODUCT/uploads/1730048300-2.png', 'L', 2, 650.00, '2024-11-06 05:05:49'),
(32, 7, 39, 'Áo len cổ lọ', 'http://localhost/quanaonam/PRODUCT/uploads/1730089786-switer.png', 'S', 1, 500.00, '2024-11-06 07:52:16'),
(33, 7, 39, 'Áo len cổ lọ', 'http://localhost/quanaonam/PRODUCT/uploads/1730089786-switer.png', 'XL', 1, 500.00, '2024-11-06 07:52:18'),
(34, 5, 17, 'Áo phông cổ tròn Crew Neck T-shirt', 'http://localhost/quanaonam/PRODUCT/uploads/1730087205-aophong5.png', 'L', 1, 350.00, '2024-11-06 08:49:15'),
(35, 8, 8, 'Quần bò jeans 2024', 'http://localhost/quanaonam/PRODUCT/uploads/1730048300-2.png', 'M', 2, 650.00, '2024-11-06 16:15:51');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `created_at`) VALUES
(4, 'Quần nam thời thượng', 'quan-nam-thoi-thuong', 'Thiết kế mới', 'uploads/quanbo1.png', '2024-10-27 16:48:58'),
(5, 'Áo phông nam trẻ trung', 'ao-phong-nam-tre-trung', 'Với nhiều mẫu thiết kế mới', 'uploads/aophong3.png', '2024-10-27 16:49:55'),
(6, 'Áo thu đông ', 'ao-thu-dong', 'Nhiều thiết kế mang đến sự ấm áp', 'uploads/aophao3.png', '2024-10-27 16:50:32'),
(7, 'Quần short nam', 'quan-short-nam', 'Quần mới đẹp', 'uploads/quanshort.png', '2024-10-27 16:51:44'),
(8, 'Áo sơ mi công sở', 'ao-so-mi-cong-so', 'Thiết kế mới', 'uploads/6.png', '2024-10-27 17:07:21'),
(9, 'Áo đông', 'ao-dong', 'Thiết kế mới', 'uploads/aophao3.png', '2024-10-28 04:24:42');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `contacts`
--

INSERT INTO `contacts` (`id`, `user_id`, `name`, `email`, `subject`, `message`, `created_at`) VALUES
(10, 2, 'Bạch Thị Thanh Phương', 'thanhphuong@gmail.com', 'Chủ shop á :v', 'Chủ shop ánh dương đẹp trai vãi ò !', '2024-11-06 08:52:39'),
(11, 2, 'Bạch Thị Thanh Phương', 'bachthithanhphuong237@gmail.com', 'ok', 'ok', '2024-11-06 08:54:07');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `size` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_detail`
--

INSERT INTO `order_detail` (`id`, `user_id`, `product_id`, `product_name`, `product_image`, `size`, `quantity`, `price`, `created_at`) VALUES
(9, 5, 31, 'Quần tây công sở ', 'http://localhost/quanaonam/PRODUCT/uploads/1730088738-3.png', 'XL', 2, 300.00, '2024-11-05 12:44:49'),
(11, 6, 8, 'Quần bò jeans 2024', 'http://localhost/quanaonam/PRODUCT/uploads/1730048300-2.png', 'S', 1, 650.00, '2024-11-05 14:27:09'),
(12, 3, 8, 'Quần bò jeans 2024', 'http://localhost/quanaonam/PRODUCT/uploads/1730048300-2.png', 'L', 2, 650.00, '2024-11-06 12:05:53'),
(13, 7, 31, 'Quần tây công sở ', 'http://localhost/quanaonam/PRODUCT/uploads/1730088738-3.png', 'L', 10, 300.00, '2024-11-06 14:53:02'),
(14, 5, 13, 'Áo sơ mi trơn', 'http://localhost/quanaonam/PRODUCT/uploads/1730049159-aosomi1.png', 'L', 2, 500.00, '2024-11-06 15:33:25'),
(15, 5, 17, 'Áo phông cổ tròn Crew Neck T-shirt', 'http://localhost/quanaonam/PRODUCT/uploads/1730087205-aophong5.png', 'L', 1, 350.00, '2024-11-06 15:49:16'),
(16, 5, 17, 'Áo phông cổ tròn Crew Neck T-shirt', 'http://localhost/quanaonam/PRODUCT/uploads/1730087205-aophong5.png', 'L', 1, 350.00, '2024-11-06 15:49:20'),
(17, 8, 10, 'Áo polo trẻ trung', 'http://localhost/quanaonam/PRODUCT/uploads/1730048473-1.png', 'L', 3, 450.00, '2024-11-06 23:16:11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `small_description` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `original_price` decimal(10,2) NOT NULL,
  `selling_price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `small_description`, `description`, `original_price`, `selling_price`, `quantity`, `image`, `created_at`) VALUES
(7, 4, 'Quần âu nam 2024', 'quan-au-nam-2024', 'Thiết kế đẹp mắt', '-Chất liệu cotton cùng sợi vải Polyester thoáng mát,thấm mồ hôi cực tốt ,kháng khuẩn an toàn cho sức khỏe,Độ co giãn nhẹ nhàng tao sự thoải mái trong các hoạt động hàng ngày\r\n-Sợi Rayon bóng mươt,làm quần luôn như mới\r\n-Với form Beggi ôm nhẹ trẻ trung tôn dáng cho đôi chân là sự lựa chọn hàng đầu cho những chàng trai nơi công sở\r\n-Sử dụng công nghệ mổ túi điện tử với độ chính xác cao giúp cho form quân chỉ đến từng mlimet\r\nSản phẩm được ép lạnh để giữ nếp sắc nét vĩnh viễn.Logo đươc thêu nổi tinh tế bên hông ,cúc quần được đắp chìm trong thuơng hiệu', 300.00, 400.00, 20, 'uploads/1730048208-3.png', '2024-10-27 16:56:48'),
(8, 4, 'Quần bò jeans 2024', 'quan-bo-jeans-2024', 'Thiết thế mới nhất', '-Chất liệu cotton cùng sợi vải Polyester thoáng mát,thấm mồ hôi cực tốt ,kháng khuẩn an toàn cho sức khỏe,Độ co giãn nhẹ nhàng tao sự thoải mái trong các hoạt động hàng ngày\r\n-Sợi Rayon bóng mươt,làm quần luôn như mới\r\n-Với form Beggi ôm nhẹ trẻ trung tôn dáng cho đôi chân là sự lựa chọn hàng đầu cho những chàng trai nơi công sở\r\n-Sử dụng công nghệ mổ túi điện tử với độ chính xác cao giúp cho form quân chỉ đến từng mlimet\r\nSản phẩm được ép lạnh để giữ nếp sắc nét vĩnh viễn.Logo đươc thêu nổi tinh tế bên hông ,cúc quần được đắp chìm trong thuơng hiệu', 500.00, 650.00, 19, 'uploads/1730048300-2.png', '2024-10-27 16:58:20'),
(9, 4, 'Jeans nam phong cách', 'jeans-nam-phong-cach', 'Thiếu kế mới', '-Chất liệu cotton cùng sợi vải Polyester thoáng mát,thấm mồ hôi cực tốt ,kháng khuẩn an toàn cho sức khỏe,Độ co giãn nhẹ nhàng tao sự thoải mái trong các hoạt động hàng ngày\r\n-Sợi Rayon bóng mươt,làm quần luôn như mới\r\n-Với form Beggi ôm nhẹ trẻ trung tôn dáng cho đôi chân là sự lựa chọn hàng đầu cho những chàng trai nơi công sở\r\n-Sử dụng công nghệ mổ túi điện tử với độ chính xác cao giúp cho form quân chỉ đến từng mlimet\r\nSản phẩm được ép lạnh để giữ nếp sắc nét vĩnh viễn.Logo đươc thêu nổi tinh tế bên hông ,cúc quần được đắp chìm trong thuơng hiệu', 450.00, 600.00, 20, 'uploads/1730048371-4.png', '2024-10-27 16:59:31'),
(10, 5, 'Áo polo trẻ trung', 'ao-polo-tre-trung', 'Thiết kế mới', 'PHOM DÁNG: Slim / Regular \r\n\r\n- Áo Polo Vulcano với thiết kế phom Slim ôm vừa phải, tôn dáng cơ thể, phom Regular suông rộng mang đến cho cơ thể sự thoải mái tối đa khi vận động.\r\n\r\n- Thiết kế phối cổ và bo viền tay áo độc đáo và khỏe khoắn giúp tăng vẻ nam tính và trẻ trung\r\n\r\nCHẤT LIỆU:\r\n\r\n- Thành phần vải bao gồm 40% Cotton, 60% Microfiber cho mặt vải mềm mịn và mỏng nhẹ, thoáng mát, kháng khuẩn mang tới cảm giác dễ chịu do thấm hút mồ hôi tốt. Với công nghệ xử lý hiện đại, chất liệu vải này sở hữu độ bền vượt trội, hạn chế tối đa hiện tượng xơ, xổ vải, nấm mốc.\r\n\r\n- Vải có khả năng chống nhăn tốt, độ đàn hồi cao giúp cho người mặc luôn thoải mái và dễ dàng vận động.\r\n\r\n- Vải có độ bền cao và đồng thời không cầu kỳ trong việc chăm sóc vải.\r\n\r\nMÀU SẮC: Xanh thép\r\n\r\n- Mẫu Polo được Vulcano sử dụng gam màu xanh thép lạ mắt, rất dễ phối đồ và không hề kén da người mặc, đồng thời màu này còn mang đến cho người mặc cảm giác thư giãn, cùng phong cách thời trang thanh lịch và trẻ trung.', 300.00, 450.00, 19, 'uploads/1730048473-1.png', '2024-10-27 17:01:13'),
(11, 8, 'Áo sơ mi 2024', 'ao-so-mi-2024', 'Thiết kế mới', '📍 CHẤT LIỆU & TIÊU CHUẨN:\r\n・Chất liệu vải Kate Oxford chất lượng cao, dày dặn đứng form sang trọng, hạn chế co rút.\r\n・Chất lượng may áo kỹ càng, tỉ mỉ\r\n・Sản phẩm thủ công chỉ đặt hàng trước rồi mới thực hiện.\r\n・Form áo unisex suông rộng phù hợp cho cả nam lẫn nữ.\r\n・Cổ áo, tay áo cứng cáp đứng form, sang trọng.\r\n・Chiếc áo đảm bảo được tính duy nhất / độc / lạ chỉ có tại SoN.\r\n\r\n📍 HƯỚNG DẪN BẢO QUẢN\r\nMột số cách giặt để bảo quản và giữ gìn sản phẩm áo thêu tốt nhất:\r\n・Giặt tay với những chất tẩy rửa nhẹ như dầu gội đầu (ko màu),... để giữ cho màu và độ mềm mịn của ruy băng được lâu nhất. Khi giặt tránh ngâm sản phẩm (đối với áo Đen), mà nên giặt nhanh chóng và vắt nhẹ phơi sản phẩm lên ngay.\r\n・Giặt hấp sản phẩm. Nếu bạn có thời gian và điều kiện thì có thể sử dụng phương pháp bảo quản này.\r\n・SP được khuyên KHÔNG giặt máy\r\n\r\n📍CAM KẾT TỪ SOUL OF A NATION\r\n・Mọi sản phẩm đều được kiểm tra kỹ càng, cẩn thận.\r\n・Hỗ trợ tư vấn trước - trong - sau khi sử dụng sản phẩm nhiệt tình.\r\n・Đảm bảo trải nghiệm & quyền lợi chính đáng của khách hàng.', 300.00, 400.00, 20, 'uploads/1730049072-5.png', '2024-10-27 17:11:12'),
(12, 8, 'Áo sơ mi sọc', 'ao-so-mi-soc', 'Thiết kế mới', '📍 CHẤT LIỆU & TIÊU CHUẨN:\r\n・Chất liệu vải Kate Oxford chất lượng cao, dày dặn đứng form sang trọng, hạn chế co rút.\r\n・Chất lượng may áo kỹ càng, tỉ mỉ\r\n・Sản phẩm thủ công chỉ đặt hàng trước rồi mới thực hiện.\r\n・Form áo unisex suông rộng phù hợp cho cả nam lẫn nữ.\r\n・Cổ áo, tay áo cứng cáp đứng form, sang trọng.\r\n・Chiếc áo đảm bảo được tính duy nhất / độc / lạ chỉ có tại SoN.\r\n\r\n📍 HƯỚNG DẪN BẢO QUẢN\r\nMột số cách giặt để bảo quản và giữ gìn sản phẩm áo thêu tốt nhất:\r\n・Giặt tay với những chất tẩy rửa nhẹ như dầu gội đầu (ko màu),... để giữ cho màu và độ mềm mịn của ruy băng được lâu nhất. Khi giặt tránh ngâm sản phẩm (đối với áo Đen), mà nên giặt nhanh chóng và vắt nhẹ phơi sản phẩm lên ngay.\r\n・Giặt hấp sản phẩm. Nếu bạn có thời gian và điều kiện thì có thể sử dụng phương pháp bảo quản này.\r\n・SP được khuyên KHÔNG giặt máy\r\n\r\n📍CAM KẾT TỪ SOUL OF A NATION\r\n・Mọi sản phẩm đều được kiểm tra kỹ càng, cẩn thận.\r\n・Hỗ trợ tư vấn trước - trong - sau khi sử dụng sản phẩm nhiệt tình.\r\n・Đảm bảo trải nghiệm & quyền lợi chính đáng của khách hàng.', 250.00, 350.00, 20, 'uploads/1730049113-6.png', '2024-10-27 17:11:53'),
(13, 8, 'Áo sơ mi trơn', 'ao-so-mi-tron', 'Thiết kế mới', '📍 CHẤT LIỆU & TIÊU CHUẨN:\r\n・Chất liệu vải Kate Oxford chất lượng cao, dày dặn đứng form sang trọng, hạn chế co rút.\r\n・Chất lượng may áo kỹ càng, tỉ mỉ\r\n・Sản phẩm thủ công chỉ đặt hàng trước rồi mới thực hiện.\r\n・Form áo unisex suông rộng phù hợp cho cả nam lẫn nữ.\r\n・Cổ áo, tay áo cứng cáp đứng form, sang trọng.\r\n・Chiếc áo đảm bảo được tính duy nhất / độc / lạ chỉ có tại SoN.\r\n\r\n📍 HƯỚNG DẪN BẢO QUẢN\r\nMột số cách giặt để bảo quản và giữ gìn sản phẩm áo thêu tốt nhất:\r\n・Giặt tay với những chất tẩy rửa nhẹ như dầu gội đầu (ko màu),... để giữ cho màu và độ mềm mịn của ruy băng được lâu nhất. Khi giặt tránh ngâm sản phẩm (đối với áo Đen), mà nên giặt nhanh chóng và vắt nhẹ phơi sản phẩm lên ngay.\r\n・Giặt hấp sản phẩm. Nếu bạn có thời gian và điều kiện thì có thể sử dụng phương pháp bảo quản này.\r\n・SP được khuyên KHÔNG giặt máy\r\n\r\n📍CAM KẾT TỪ SOUL OF A NATION\r\n・Mọi sản phẩm đều được kiểm tra kỹ càng, cẩn thận.\r\n・Hỗ trợ tư vấn trước - trong - sau khi sử dụng sản phẩm nhiệt tình.\r\n・Đảm bảo trải nghiệm & quyền lợi chính đáng của khách hàng.', 400.00, 500.00, 20, 'uploads/1730049159-aosomi1.png', '2024-10-27 17:12:39'),
(14, 5, 'Áo phông phong cách', 'ao-phong-phong-cach', 'Thiết kế mới', 'Áo Thun Nam Raglan Phối Tay Chups MTS 1344 thuộc BST được collab chung với Chupa Chups với những gam màu ngọt ngào, mang đến cảm giác tươi mới, tràn đầy năng lượng. Chất liệu thun cotton mềm mịn tạo cảm giác thoải mái, dễ dàng phối được với nhiều phong cách khác nhau.\r\nChất Liệu : 100% Cotton, 210 GSM.\r\nForm : Relax\r\nMàu Sắc : Be, Đen\r\nSản xuất: Việt Nam', 200.00, 250.00, 20, 'uploads/1730049334-aophong1.png', '2024-10-27 17:15:34'),
(15, 5, 'Áo phông nam cổ tròn', 'ao-phong-nam-co-tron', 'Thiết kế mới', 'Chất thun lạnh tay ngắn cổ tròn co giãn 4 chiều', 150.00, 220.00, 21, 'uploads/1730086786-aophong3.png', '2024-10-28 03:39:46'),
(17, 5, 'Áo phông cổ tròn Crew Neck T-shirt', 'ao-phong-nam-co-tron-Crew-Neck-T-shirt', 'Thiết kế mới', 'Mẫu áo phông cơ bản nhất với cổ tròn, dễ mặc và phù hợp với mọi dáng người. Áo thường được làm từ chất liệu cotton mềm mại, thoáng mát, thích hợp cho các hoạt động thường ngày. Mẫu áo này dễ phối đồ và có thể kết hợp với quần jeans, quần short hay blazer.', 200.00, 350.00, 43, 'uploads/1730087205-aophong5.png', '2024-10-28 03:46:45'),
(18, 5, 'Áo phông cổ tim', 'ao-phong-co-tim', 'Thiết kế mới', 'Thiết kế cổ chữ V tạo cảm giác thanh thoát, giúp phần cổ trông dài hơn. Loại áo này rất thích hợp cho người có vai rộng hoặc ngực rộng vì nó tạo sự cân đối. Áo cổ tim cũng dễ phối với áo khoác hoặc quần jeans, giúp người mặc trông lịch lãm hơn.', 400.00, 750.00, 12, 'uploads/1730087302-aophongtrang.png', '2024-10-28 03:48:22'),
(19, 5, 'Áo phông cổ polo', 'ao-phong-co-polo', 'Thiết kế mới', 'Áo phông có cổ với hàng cúc nhỏ ở phía trên, thường được làm từ chất liệu piqué cotton hoặc polyester giúp thấm hút mồ hôi tốt. Đây là lựa chọn hoàn hảo cho phong cách lịch sự nhưng vẫn thoải mái. Áo polo có thể phối cùng quần chinos hoặc quần kaki.', 150.00, 300.00, 50, 'uploads/1730087374-aophong4.png', '2024-10-28 03:49:34'),
(20, 6, 'Áo phông nỉ ', 'ao-phong-ni', 'Thiết kế mới', 'Áo nỉ là lựa chọn phổ biến cho mùa thu đông, thường được làm từ chất liệu cotton pha nỉ dày dặn, giữ ấm tốt. Thiết kế không có mũ, dễ phối với nhiều loại quần như jeans, jogger hay chinos. Sweatshirt mang đến phong cách năng động và thoải mái, rất phù hợp cho các buổi dạo phố hoặc đi chơi.', 400.00, 750.00, 31, 'uploads/1730087506-aoni.png', '2024-10-28 03:51:46'),
(21, 6, 'Áo Hoodie', 'ao-hoodie', 'Thiết kế mới', 'Áo hoodie là loại áo phông dày có mũ, thường làm từ chất liệu nỉ bông hoặc cotton pha polyester. Hoodie mang đến phong cách trẻ trung, năng động, đặc biệt phù hợp với thời trang đường phố. Hoodie dễ dàng kết hợp với quần jeans, jogger hoặc thậm chí là quần thể thao để tạo sự thoải mái tối đa.', 300.00, 500.00, 23, 'uploads/1730087587-hoddi1.png', '2024-10-28 03:53:07'),
(22, 6, 'Áo len mỏng', 'ao-len-mong', 'Thiết kế mới', 'Áo len mỏng là lựa chọn lịch sự và trang nhã hơn cho mùa thu đông. Chất liệu len giữ ấm tốt, giúp người mặc trông lịch lãm và trưởng thành hơn. Áo len mỏng dễ phối layer với áo sơ mi bên trong và áo khoác bên ngoài, rất thích hợp cho môi trường công sở hay các buổi gặp gỡ trang trọng.', 350.00, 700.00, 24, 'uploads/1730087692-switer.png', '2024-10-28 03:54:52'),
(23, 7, 'Quần short jean', 'quan-short-jean', 'Thiết kế mới', 'Quần short jean mang phong cách năng động, khỏe khoắn, rất phổ biến vào mùa hè. Chất liệu denim bền bỉ, dễ phối đồ và phù hợp với áo phông, áo tank top hoặc áo polo. Quần jean ngắn có thể đi kèm giày sneaker hoặc sandals để tạo nên phong cách casual.', 200.00, 450.00, 33, 'uploads/1730087867-quan3.png', '2024-10-28 03:57:47'),
(24, 7, 'Quần short kaki', 'quan-short-kaki', 'Thiết kế mới', 'Quần short kaki mang lại vẻ lịch sự, dễ mặc và linh hoạt. Loại quần này thường có form ôm vừa phải, chất liệu mềm mịn, mát mẻ, thích hợp để đi chơi, đi dạo hoặc thậm chí là môi trường công sở. Có thể kết hợp với áo polo hoặc áo sơ mi để tạo phong cách thanh lịch.', 100.00, 250.00, 30, 'uploads/1730087959-quan7.png', '2024-10-28 03:59:19'),
(25, 7, 'Quần short thể thao', 'quan-short-the-thao', 'Thiết kế mới', 'Quần short thể thao được làm từ chất liệu co giãn và thấm hút mồ hôi tốt, thích hợp cho các hoạt động thể thao hoặc dạo chơi. Loại quần này thường có kiểu dáng thoải mái, phù hợp khi kết hợp với áo tank top hoặc áo thun. Giày thể thao là lựa chọn hoàn hảo để hoàn thiện bộ trang phục năng động này.', 200.00, 350.00, 30, 'uploads/1730088052-quan6.png', '2024-10-28 04:00:52'),
(26, 7, 'Quần short bơi', 'quan-short-boi', 'Thiết kế mới', 'Quần short bơi thường có chất liệu nhanh khô, chống nước, thích hợp cho các hoạt động dưới nước hoặc bãi biển. Đa dạng về màu sắc và họa tiết, giúp tạo sự nổi bật khi đi du lịch biển. Có thể kết hợp với áo tank top hoặc áo thun mỏng khi không xuống nước.', 200.00, 300.00, 38, 'uploads/1730088174-quan8.png', '2024-10-28 04:02:54'),
(27, 8, 'Áo sơ mi trắng cổ điển', 'ao-so-mi-trang-co-dien', 'Thiết kế mới', 'Đây là mẫu sơ mi cơ bản và không thể thiếu trong tủ đồ công sở. Thiết kế trắng trơn với cổ áo nhọn hoặc cổ bẻ phù hợp cho nhiều dịp khác nhau. Áo sơ mi trắng dễ phối với suit, cà vạt hoặc quần tây, mang lại vẻ ngoài thanh lịch và chuyên nghiệp.', 100.00, 250.00, 15, 'uploads/1730088290-aosomi1.png', '2024-10-28 04:04:50'),
(28, 8, 'Áo sơ mi xanh nhạt', 'ao-so-mi-xanh-nhat', 'Thiết kế mới', 'Áo sơ mi màu xanh nhạt tạo cảm giác dịu dàng, tinh tế và là lựa chọn hoàn hảo để thay thế cho áo trắng trong môi trường công sở. Màu sắc nhã nhặn, dễ kết hợp với nhiều màu quần và cà vạt, mang lại vẻ ngoài thanh thoát, dễ chịu.', 150.00, 300.00, 20, 'uploads/1730088363-aosomi3.png', '2024-10-28 04:06:03'),
(30, 8, 'Áo sơ mi Oxford', 'ao-so-mi-oxford', 'Thiết kế mới', 'Loại áo sơ mi Oxford thường có chất vải dày hơn và bề mặt vải hơi sần, mang lại cảm giác cứng cáp, đứng đắn. Mẫu áo này có thể dễ dàng phối cùng quần âu hoặc chinos và rất phù hợp cho môi trường công sở hoặc những buổi họp mặt quan trọng.', 150.00, 200.00, 35, 'uploads/1730088587-aosomi5.png', '2024-10-28 04:09:47'),
(31, 4, 'Quần tây công sở ', 'quan-tay-trhoi-thuong', 'Thiết kế mới', 'Quần tây công sở là lựa chọn chuẩn mực cho những dịp cần phong cách chuyên nghiệp và lịch sự. Với phom dáng ôm vừa phải, chất liệu vải mềm mịn, quần tây dễ dàng kết hợp với áo sơ mi, áo vest và giày da, tạo nên vẻ ngoài lịch lãm, trang nhã.', 200.00, 300.00, 14, 'uploads/1730088738-3.png', '2024-10-28 04:12:18'),
(32, 4, 'Quần chinos', 'quan-chinos', 'Thiết kế mới', 'Chinos là kiểu quần thoải mái và trẻ trung, làm từ chất liệu cotton hoặc pha thêm sợi tổng hợp giúp mềm mại và thoáng mát. Với thiết kế gọn gàng, chinos dễ dàng kết hợp với áo sơ mi, áo phông hoặc áo khoác. Đây là lựa chọn linh hoạt, phù hợp cho cả công sở và dạo phố.', 100.00, 150.00, 29, 'uploads/1730088809-aosomi2.png', '2024-10-28 04:13:29'),
(33, 4, 'Quần jeans slim-fit', 'quan-jeans-slim-fit', 'Thiết kế mới', 'Jeans slim-fit là kiểu quần jean ôm vừa phải, tạo dáng trẻ trung mà không quá bó sát. Chất liệu denim bền bỉ, phù hợp với phong cách casual và dễ dàng kết hợp với áo phông, áo sơ mi hoặc áo hoodie. Đây là mẫu quần không bao giờ lỗi mốt, mang lại phong cách mạnh mẽ và năng động.', 150.00, 300.00, 45, 'uploads/1730088890-2.png', '2024-10-28 04:14:50'),
(34, 4, 'Quần jogger', 'quan-jogger', 'Thiết kế mới', 'Quần jogger là mẫu quần thể thao với phần ống ôm gọn ở cổ chân, tạo sự thoải mái và phong cách năng động. Jogger làm từ chất liệu như cotton hoặc polyester, thường có túi và dây thắt lưng co giãn. Dễ dàng kết hợp với áo hoodie, áo phông và giày thể thao, đây là lựa chọn lý tưởng cho phong cách casual.', 200.00, 300.00, 35, 'uploads/1730088946-quanau3.png', '2024-10-28 04:15:46'),
(35, 5, 'Áo phông in logo', 'ao-phong-in-logo', 'Thiết kế mới', 'Áo phông in logo hoặc slogan là lựa chọn nổi bật và cá tính. Logo có thể là thương hiệu, slogan hay hình ảnh nghệ thuật giúp thể hiện phong cách riêng. Mẫu áo này phù hợp khi phối cùng quần jeans, quần short và giày sneaker cho vẻ ngoài năng động, hiện đại.', 150.00, 300.00, 30, 'uploads/1730089307-aophong2.png', '2024-10-28 04:21:47'),
(36, 5, 'Áo phông dáng oversize', 'ao-phong-dang-oversize', 'Thiết kế mới', 'Áo phông rộng rãi với dáng oversized mang lại phong cách trẻ trung, tự do và thoải mái. Đây là kiểu áo rất phổ biến với giới trẻ, đặc biệt là trong thời trang đường phố. Dễ dàng kết hợp với quần jogger hoặc quần jeans, tạo vẻ phóng khoáng và sành điệu.', 75.00, 150.00, 32, 'uploads/1730089415-aophong5.png', '2024-10-28 04:23:35'),
(37, 9, 'Áo phao', 'ao-phao', 'Thiết kế mới', 'Áo phao là lựa chọn hàng đầu trong những ngày đông lạnh giá. Với lớp đệm bông hoặc lông vũ, áo phao giữ nhiệt cực tốt và rất nhẹ, mang lại sự thoải mái và tiện lợi khi di chuyển. Phối áo phao cùng quần jeans hoặc jogger giúp tạo phong cách năng động, trẻ trung.', 300.00, 500.00, 12, 'uploads/1730089571-aophao4.png', '2024-10-28 04:26:11'),
(38, 9, 'Áo khoác da', 'ao-khoac-da', 'Thiết kế mới', 'Áo khoác da là biểu tượng của phong cách cá tính và sành điệu, rất thích hợp cho mùa đông. Với chất liệu da bền và giữ nhiệt tốt, áo khoác da mang đến phong cách mạnh mẽ. Phối cùng áo phông hoặc áo len bên trong và quần jeans sẽ tạo ra vẻ ngoài phong cách và nổi bật.', 150.00, 250.00, 35, 'uploads/1730089673-aokhoacda.png', '2024-10-28 04:27:53'),
(39, 9, 'Áo len cổ lọ', 'ao-len-co-lo', 'Thiết kế mới', 'Áo len cổ lọ là lựa chọn thanh lịch, giúp giữ ấm vùng cổ và mang lại phong cách sang trọng. Mẫu áo này dễ dàng phối với áo khoác dạ, áo blazer, hoặc áo phao để tạo thêm sự phong phú trong phong cách. Áo len cổ lọ rất phù hợp cho môi trường công sở hoặc các buổi hẹn gặp quan trọng.', 300.00, 500.00, 20, 'uploads/1730089786-switer.png', '2024-10-28 04:29:46');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role_as` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `phone`, `address`, `password`, `role_as`, `created_at`) VALUES
(2, 'Phạm Ánh Dương', 'admin@gmail.com', '0843007526', 'Thanh Hóa', '$2y$10$w7ins.LQ29XPS.uYcRUsXO7i9GqDtWPpEg4TzyhFugWq6kiS8HFIm', 1, '2024-10-23 11:49:23'),
(3, 'Nguyễn Quang Vinh', 'v@gmail.com', '1234567890', 'Bắc Ninh', '$2y$10$0Yk7aA9K4bZ49rHs9hHLDOyFiYDQWW9nc9nz3dJbtxCNsnSlawz.2', 0, '2024-10-23 11:50:06'),
(4, 'Việt Anh', 'a@gmail.com', '123456789', 'Bắc Ninh', '$2y$10$Ci5O.InRDBz9SJ7Div.qVO1bfcEGH2aGYgtFZSiL6.oHvg6dbBPni', 0, '2024-10-23 11:56:01'),
(5, 'Bạch Thị Thanh Phương', 'p@gmail.com', '12345678', 'pleiku', '$2y$10$1WoI3KdCG4jm0rbvbuZWIOg8FdSXRjqSVSQtFgP4mPpegWpAKP1WS', 0, '2024-10-24 17:23:03'),
(6, 'Nhật Long', 'l@gmail.com', '23456789', 'Hà Tĩnh', '$2y$10$lv2L1kzVU2KCV1KeNKknM.cYCJAb8CYBeb3Kib2nYuKKgH2K.CadW', 0, '2024-11-05 07:26:46'),
(7, 'Nguyễn Đình Việt Anh', 'vanh@gmail.com', '09129348380', 'Từ Sơn - Bắc Ninh', '$2y$10$3Hk3RiXOWacrWTSlhCYEcOj/hHjISBIsrl8eeNoFyBPz149fqo3XO', 0, '2024-11-06 07:51:28'),
(8, 'Duy Thẩm Bắc Giang', 'd@gmail.com', '1234567', 'Bắc Giang', '$2y$10$OXigR/ITAutCj7FCeemNEOrQUgMmt2KQiu7Zbt7iYmDaSyjON54ti', 0, '2024-11-06 16:15:27');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cart_order`
--
ALTER TABLE `cart_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_order_ibfk_1` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Chỉ mục cho bảng `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `fk_category` (`category_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `cart_order`
--
ALTER TABLE `cart_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart_order`
--
ALTER TABLE `cart_order`
  ADD CONSTRAINT `cart_order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cart_order_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
