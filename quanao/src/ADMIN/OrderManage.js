import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../ADMINCSS/OrderManage.css';

const OrderManage = () => {
  const [ordersByUser, setOrdersByUser] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost/quanaonam/BUY-CART/get_order_admin.php`);
        
        if (response.data) {
          setOrdersByUser(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = (order_id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      axios.delete(`http://localhost/quanaonam/LOGIN/delete_order.php`, {
        data: { order_id: order_id },
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => {
        if (response.data.success) {
          setOrdersByUser(ordersByUser.filter(userOrders =>
            userOrders.orders.every(order => order.id !== order_id)
          ));
          toast.success('Xóa đơn hàng thành công!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        } else {
          toast.error('Có lỗi khi xóa đơn hàng!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          });
        }
      })
      .catch(() => {
        toast.error('Có lỗi xảy ra khi xóa đơn hàng!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      });
    }
  };

  return (
    <div className="OrderManage">
      <h2>Quản lý đơn hàng</h2>
      {ordersByUser.length > 0 ? (
        ordersByUser.map((userOrders, index) => (
          <div key={index} className="user-order-card">
            <h4>Thông tin người dùng:</h4>
            <p><strong>Họ và tên:</strong> {userOrders.user.username}</p>
            <p><strong>Email:</strong> {userOrders.user.email}</p>
            <p><strong>Điện thoại:</strong> {userOrders.user.phone}</p>
            <p><strong>Địa chỉ:</strong> {userOrders.user.address}</p>
            
            <h3>Chi tiết đơn hàng:</h3>
            <div className="order-info">
              <table>
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Order Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrders.orders.map((order, orderIndex) => (
                    <tr key={orderIndex}>
                      <td>{order.product_id}</td>
                      <td>{order.product_name}</td>
                      <td>
                        <img src={order.product_image} alt={order.product_name} style={{ width: '50px', height: '50px' }} />
                      </td>
                      <td>{order.quantity}</td>
                      <td>${order.price}</td>
                      <td>{order.created_at}</td>
                      <td>
                        <button onClick={() => handleDelete(order.id)}>Hoàn thành đơn</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <p className="loading-text">Đang tải thông tin...</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default OrderManage;
