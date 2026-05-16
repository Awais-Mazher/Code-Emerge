import React, { useContext, useEffect, useState } from 'react'
import "./Leaderboard.css"
import axios from "axios"
import { WebContext } from "../../context/WebContext.jsx"
import { toast } from 'react-toastify'
import { motion } from "framer-motion"

import Medal1 from "../../assets/Crop-1.png"
import Medal2 from "../../assets/Crop-2.png"
import Medal3 from "../../assets/Crop-3.png"
import { PiMedal } from "react-icons/pi";

const Leaderboard = () => {

  const [topUsers, setTopUsers] = useState([]);
  const [difficultyStats, setDifficultyStats] = useState([]);
  const {url} = useContext(WebContext);

  const fetchUserRanking = async ()=>{
    const result = await axios.get(url+"/api/user/getRanking");

    if(result.data.success){
      setTopUsers(result.data.topUsers);
    }
    else{
      toast.error(result.data.message);
    }
  }

  useEffect(() => {
    const stats = [];
    topUsers.forEach((user)=>{
      let easy = 0, medium = 0, hard = 0;
      const totalProblemsSolved = user.problemsSolved.length;
      user.problemsSolved.forEach((problem)=>{
        if(problem.difficulty === "Easy"){
          easy++;
        }
        else if(problem.difficulty === "Medium"){
          medium++;
        }
        else{
          hard++;
        }
      })

      if(totalProblemsSolved === 0){
        stats.push({ easy: "0.00", medium: "0.00", hard: "0.00" });
      }
      else{
        stats.push({
          easy: ((easy / totalProblemsSolved)*100).toFixed(2),
          medium: ((medium / totalProblemsSolved)*100).toFixed(2),
          hard: ((hard / totalProblemsSolved)*100).toFixed(2)
        })
      }
    })
    setDifficultyStats(stats);
  }, [topUsers])

  useEffect(() => {
    fetchUserRanking();
  }, [])
  
  return (
    <div className='leaderboard flex'>
        <div className="leaderboard-container">
            <div className="main-heading flex">
                <h1>Leaderboard</h1>
            </div>
            <div className="leaderboard-list">
              <div className="leaderboard-row leaderboard-head">
                <p>Medal</p>
                <p>Rank</p>
                <p>Username</p>
                <p>Points</p>
                <p>Problem Stats</p>
              </div>
              <div>
                {
                topUsers.length !== 0
                ? topUsers.map((user, index)=>{
                  const rank = index+1;
                  return (
                    <motion.div className="leaderboard-row" key={user._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index*0.1, ease: "easeInOut" }}
                    >
                        {
                          rank === 1 
                          ? <img src={Medal1} className='medal-image' alt="" />
                          : rank === 2
                          ? <img src={Medal2} className='medal-image' alt="" />
                          : rank === 3
                          ? <img src={Medal3} className='medal-image' alt="" />
                          : <PiMedal className='medal-icon' />
                        }
                      <p className='rank-number'>{index+1}</p>
                      <p className='username'>{user.username}</p>
                      <p>{user.rankPoints}</p>
                      <div className="stats-bar">
                        <div className="easy-bar" style={{width: `${difficultyStats[index]?.easy}%`}}></div>
                        <div className="medium-bar" style={{width: `${difficultyStats[index]?.medium}%`}}></div>
                        <div className="hard-bar" style={{width: `${difficultyStats[index]?.hard}%`}}></div>
                      </div>
                    </motion.div>
                  )
                })
                : <p className='no-found-message'>No users found.</p>
                }
              </div>
            </div>
        </div>
    </div>
  )
}

export default Leaderboard