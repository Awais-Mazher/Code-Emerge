import React, { useContext } from 'react';
import "./AdminDashboard.css";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { WebContext } from '../../context/WebContext';

import { IoMdAddCircle } from "react-icons/io";
import { IoListCircleSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { FaUsers } from "react-icons/fa6";

import Logo from "../../assets/Logo.png";

const AdminDashboard = () => {

  const { setToken, setUserData } = useContext(WebContext);
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    setToken("");
    setUserData({});
    localStorage.setItem("token", "");
    navigate("/");
  };

  return (
    <div className='admin-dashboard'>
      <div className="left-sidebar">
        <NavLink to="/admin/dashboard"><img src={Logo} className='logo' alt="CodeEmerge Logo" /></NavLink>
        <NavLink to="/admin/dashboard" end className={({isActive})=> isActive ? "logo-mob active" : "logo-mob"}><FaHome /></NavLink>
        <div className="sidebar-links">
          <NavLink to="/admin/dashboard/add-problem" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <IoMdAddCircle className='link-icon' />
            <span className="link-text">Add Problem</span>
          </NavLink>
          <NavLink to="/admin/dashboard/problems" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <IoListCircleSharp className='link-icon' />
            <span className="link-text">All Problems</span>
          </NavLink>
          <NavLink to="/admin/dashboard/users" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaUsers className='link-icon' />
            <span className="link-text">All Users</span>
          </NavLink>
        </div>
        <div className="logout-link" onClick={logout}>
          <span>Logout</span>
          <IoIosLogOut className="logout-icon" />
        </div>
      </div>

      <div className="right-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
