import React, { useContext, useEffect, useState } from 'react'
import "./Leaderboard.css"
import { WebContext } from "../../context/WebContext"
import axios from 'axios'
import { toast } from "react-toastify";

import Prize1 from "../../assets/Crop-1.png"
import Prize2 from "../../assets/Crop-2.png"
import Prize3 from "../../assets/Crop-3.png"

const Leaderboard = ({motion}) => {

    const {url} = useContext(WebContext);
    const [rankings, setRankings] = useState([]);

    const fetchRankings = async ()=>{
        const response = await axios.get(url+"/api/user/getRanking");
        
        if(response.data.success){
            setRankings(response.data.topUsers.slice(0,3));
        }
        else{
            toast.error(response.data.message);
        }
    }

    useEffect(() => {
      fetchRankings();
    }, [])

    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    }

    const cardVariant = {
        hidden: { opacity: 0, y: 25 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeIn" }
        }
    }

  return (
    <div className='leaderboard-section'>
        <div className="section-title">Our Stars</div>
        <motion.div className="leaderboard-cards flex"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
        >
            <motion.div className="leaderboard-card flex" variants={cardVariant}>
                <div className="trophy-container flex">
                    <img src={Prize1} alt="" />
                </div>
                <h3>{rankings[0] ? rankings[0].username : "No User"}</h3>
                <p className='rank-points'>{rankings[0] ? rankings[0].rankPoints : ".."}</p>
                <p className='point-heading'>Points</p>
            </motion.div>
            <motion.div className="leaderboard-card flex" variants={cardVariant}>
                <div className="trophy-container flex">
                    <img src={Prize2} alt="" />
                </div>
                <h3>{rankings[1] ? rankings[1].username : "No User"}</h3>
                <p className='rank-points'>{rankings[1] ? rankings[1].rankPoints : ".."}</p>
                <p className='point-heading'>Points</p>
            </motion.div>
            <motion.div className="leaderboard-card flex" variants={cardVariant}>
                <div className="trophy-container flex">
                    <img src={Prize3} alt="" />
                </div>
                <h3>{rankings[2] ? rankings[2].username : "No User"}</h3>
                <p className='rank-points'>{rankings[2] ? rankings[2].rankPoints : ".."}</p>
                <p className='point-heading'>Points</p>
            </motion.div>
        </motion.div>
    </div>
  )
}

export default Leaderboard