// src/components/Footer.js
import React from 'react';
import '../TRANGCHUCSS/chantrang.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faGoogle} from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'; 

function Chantrang() {
  return (
    <footer className="chantrang">
      <div className="left">
        <h3>Sinh viên thực hiện</h3>
        <div>
          <h4>NHóm 9: Quần áo Nam</h4>
          <a href="https://www.facebook.com/pham.a.duong.10?locale=vi_VN">
          <p>Phạm Ánh Dương (C) - 21103100818</p>
          </a>
          <a href="https://www.facebook.com/profile.php?id=100086121811273&locale=vi_VN">
            <p>Nguyễn Tùng Dương - 21103100807</p>
          </a>
          <a href="https://www.facebook.com/daidot.duong.14?locale=vi_VN">
            <p>Trần văn Dưỡng - 21103100866</p>
          </a>
          <p>Lớp: DHTI15A14HN</p>
        </div>
      </div>
      <div className="center">
        <h3>Trường đại học Kinh tế - Kỹ thuật công nghiệp</h3>
        <div className="content">
          <div className="coso1">
            <h4>Cơ Sở Hà Nội</h4>
            <p>
            <FontAwesomeIcon 
            icon={faMapMarkerAlt} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
            />Số 456 Minh Khai, P.Vĩnh Tuy, Q.Hai Bà Trưng, TP.Hà Nội <br />
            <FontAwesomeIcon 
            icon={faMapMarkerAlt} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
            />Số 218 Đường Lĩnh Nam, Q.Hoàng Mai, TP.Hà Nội <br />
            Hotline: 024.38621504 - Email:web@uneti.edu.vn

            </p>
          </div>

          <div className="coso2">
          <h4>Cơ Sở Nam Định</h4>
            <p>
            <FontAwesomeIcon 
            icon={faMapMarkerAlt} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
            />Số 353 Trần Hưng Đạo, P.Bà Triệu, TP.Nam Định <br />
            <FontAwesomeIcon 
            icon={faMapMarkerAlt} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
            />Khu xưởng Thực hành: Phường Mỹ Xá, TP.Nam Định <br />
            Hotline: 024.38621504 - Email: web@uneti.edu.vn

            </p>
          </div>
        </div>
        <div className="icon">
        <a href="https://www.facebook.com/search/top?q=tr%C6%B0%E1%BB%9Dng%20%C4%91%E1%BA%A1i%20h%E1%BB%8Dc%20kinh%20t%E1%BA%BF%20-%20k%E1%BB%B9%20thu%E1%BA%ADt%20c%C3%B4ng%20nghi%E1%BB%87p%20uneti&locale=vi_VN">
          <FontAwesomeIcon 
            icon={faFacebook} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
          />
        </a>
        <a href="https://www.instagram.com/your_instagram_link" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon 
            icon={faInstagram} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
          />
        </a>
        <a href="https://uneti.edu.vn/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon 
            icon={faGoogle} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
          />
        </a>
        </div>
      </div>
      <div className="right">
        <h3>Cơ sở cửa hàng</h3>
        <h4>Liện hệ với chúng tôi</h4>
        <p>
            <FontAwesomeIcon 
            icon={faMapMarkerAlt} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
            />Số 353 Trần Hưng Đạo, P.Bà Triệu, TP.Nam Định <br />
            <FontAwesomeIcon 
            icon={faMapMarkerAlt} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
            />Khu xưởng Thực hành: Phường Mỹ Xá, TP.Nam Định <br />
            Hotline: 024.38621504 - Email: web@uneti.edu.vn

          </p>
          <div className="icon">
        <a href="https://www.facebook.com/search/top?q=tr%C6%B0%E1%BB%9Dng%20%C4%91%E1%BA%A1i%20h%E1%BB%8Dc%20kinh%20t%E1%BA%BF%20-%20k%E1%BB%B9%20thu%E1%BA%ADt%20c%C3%B4ng%20nghi%E1%BB%87p%20uneti&locale=vi_VN">
          <FontAwesomeIcon 
            icon={faFacebook} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
          />
        </a>
        <a href="https://www.instagram.com/your_instagram_link" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon 
            icon={faInstagram} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
          />
        </a>
        <a href="https://uneti.edu.vn/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon 
            icon={faGoogle} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
          />
        </a>
        </div>
      </div>
    </footer>
  );
}

export default Chantrang;
