import React from 'react'
import "./Hero.css"
import { NavLink } from "react-router-dom"

import { CiLocationArrow1 } from "react-icons/ci"
import { FaArrowDownLong } from "react-icons/fa6"
import HeroImg from "../../assets/Hero_Image.png"

const Hero = ({motion}) => {
  return (
    <div className='hero-section'>
      <div className="hero-left">
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          Level Up Your Coding Skills
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          Level up your coding skills with real-world programming challenges designed to sharpen your thinking, boost your logic, and build confidence one problem at a time.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
           <NavLink className="main-btn" to="/problems">
              Start Coding
              <CiLocationArrow1 className='btn-icon' />
            </NavLink>
        </motion.div>
        <div className="next-section-slider">
          <a href="#features-section"><FaArrowDownLong /></a>
        </div>
      </div>
      <div className="hero-right">
        <motion.img src={HeroImg} alt=""
          initial={{ opacity: 0, x: 40, rotate: 20 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>
    </div>
  )
}

export default Hero