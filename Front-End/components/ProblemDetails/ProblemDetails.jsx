import React, { useContext, useEffect, useState } from "react"
import "./ProblemDetails.css"
import axios from "axios"
import { useParams } from "react-router-dom"
import { WebContext } from "../../context/WebContext"

const ProblemDetails = () => {
    const {problemId} = useParams();
    const {url} = useContext(WebContext);
    const [data, setData] = useState({
      title: "",
      difficulty: "",
      points: null,
      description: "",
      category: "",
      hints: "",
      functionName: "",
      initialCodes: "",
      testCases: ""
    });

    const fetchProblem = async (id)=>{
      try {
        const response = await axios.post(url+"/api/problem/singleProblem", {problemId: id});
        const problem = response.data.problem;
  
        if(response.data.success){
          setData({
            title: problem.title,
            difficulty: problem.difficulty,
            points: problem.points,
            description: problem.description,
            category: problem.category,
            hints: JSON.stringify(problem.hints, null, 2),
            functionName: problem.functionName,
            examples: JSON.stringify(problem.examples, null, 2),
            initialCodes: JSON.stringify(problem.initialCodes),
            testCases: JSON.stringify(problem.testCases)
          });
        }
        else{
          toast.error(response.data.message);
        }
      } catch (err) {
        console.log(err);
        toast.error("An Error occured");
      }
    }

    useEffect(() => {
      fetchProblem(problemId);
    }, [])

    return (
        <div className="problem-details">
          <h1 className="problem-title">Problem Details</h1>
          <form className="problem-form">
            <input
              type="text"
              name="title"
              className="problem-input"
              value={data.title}
              required
            />
    
            <select name="category" className="problem-input" value={data.category} required>
              <option value="">Select Category</option>
              <option value="Array">Array</option>
              <option value="String">String</option>
              <option value="Graph">Graph</option>
              <option value="Greedy">Greedy</option>
              <option value="Hashing">Hashing</option>
              <option value="Dynamic Programming">Dynamic Programming</option>
            </select>
    
            <div className="problem-row">
              <select className="problem-input" name="difficulty" value={data.difficulty} required>
                <option value="">Select Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
    
              <select className="problem-input" name="points" value={data.points} required>
                <option value="">Select Points</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
    
            <input 
              type="text"  
              className="problem-input" 
              name="functionName"
              value={data.functionName} 
              required 
            />
    
            <textarea
              className="problem-textarea"
              name="hints"
              value={data.hints}
              required
            />
    
            <textarea
              className="problem-textarea"
              name="description"
              value={data.description}
              required
            />

            <textarea
              className="problem-textarea"
              name="description"
              value={data.examples}
              required
            />
    
            <textarea
              className="problem-textarea"
              name="initialCodes"
              value={data.initialCodes}
              required
            />
    
            <textarea
              className="problem-textarea"
              name="testCases"
              value={data.testCases}
              required
            />
          </form>
        </div>
      );
}

export default ProblemDetails