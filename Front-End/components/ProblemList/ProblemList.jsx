import React, { useState, useContext, useEffect } from 'react'
import "./ProblemList.css"
import { WebContext } from "../../context/WebContext"
import { MdDelete } from "react-icons/md"
import axios from 'axios'
import { useNavigate, NavLink } from "react-router-dom"
import { toast } from "react-toastify"
import { AiFillEdit } from "react-icons/ai"

const ProblemList = () => {
  const { url, token } = useContext(WebContext);
  const [problemData, setProblemData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchProblemData = async ()=>{
    try {
      const response = await axios.get(url+"/api/problem/problemsList");

      if(response.data.success){
        setProblemData(response.data.data);
      }
      else{
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(response.data.message);
    }
    finally{
      setLoading(false);
    }
  }

  const deleteProblem = async (id)=>{
    try {
      const response = await axios.post(url+"/api/problem/delete", {id}, {headers: {token}});

      if(response.data.success){
        toast.success(response.data.message);
        fetchProblemData();
      }
      else{
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(response.data.message);
    }
  }

  const updateProblem = async (id)=>{
    try {
      const response = await axios.post(url+"/api/problem/singleProblem", {problemId: id});

      if(response.data.success){
        navigate("/admin/dashboard/update-problem", {state: {problem: response.data.problem}});
      }
      else{
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchProblemData();
  }, [])
  
  return (
    <div className='problem-list'>
      <h1 className='list-title'>All Problems</h1>

      <div className="problem-list-container">
        <div className="list-row">
          <h3>Sr #</h3>
          <h3>Problem Title</h3>
          <h3>Difficulty</h3>
          <h3>Points</h3>
          <h3>Created On</h3>
          <h3>Actions</h3>
        </div>
        {
          loading ?
            <p>Loading Problems</p>
          : problemData.length === 0 ?
            <p>No Problems Found</p>
          :
          problemData.map((problem, index)=>{
              return (<div className="list-row" key={problem._id}>
                <p>{index+1}</p>
                <p><NavLink to={`/admin/dashboard/problem-details/${problem._id}`} className="problem-title">{problem.title}</NavLink></p>
                <p>{problem.difficulty}</p>
                <p>{problem.points}</p>
                <p>{problem.createdAt.slice(0, 10)}</p>
                <div className="action-buttons">
                  <button className='delete-btn flex' onClick={()=>{deleteProblem(problem._id)}}><MdDelete /></button>
                  <button className='edit-btn flex' onClick={()=>{updateProblem(problem._id)}}><AiFillEdit /></button>
                </div>
              </div>)
          })
        }
      </div>
    </div>
  )
}

export default ProblemList