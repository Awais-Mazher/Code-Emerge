import React, { useContext, useState } from "react";
import "./AddProblem.css";
import { WebContext } from "../../context/WebContext";
import axios from "axios"
import { toast } from "react-toastify";

const AddProblem = () => {

  const {url, token} = useContext(WebContext);

  const [data, setData] = useState({
    title: "",
    difficulty: "",
    points: null,
    description: "",
    category: "",
    hints: "",
    examples: "",
    functionName: "",
    initialCodes: "",
    testCases: ""
  });

  // Input Change Handler

  const onChangeHandler = (e)=> {
    const name = e.target.name;
    const value = e.target.value;
    setData(prevData=>({...prevData, [name]:value}));
  }

  // Submission Handler

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    
    const response = await axios.post(url+"/api/problem/add", data, {headers: {token}});

    if(response.data.success){
      toast.success(response.data.message);
    }
    else{
      toast.error(response.data.message);
    }
  }

  return (
    <div className="add-problem">
      <h1 className="add-problem-title">Add New Problem</h1>
      <form className="add-problem-form" onSubmit={onSubmitHandler}>
        <input
          type="text"
          name="title"
          placeholder="Problem Title"
          className="problem-input"
          value={data.title}
          onChange={onChangeHandler}
          required
        />

        <select name="category" className="problem-input" value={data.category} onChange={onChangeHandler} required>
          <option value="">Select Category</option>
          <option value="Array">Array</option>
          <option value="String">String</option>
          <option value="Graph">Graph</option>
          <option value="Greedy">Greedy</option>
          <option value="Hashing">Hashing</option>
          <option value="Dynamic Programming">Dynamic Programming</option>
        </select>

        <div className="problem-row">
          <select className="problem-input" name="difficulty" value={data.difficulty} onChange={onChangeHandler} required>
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select className="problem-input" name="points" value={data.points} onChange={onChangeHandler} required>
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
          placeholder="Enter the Function Name (sum, plindrome)"
          value={data.functionName} 
          onChange={onChangeHandler} 
          required 
        />

        <textarea
          placeholder="Problem Hints [ 'Hint 1', 'Hint 2'.. ]"
          className="problem-textarea"
          name="hints"
          value={data.hints}
          onChange={onChangeHandler}
          required
        />

        <textarea
          placeholder="Problem Description"
          className="problem-textarea"
          name="description"
          value={data.description}
          onChange={onChangeHandler}
          required
        />

        <textarea
          placeholder="Problem Examples [ { 'input': '--', 'output': '--', 'explanation': '--' } ]"
          className="problem-textarea"
          name="examples"
          value={data.examples}
          onChange={onChangeHandler}
          required
        />

        <textarea
          placeholder="Initial Codes { 'js': '--', 'python': '--' }"
          className="problem-textarea"
          name="initialCodes"
          value={data.initialCodes}
          onChange={onChangeHandler}
          required
        />

        <textarea
          placeholder="Test Cases [ { 'input': [--] (Array of parameters), 'output': -- } ]"
          className="problem-textarea"
          name="testCases"
          value={data.testCases}
          onChange={onChangeHandler}
          required
        />

        <button className="add-problem-btn">Add Problem</button>
      </form>
    </div>
  );
};

export default AddProblem;