import React from 'react';
import Menutop from './menutop';
import Chantrang from './chantrang';
import '../TRANGCHUCSS/gioithieu.css';

function GioiThieu() {
  return (
    <div className="gioithieu-home">
        <Menutop/>
        <div className="gioi-thieu-container">
            <h1>Giới Thiệu Cửa Hàng Ánh Dương</h1>
            <ul>
                <li>Chào mừng bạn đến với <strong>Ánh Dương Store</strong> – điểm đến hàng đầu dành cho phái mạnh yêu thích phong cách, sự lịch lãm và chất lượng.</li>
                <li>Tại Ánh Dương, chúng tôi hiểu rằng thời trang không chỉ là vẻ bề ngoài mà còn là cách để bạn thể hiện phong cách và cá tính của mình. Chúng tôi luôn tìm kiếm và lựa chọn những thiết kế hiện đại, phong cách và mang đậm dấu ấn riêng, từ trang phục công sở lịch lãm, quần jeans năng động cho đến các mẫu áo thun, áo sơ mi thời thượng phù hợp cho nhiều dịp khác nhau.</li>
            </ul>
            

            <h2>Vì sao chọn Ánh Dương Store?</h2>
            <ul>
                <li>
                <strong>Chất lượng vượt trội:</strong> Chúng tôi cam kết mang đến sản phẩm với chất liệu cao cấp, đường may tinh tế, và độ bền cao, giúp bạn tự tin diện mỗi ngày.
                </li>
                <li>
                <strong>Dịch vụ tận tâm:</strong> Với đội ngũ nhân viên chuyên nghiệp và nhiệt tình, chúng tôi luôn sẵn sàng hỗ trợ bạn trong việc lựa chọn trang phục và đáp ứng mọi yêu cầu của khách hàng.
                </li>
                <li>
                <strong>Xu hướng cập nhật:</strong> Ánh Dương Store luôn đi đầu trong việc cập nhật các mẫu mã, xu hướng mới nhất, để bạn có thể tự tin và nổi bật giữa đám đông.
                </li>
                <li>
                <strong>Chính sách bảo hành và đổi trả dễ dàng:</strong> Mang đến sự hài lòng tuyệt đối là ưu tiên của chúng tôi, bạn hoàn toàn yên tâm với các chính sách bảo hành, đổi trả đơn giản và nhanh chóng.
                </li>
            </ul>

            <h2>Sứ Mệnh Của Chúng Tôi</h2>
            <ul>
                <li>
                Ánh Dương Store ra đời với sứ mệnh mang đến cho phái mạnh những sản phẩm thời trang nam chất lượng nhất, giúp bạn thể hiện bản thân một cách tự tin, mạnh mẽ và cuốn hút.
                </li>
                <li>
                Hãy ghé thăm Ánh Dương Store để trải nghiệm không gian thời trang độc đáo và khám phá những phong cách mới lạ mà chúng tôi đã chuẩn bị dành riêng cho bạn. 
                </li>
                <li className='center'>
                <strong>Ánh Dương Store – Tỏa sáng cùng phong cách của bạn!</strong>
                </li>
            </ul>
        </div>
        <Chantrang/>
    </div>
  );
}

export default GioiThieu;
