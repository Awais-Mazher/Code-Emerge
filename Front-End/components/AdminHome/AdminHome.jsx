import React, { useContext, useEffect, useState } from 'react'
import "./AdminHome.css"

import { FaCircleUser } from "react-icons/fa6"
import { FaClipboardList } from "react-icons/fa"
import { WebContext } from "../../context/WebContext";
import axios from 'axios';
import { toast } from "react-toastify";

const AdminHome = () => {
  const { token, url } = useContext(WebContext);
  const [userCount, setUserCount] = useState(0);
  const [problemCount, setProblemCount] = useState(0);
  const [difficultyStats, setDifficultyStats] = useState({});
  const [difficultyPercentage, setDifficultyPercentage] = useState({});
  const [recentProblems, setRecentProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminDataFetch = async ()=>{
    try {
      console.log(token);
      const response = await axios.get(url+"/api/admin/homeData", {headers: {token}});

      if(response.data.success === false){
        toast.error(response.data.message);
      }
      else{
        setUserCount(response.data.data.users);
        setProblemCount(response.data.data.problemCount);
        setDifficultyStats(response.data.data.difficultyStats);
        setRecentProblems(response.data.data.recentProblems);
      }
    } catch (err) {
      toast.error(err);
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    if (problemCount > 0 && difficultyStats) {
      setDifficultyPercentage({
        Easy: ((difficultyStats.Easy || 0) / problemCount * 100).toFixed(0),
        Medium: ((difficultyStats.Medium || 0) / problemCount * 100).toFixed(0),
        Hard: ((difficultyStats.Hard || 0) / problemCount * 100).toFixed(0)
      });
    }
  }, [difficultyStats, problemCount]);

  useEffect(() => {
    if(token){
      adminDataFetch();
    }
  }, [token])

  return (
    <div className='admin-home'>
      <div className="admin-info-cards">
        <div className="admin-info-card">
          <FaCircleUser className='info-icon' />
          <hr />
          <div className="info-items">
            <p>Total Users</p>
            <span>{userCount}</span>
          </div>
        </div>
        <div className="admin-info-card">
          <FaClipboardList className='info-icon' />
          <hr />
          <div className="info-items">
            <p>Total Problems</p>
            <span>{problemCount}</span>
          </div>
        </div>
        <div className="admin-info-card">
          <div className="problem-division">
            <div className="problem-bar" style={{background: `conic-gradient(#22c55e 0% ${difficultyPercentage.Easy}%, #2a2a2a ${difficultyPercentage.Easy}% 100%)`}}>
              <span>{difficultyPercentage.Easy ? difficultyPercentage.Easy : 0}%</span>
            </div>
            <p>Easy Problems</p>
          </div>
          <div className="problem-division">
            <div className="problem-bar" style={{background: `conic-gradient(#FF8C42 0% ${difficultyPercentage.Medium}%, #2a2a2a ${difficultyPercentage.Medium}% 100%)`}}>
              <span>{difficultyPercentage.Medium ? difficultyPercentage.Medium : 0}%</span>
            </div>
            <p>Medium Problems</p>
          </div>
          <div className="problem-division">
            <div className="problem-bar" style={{background: `conic-gradient(#cc1919 0% ${difficultyPercentage.Hard}%, #2a2a2a ${difficultyPercentage.Hard}% 100%)`}}>
              <span>{difficultyPercentage.Hard ? difficultyPercentage.Hard : 0}%</span>
            </div>
            <p>Hard Problems</p>
          </div>
        </div>
      </div>

      <div className="recent-problems">
        <h1>Recent Problems</h1>
        <div className="recent-problems-container">
          <div className="recent-problem">
            <span>Sr #</span>
            <span>Name</span>
            <span>Difficulty</span>
            <span>Points</span>
            <span>Created On</span>
          </div>
          {
            loading ?
              <p>Loading Problems</p>
            : recentProblems.length === 0 ?
              <p>No Problems Found</p>
            :
            recentProblems.map((problem, index)=>{
              return (<div className="recent-problem" key={problem._id}>
                  <span>{index+1}</span>
                  <span>{problem.title}</span>
                  <span>{problem.difficulty}</span>
                  <span>{problem.points}</span>
                  <span>{problem.createdAt.slice(0, 10)}</span>
                </div>)
              })
          }
        </div>
      </div>
    </div>
  )
}

export default AdminHome