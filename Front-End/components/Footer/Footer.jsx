import React, { useState } from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'
import Logo from "../../assets/Logo.png"
import { FaCode } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa6";

const Footer = () => {

  const [active, setActive] = useState("Home");

  return (
    <footer>
      <div className="foot-container">
        <div className="foot-left">
          <Link to={"/"}><img src={Logo} alt="" /></Link>
          <p>CodeEmerge offers real-world coding problems with instant outputs and guided learning. Enhance your logic, master key concepts, and progress with every challenge you solve.</p>
        </div>
        <div className="foot-center">
          <h3>Quick Links</h3>
          <nav className='footer-menu'>
            <Link to="/" onClick={()=>setActive("Home")} className={active == "Home" ? "menu-link active" : "menu-link"}>Home</Link>
            <Link to="/about" onClick={()=>setActive("About")} className={active == "About" ? "menu-link active" : "menu-link"}>About</Link>
            <Link to="/problems" onClick={()=>setActive("Problems")} className={active == "Problems" ? "menu-link active" : "menu-link"}>Problems</Link>
            <Link to="/leaderboard" onClick={()=>setActive("Leaderboard")} className={active == "Leaderboard" ? "menu-link active" : "menu-link"}>Leaderboard</Link>
          </nav>
        </div>
        <div className="foot-right">
          <h3>Developers</h3>
          <ul>
            <li><div className="list-icon flex"><FaLaptopCode className='icon' /></div>Awais Mazher</li>
            <li><div className="list-icon flex"><FaLaptopCode className='icon' /></div>Hassan Arif</li>
            <li><div className="list-icon flex"><FaLaptopCode className='icon' /></div>Abdullah Ashfaq</li>
          </ul>
        </div>
      </div>
      <div className="foot-line">
        <div className="icon-container flex">
          <FaCode className='icon-globe' />
        </div>
        <hr />
        <div className="icon-container flex">
          <FaCode className='icon-globe' />
        </div>
      </div>
      <div className="foot-banner flex">
        <span>© 2026 CodeEmerge. All Rights Reserved.</span>
      </div>
    </footer>
  )
}

export default Footer