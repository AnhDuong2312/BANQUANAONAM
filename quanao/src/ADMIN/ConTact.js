import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../ADMINCSS/contact.css';

const ContactAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost/quanaonam/LOGIN/get_contact.php`);
        
        if (response.data) {
          setMessages(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        setError("Có lỗi khi tải tin nhắn");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn đã phản hồi khách hàng?")) {
      axios.delete(`http://localhost/quanaonam/LOGIN/delete_contact.php`,{
        data: { id: id },
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => {
          if (response.data.success) {
            setMessages(messages.filter(message => message.id !== id));
            toast.success('Xóa tin nhắn thành công!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeButton: false,
            });
          } else {
            toast.error('Có lỗi khi xóa tin nhắn!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeButton: false,
            });
          }
        })
        .catch(error => {
          console.error("Có lỗi xảy ra khi xóa:", error);
          toast.error('Có lỗi xảy ra khi xóa!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        });
    }
  };

  if (loading) {
    return <p>Đang tải thông tin...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="ContactAdmin">
      <h2>Quản lý tin nhắn liên hệ</h2>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={index} className="message-card">
            <h4>Phản hồi của khách hàng:</h4>
            <p><strong>Tên:</strong> {message.name}</p>
            <p><strong>Email:</strong> {message.email}</p>
            <p><strong>Chủ đề:</strong> {message.subject}</p>
            <p><strong>Nội dung:</strong> {message.message}</p>
            <p><strong>Ngày gửi:</strong> {new Date(message.created_at).toLocaleString()}</p>
            <button onClick={() => handleDelete(message.id)}>Đã phản hồi khách hàng</button>
          </div>
        ))
      ) : (
        <p className="loading-text">Không có tin nhắn nào để hiển thị.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default ContactAdmin;
