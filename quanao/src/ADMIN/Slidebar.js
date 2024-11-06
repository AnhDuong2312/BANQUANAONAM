import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faBox, faTags, faPlus, faSignOutAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className="sidebar">
      <h2>BẢNG ĐIỀU KHIỂN CỬA HÀNG</h2>
      <ul>
        <li onClick={() => setActiveSection("dashboard")}>
          <FontAwesomeIcon 
            icon={faTachometerAlt} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
          />
          Tổng quan
        </li>
        <li onClick={() => setActiveSection("userManage")}>
          <FontAwesomeIcon 
            icon={faUsers} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
          />
          Quản lý người dùng
        </li>
        <li onClick={() => setActiveSection("orderManage")}>
          <FontAwesomeIcon 
            icon={faBox} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
          />
          Quản lý đơn hàng
        </li>
        <li onClick={() => setActiveSection("allCategories")}>
          <FontAwesomeIcon 
            icon={faTags} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
          />
          Tất cả danh mục
        </li>
        <li onClick={() => setActiveSection("addCategory")}>
          <FontAwesomeIcon 
            icon={faPlus} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
          />
          Thêm danh mục
        </li>
        <li onClick={() => setActiveSection("allProducts")}>
          <FontAwesomeIcon 
            icon={faBox} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
          />
          Tất cả sản phẩm
        </li>
        <li onClick={() => setActiveSection("addProduct")}>
          <FontAwesomeIcon 
            icon={faPlus} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
          />
          Thêm sản phẩm
        </li>
        <li onClick={() => setActiveSection("contact")}>
          <FontAwesomeIcon 
            icon={faEnvelope} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
          />
          Liên hệ
        </li>
      </ul>
      <button className="logout">
        <a href="/">
          <FontAwesomeIcon 
            icon={faSignOutAlt} 
            style={{ fontSize: '16px', color: 'white', marginRight: '10px' }} 
          />
          Logout
        </a>
      </button>
    </div>
  );
};

export default Sidebar;
