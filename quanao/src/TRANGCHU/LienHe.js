import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Thêm import này
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho Toastify
import '../TRANGCHUCSS/lienhe.css';
import Menutop from './menutop';
import Chantrang from './chantrang';

function LienHe() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Bạn cần đăng nhập để gửi tin nhắn!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
      });
      return;
    }

    axios.post('http://localhost/quanaonam/LOGIN/contact_admin.php', {
      user_id: userId,
      name,
      email,
      subject,
      message,
    })
      .then(response => {
        if (response.data.success) {
          toast.success('Tin nhắn đã được gửi thành công!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
          setName('');
          setEmail('');
          setSubject('');
          setMessage('');
        } else {
          toast.error('Có lỗi xảy ra khi gửi tin nhắn.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        }
      })
      .catch(() => {
        toast.error('Có lỗi xảy ra khi gửi tin nhắn.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      });
  };

  return (
    <div className="contact-home">
        <Menutop/>
        <div className="contact-container">
            <h2>Liên hệ với chúng tôi</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Tên:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className='text-name'
                />
                </div>
                <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className='text-email'
                />
                </div>
                <div>
                <label>Chủ đề:</label>
                <input 
                    type="text" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)} 
                    required 
                    className='text-chude'
                />
                </div>
                <div>
                <label>Nội dung:</label>
                <textarea 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    required 
                    className='text-noidung'
                />
                </div>
                <button type="submit">Gửi</button>

                <strong>Mọi chi tiết chúng tôi sẽ trả lời bạn qua email bạn đã cập nhật với chúng tôi!</strong>
                
            </form>
            <ToastContainer /> 
        </div>
        <Chantrang/>
    </div>
  );
}

export default LienHe;
