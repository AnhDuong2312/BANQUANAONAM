import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../LOGINCSS/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/quanaonam/LOGIN/login.php', {
        email,
        password,
      });
      console.log(response.data)
      
      if (response.data.success) {
        toast.success('Đăng nhập thành công!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });

        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('role_as', response.data.role_as); 
        

        const role = parseInt(response.data.role_as, 10); 
        if (role === 1) {
          navigate('/admin'); 
        } else if (role === 0) {
          const redirectTo = location.state?.from?.pathname || '/';
          navigate(redirectTo); 
        } else {
          toast.error('Vai trò người dùng không hợp lệ!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        }
      } else {
        toast.error('Email hoặc mật khẩu không đúng!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      }
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
      toast.error('Có lỗi xảy ra khi kết nối với server.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
      });
    }
  };

  return (
    <div>
      <div className="login-container">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Đăng nhập</button>
        </form>
        <p>
          Nếu bạn chưa có tài khoản? <Link to="/register">Đăng ký tại đây</Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
