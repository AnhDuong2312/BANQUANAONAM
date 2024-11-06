import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../LOGINCSS/register.css';
import Menutop from '../TRANGCHU/menutop';

function Register() {
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Mật khẩu không khớp!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,  
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost/quanaonam/LOGIN/register.php', {
        username,
        email,
        phone,
        address,
        password,
      });

      console.log(response.data); 

      if (response.data.success) {
        toast.success('Đăng ký thành công!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,  
        });
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,  
        });
      }
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
      toast.error('Có lỗi xảy ra khi kết nối với server.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false, 
      });
    }
  };

  return (
    <div>
      <Menutop/>
      <div className="register-container">
      <h2>Đăng ký</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Họ và Tên:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Số điện thoại:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Địa chỉ:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Xác nhận Mật khẩu:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đăng Ký</button>
      </form>
      <p className='hoi'>
        Bạn đã có tài khoản? <Link to="/login">Đăng nhập tại đây</Link>
      </p>
      <ToastContainer />
    </div>
    </div>
  );
}

export default Register;
