import React, { useEffect, useState } from "react";
import axios from "axios";
import '../ADMINCSS/dashboardstats.css';

const DashboardStats = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get("http://localhost/quanaonam/USERS/totalusers.php?role_as=0");
        setTotalUsers(response.data.count);
      } catch (error) {
        console.error("Lỗi khi lấy tổng số người dùng:", error);
      }
    };

    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get("http://localhost/quanaonam/PRODUCT/totalproducts.php");
        setTotalProducts(response.data.count);
      } catch (error) {
        console.error("Lỗi khi lấy tổng số sản phẩm:", error);
      }
    };

    // Hàm lấy tổng số đơn hàng
    const fetchTotalOrders = async () => {
      try {
        const response = await axios.get("http://localhost/quanaonam/BUY-CARt/totalorders.php");
        setTotalOrders(response.data.count);
      } catch (error) {
        console.error("Lỗi khi lấy tổng số đơn hàng:", error);
      }
    };

    fetchTotalUsers();
    fetchTotalProducts();
    fetchTotalOrders();
  }, []);

  return (
    <div className="dashboard-stats">
      <div className="stat-card">
        <div className="icon user-icon"></div>
        <div className="info">
          <h3>Tổng số người dùng</h3>
          <p>{totalUsers}</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="icon product-icon"></div>
        <div className="info">
          <h3>Tổng số sản phẩm</h3>
          <p>{totalProducts}</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="icon order-icon"></div>
        <div className="info">
          <h3>Tổng số đơn hàng</h3>
          <p>{totalOrders}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
