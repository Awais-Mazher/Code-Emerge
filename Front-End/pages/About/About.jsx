import React from 'react'
import "./About.css"

import { motion } from "framer-motion"
import AboutImage from "../../assets/About.png"
import { FaCodepen } from "react-icons/fa"
import { FaCode } from "react-icons/fa6"
import { FaCodeBranch } from "react-icons/fa"

const About = () => {

  const stepsContainerVariant = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
  }

  const stepsVariant = {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className='about-container'>
      <motion.div className="left-image"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <img src={AboutImage} className='about-image' alt="" />
      </motion.div>
      <div className="right-content">
        <motion.h2
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >About Us</motion.h2>
        <motion.p
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >CodeEmerge is a web-based coding practice platform designed to help students and aspiring developers strengthen their problem-solving skills through hands-on programming challenges. Inspired by platforms like LeetCode, it provides an interactive environment where users can solve coding problems, test their solutions, and improve their understanding of algorithms and programming concepts.</motion.p>
        <motion.div className="icon-box"
          variants={stepsContainerVariant}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="icon flex" variants={stepsVariant}><FaCodepen /></motion.div>
          <motion.div className="icon flex" variants={stepsVariant}><FaCode /></motion.div>
          <motion.div className="icon flex" variants={stepsVariant}><FaCodeBranch /></motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default About