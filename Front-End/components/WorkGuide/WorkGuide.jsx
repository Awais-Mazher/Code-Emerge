import React from 'react'
import "./WorkGuide.css"
import { useEffect, useState } from "react";

function useIsMobile(breakpoint = 480) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

const WorkGuide = ({motion}) => {

    const isMobile = useIsMobile();

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
          x: isMobile ? 0 : -50,
          y: isMobile ? -50 : 0,
          rotate: -10
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          transition: { duration: 0.6, ease: "easeOut" }
        }
    };

  return (
    <div className='how-it-works-section'>
        <div className="section-title">How It Works</div>
        <div className="how-it-works-container flex">
            <motion.div className="steps-container"
                variants={stepsContainerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
            >
                <motion.div className="step flex" variants={stepsVariant}>1</motion.div>
                <motion.div className="step flex" variants={stepsVariant}>2</motion.div>
                <motion.div className="step flex" variants={stepsVariant}>3</motion.div>
            </motion.div>
            <div className="info-card-container flex">
                <motion.div className="info-card flex"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 , ease: "easeInOut" }}
                  viewport={{once: false, amount: 0.2}}
                >
                    <h3>Choose a Problem</h3>
                    <p>Browse curated challenges by difficulty, topic, and category to start solving, and quickly find the perfect problem that matches your skill level.</p>
                </motion.div>
                <motion.div className="info-card flex"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
                  viewport={{once: false, amount: 0.2}}
                >
                    <h3>Write Your Code</h3>
                    <p>Use the multi-language Monaco editor to code your solution with helpful highlighting and a smooth writing experience.</p>
                </motion.div>
                <motion.div className="info-card flex"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
                  viewport={{once: false, amount: 0.2}}
                >
                    <h3>Run & Improve</h3>
                    <p>Get instant results with real test cases and refine your logic, helping you iterate and improve your solution faster.</p>
                </motion.div>
            </div>
        </div>
    </div>
  )
}

export default WorkGuide