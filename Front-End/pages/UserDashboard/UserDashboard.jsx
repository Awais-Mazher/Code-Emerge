import React, { useContext, useEffect, useState } from 'react';
import "./UserDashboard.css";
import { WebContext } from "../../context/WebContext";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";

import { 
  FaUserCircle,
  FaMedal,
  FaCheckCircle,
  FaPercentage
} from "react-icons/fa";
import { FaFileCode } from "react-icons/fa6";
import { PiRankingFill  } from "react-icons/pi";
import { RiRobot3Fill } from "react-icons/ri";

const UserDashboard = () => {

  const {userData} = useContext(WebContext);
  const [accuracy, setAccuracy] = useState(0);
  const [problemStats, setProblemStats] = useState({
    easy: 0,
    medium: 0,
    hard: 0
  });

  useEffect(() => {
    const accepted = userData?.submissions?.filter((sub)=>{
      return sub.status === "Accepted"
    }).length || 0;
    const accuracy = ((accepted / userData?.submissions?.length) * 100).toFixed(0);
    setAccuracy(accuracy);
  }, [userData])

  useEffect(() => {
    let easy = 0, medium = 0, hard = 0;
    let totalProblemsSolved = userData?.problemsSolved?.length;
    userData?.problemsSolved?.forEach((problem)=>{
      if(problem.difficulty === "Easy"){
        easy++;
      }
      else if(problem.difficulty === "Medium"){
        medium++
      }
      else{
        hard++;
      }
    })
    setProblemStats({
      easy: ((easy / totalProblemsSolved)*100).toFixed(2),
      medium: ((medium / totalProblemsSolved)*100).toFixed(2),
      hard: ((hard / totalProblemsSolved)*100).toFixed(2)
    });
    console.log(problemStats)
  }, [userData])

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
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className='user-dashboard'>
      <motion.div className="profile-banner flex"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
          <div className="left-info">
            <FaUserCircle className='profile-icon' />
            <div className="profile-info">
              <h3 className='username'>{userData?.username}</h3>
              <p>{userData?.email}</p>
            </div>
          </div>
          <div className="right-info">
            <FaMedal className='rank-icon' />
            <div className="rank-info">
              <h3 className='rank-points'>{userData?.rankPoints}</h3>
              <p>Rank Points</p>
            </div>
          </div>
      </motion.div>

      <motion.div className="user-stats-container flex"
        variants={stepsContainerVariant}
        initial="hidden"
        animate="visible"
      >
          <motion.div className="user-stats"
            variants={stepsVariant}
          >
            <h3>Problems Solved</h3>
            <hr />
            <div className="stats-info">
              <FaCheckCircle className="stats-icon" />
              <span>{userData?.problemsSolved?.length}</span>
            </div>
          </motion.div>
          <motion.div className="user-stats"
            variants={stepsVariant}
          >
            <h3>Accuracy</h3>
            <hr />
            <div className="stats-info">
              <FaPercentage className="stats-icon" />
              <span>{accuracy}</span>
            </div>
          </motion.div>
          <motion.div className="user-stats"
            variants={stepsVariant}
          >
            <h3>Submissions</h3>
            <hr />
            <div className="stats-info">
              <FaFileCode  className="stats-icon" />
              <span>{userData?.submissions?.length}</span>
            </div>
          </motion.div>
          <motion.div className="user-stats"
            variants={stepsVariant}
          >
            <h3>Current Level</h3>
            <hr />
            <div className="stats-info">
              <PiRankingFill className='stats-icon' />
              <span className='rank'>
                {
                  userData?.problemsSolved?.length > 14
                  ? "Master"
                  : userData?.problemsSolved?.length > 9
                  ? "Intermediate"
                  : "Beginner"
                }
              </span>
            </div>
          </motion.div>
      </motion.div>

      <motion.div className="user-problem-data flex"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <div className="problem-stat-container">
          <h3>Problem Stats</h3>
          <div className="problem-stat flex">
            <span>Easy</span>
            <div className="progress-bar">
              <div className='progress progress-1' style={{width: `${problemStats.easy}%`}}></div>
            </div>
          </div>
          <div className="problem-stat flex">
            <span>Medium</span>
            <div className="progress-bar">
              <div className='progress progress-2' style={{width: `${problemStats.medium}%`}}></div>
            </div>
          </div>
          <div className="problem-stat flex">
            <span>Hard</span>
            <div className="progress-bar">
              <div className='progress progress-3' style={{width: `${problemStats.hard}%`}}></div>
            </div>
          </div>
        </div>

        <div className="problem-submissions">
          <h3>Submissions</h3>
          <table className='submission-table'>
            <thead>
              <tr>
                <th>Sr #</th>
                <th>Name</th>
                <th>Difficulty</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {
                userData?.submissions?.map((submission, index)=>{
                  return (
                    index < 4
                    ? <tr>
                      <td>{index+1}</td>
                      <td className='problem-title'>{submission.problemTitle}</td>
                      <td className={
                        submission.problemDifficulty === "Easy" 
                        ? "easy" 
                        : submission.problemDifficulty === "Medium" 
                        ? "medium" 
                        : "hard"
                        }>{submission.problemDifficulty}</td>
                      <td>{submission.status}</td>
                    </tr>
                    : <></>
                  )
                })
              }
            </tbody>
          </table>
          <div className='submissions-link flex'>
            {
              userData?.submissions?.length > 4
              ? <NavLink className="link-text" state={{submissions: userData?.submissions}} to="/user/dashboard/submissions">{`See All ->`}</NavLink>
              : <></>
            }
          </div>
        </div>
      </motion.div>

      {
        (accuracy<50) && (userData?.submissions?.length>0) 
        &&  <NavLink state={{submissions: userData?.submissions}} to="/user/dashboard/submissions" className="model-btn flex">
              <RiRobot3Fill className='icon' />
              <div className='icon-text'>
              <p>{`Want help? Use our AI ->`}</p>
              </div>
            </NavLink>
      }

    </div>
  )
}

export default UserDashboard