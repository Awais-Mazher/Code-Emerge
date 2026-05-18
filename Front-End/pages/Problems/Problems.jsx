import React, { useContext, useEffect, useState } from 'react'
import "./Problems.css"
import axios from "axios"
import { motion } from "framer-motion"
import { WebContext } from "../../context/WebContext.jsx"
import { NavLink } from "react-router-dom"

import { MdOutlineSearch } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

const Problems = () => {

  const {url, userData} = useContext(WebContext);
  const [problemList, setProblemList] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [difficultyInput, setDifficultyInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  const problemsFetching = async ()=>{
    const response = await axios.get(url+"/api/problem/problemsList");
    setProblemList(response.data.data);
  }

  const filteredProblems = problemList.filter(problem => {
    if (difficultyInput && problem.difficulty !== difficultyInput) {
      return false;
    }
  
    if (categoryInput && problem.category !== categoryInput) {
      return false;
    }
  
    if (searchInput && !problem.title.toLowerCase().includes(searchInput.toLowerCase())) {
      return false;
    }
  
    return true;
  });  

  useEffect(() => {
    problemsFetching();
  }, [])

  useEffect(() => {
    if(userData?.problemsSolved?.length){
      const dataArray = userData.problemsSolved.map(problem => problem);
      console.log(dataArray);
      setSolvedProblems(dataArray);
    }
  }, [userData])
  
  return (
    <div className='problems'>
      <div className="main-heading">Problems</div>

      <div className="filter-container">
        <div className="left-side">
          <div className="filter">
            <input type="text" name="" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} placeholder='Search by Name' />
            <MdOutlineSearch className='filter-icon'/>
          </div>
        </div>
        <div className="right-side">
          <div className="filter">
            <select name="" id="" value={difficultyInput} onChange={(e)=>setDifficultyInput(e.target.value)}>
              <option value="">Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div className="filter">
            <select name="" id="" value={categoryInput} onChange={(e)=>setCategoryInput(e.target.value)}>
              <option value="">Problem Category</option>
              <option value="Array">Array</option>
              <option value="Graph">Graph</option>
              <option value="Greedy">Greedy</option>
              <option value="Hashing">Hashing</option>
              <option value="String">String</option>
              <option value="Dynamic Programming">Dynamic Programming</option>
            </select>
          </div>
        </div>
      </div>

      <div className="problem-container">
        <div className="problem problem-head">
          <div>Status</div>
          <p>Sr #</p>
          <p>Problem Title</p>
          <p>Difficulty</p>
          <p>Category</p>
          <p>Points</p>
        </div>
        {
          filteredProblems.length !== 0 ?
          filteredProblems.map((problem, index)=>{
            return  <motion.div className="problem" key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index*0.1, ease: "easeInOut" }}
                    >
                      <div className='status-box'>
                        {
                          solvedProblems?.some(prob => prob._id === problem?._id) && (<FaCircleCheck className='check-icon' />)
                        }
                      </div>
                      <p className='sr-no'>{index+1}</p>
                      <NavLink state={{problemId: problem._id}} to={`/problems/${problem.title.toLowerCase().split(" ").join("-")}`} className="problem-heading">{problem.title}</NavLink>
                      <p className={problem.difficulty === "Easy" ? "easy" : problem.difficulty === "Medium" ? "medium" : "hard"}>{problem.difficulty}</p>
                      <p>{problem.category}</p>
                      <p>{problem.points}</p>
                    </motion.div>
          }) : <p className='no-result-heading'>No problems found or matched the filter</p>
        }
      </div>
    </div>
  )
}

export default Problems