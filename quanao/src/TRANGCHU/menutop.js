import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons'; // Thêm icon tìm kiếm
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../TRANGCHUCSS/menutop.css';

function Menutop() {
  const [categories, setCategories] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost/quanaonam/TRANGCHU/get_categories.php')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Có lỗi khi lấy danh mục!", error);
      });

    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      setUserEmail(localStorage.getItem('userEmail'));
    }
  }, []);

  const handleUserClick = () => {
    if (isAuthenticated) {
      setShowUserInfo(!showUserInfo);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setShowUserInfo(false);
    navigate('/');
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <header className="menutop">
      <h1><Link to="/">Ánh Dương Store</Link></h1>
      <nav>
        <div className="menu-icons">
          <form onSubmit={handleSearch} className="search-form">
            <input 
              type="text" 
              placeholder="Tìm kiếm sản phẩm..." 
              className="search-input" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-icon">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          <div 
            className="user-icon-container"
            onMouseEnter={() => setShowUserInfo(true)}
            onMouseLeave={() => setShowUserInfo(false)}
          >
            <FontAwesomeIcon 
              icon={faUser} 
              style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }}
              onClick={handleUserClick}
            />
            {showUserInfo && isAuthenticated && (
              <div className="user-info-popover">
                <p className='p-2'>Xin chào! {userEmail}</p>
                <button onClick={handleLogout}>Đăng xuất</button>
              </div>
            )}
          </div>
          <FontAwesomeIcon 
            icon={faShoppingCart} 
            style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }}
            onClick={handleCartClick}
          />
        </div>
        <ul className="menu-links">
          <li><Link to="/">Trang Chủ</Link></li>
          <li><Link to="/gioithieu">Giới Thiệu</Link></li>
          <li>
            <Link to="/">Sản Phẩm</Link>
            <ul className="dropdown-menu">
              {categories.length > 0 ? (
                categories.map(category => (
                  <li key={category.id}>
                    <Link to={`/products/${category.id}`}>{category.name}</Link>
                  </li>
                ))
              ) : (
                <li>Không có danh mục</li>
              )}
            </ul>
          </li>
          <li><Link to="/lienhe">Liên Hệ</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Menutop;
