import React, { useContext, useState } from 'react';
import "./Header.css";
import { NavLink } from "react-router-dom";
import { WebContext } from "../../context/WebContext";
import Logo from "../../assets/Logo.png";
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

const Header = ({setShowOverlay, showMenu, setShowMenu}) => {

  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const {token, setToken, userData, setUserData} = useContext(WebContext);

  const openMenuHandler = ()=>{
    setShowMenu(true);
    setShowOverlay(true);  
  }

  const closeMenuHandler = ()=>{
    setShowMenu(false);
    setShowOverlay(false);
  }

  const logout = (e)=> {
    e.preventDefault();
    setToken("");
    setUserData({});
    localStorage.setItem("token", "");
    navigate("/");
  }

  return (
    <header>
      <div className="header-left">
        <NavLink to="/" className="logo"><img src={Logo} alt="CodeEmerge Logo" /></NavLink>
      </div>
      <div className="header-right">
        <nav className={showMenu ? "menu-links show-menu" : "menu-links"}>
          <NavLink to="/" className={({isActive}) => isActive ? "menu-link active" : "menu-link"}>Home</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "menu-link active" : "menu-link"}>About</NavLink>
          <NavLink to="/problems" end className={({isActive}) => isActive ? "menu-link active" : "menu-link"}>Problems</NavLink>
          <NavLink to="/leaderboard" className={({isActive}) => isActive ? "menu-link active" : "menu-link"}>Leaderboard</NavLink>
          {
            !token
              ? <NavLink className={({isActive}) => isActive ? "login-btn-2 active" : "login-btn-2"} to="/login">Login</NavLink>
              : <></>
          }
          <IoCloseSharp className='close-icon' onClick={closeMenuHandler}/>
        </nav>
        <div className="mobile-menu">
            <GiHamburgerMenu onClick={openMenuHandler}/>
        </div>
        {
          !token
          ? <NavLink className={({isActive}) => isActive ? "login-btn-1 active" : "login-btn-1"} to="/login">Login</NavLink>
          : <NavLink className='dashboard-btn flex' onClick={()=>setShowProfile(!showProfile)}><FaUser /></NavLink>
        }
        {
          token
          ? <div className={showProfile ? "user-profile-popup active" : "user-profile-popup"}>
              <div className="profile-info flex">
                <h3 className='username'>{userData?.username}</h3>
                {
                  userData?.role === "user"
                  ? <div className="user-points flex">
                      <h3>{userData?.rankPoints}</h3>
                      <p>Points</p>
                    </div>
                  : <></>
                }
              </div>
              <hr />
              <div className="profile-links">
                <div className="link flex">
                  <HiOutlineLogout className='link-icon' />
                  <a href='' onClick={logout}>Logout</a>
                </div>
                <div className="link flex">
                  <CgProfile className='link-icon' />
                  {
                    userData?.role === "user"
                    ? <NavLink to="/user/dashboard" onClick={()=>setShowProfile(!showProfile)}>Profile</NavLink>
                    : <NavLink to="/admin/dashboard" onClick={()=>setShowProfile(!showProfile)}>Profile</NavLink>
                  }
                </div>
              </div>
            </div>
          : <></>
        }
      </div>
    </header>
  )
}

export default Header