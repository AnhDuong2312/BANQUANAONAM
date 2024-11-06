// Admin.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Slidebar";
import AddProduct from "./AddProduct";
import AllProducts from "./AllProducts";
import DashboardStats from "./DashboardStats";
import OrderManage from "./OrderManage";
import UserManage from "./UserManage";
import AddCategory from "./AddCategory";
import ConTact from "./ConTact";
import AllCategories from "./AllCategories";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../ADMINCSS/admin.css';

function Admin() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();

  
  useEffect(() => {
    const userRole = localStorage.getItem('role_as'); 

    if (!userRole || parseInt(userRole, 10) !== 1) {
      toast.error('Bạn không có quyền truy cập trang admin!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
      });
      
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [navigate]);

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardStats />;
      case "userManage":
        return <UserManage />;
      case "orderManage":
        return <OrderManage />;
      case "allCategories":
        return <AllCategories />;
      case "addCategory":
        return <AddCategory />;
      case "allProducts":
        return <AllProducts />;
      case "addProduct":
        return <AddProduct />;
      case "contact": 
        return <ConTact/> 
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="admin">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="content">
        {renderContent()}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Admin;
