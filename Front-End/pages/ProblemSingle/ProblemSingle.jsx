import React, { useState, useEffect, useContext } from 'react'
import "./ProblemSingle.css"
import axios from "axios"
import { NavLink } from "react-router-dom"
import Editor from "@monaco-editor/react"
import { useLocation } from "react-router-dom"
import { WebContext } from '../../context/WebContext'
import { toast } from "react-toastify"

import { FaArrowLeftLong } from "react-icons/fa6"
import { IoPlay } from "react-icons/io5"
import { MdCloudUpload } from "react-icons/md"

// Components for left tabs

const DescriptionComponent = ({heading, description})=>{
  return(
    <div className='tab-component'>
      <h2>{heading}</h2>
      <p>{description}</p>
    </div>
  )
}

const HintsComponent = ({hints})=>{
  return(
    <div className='tab-component'>
      {
        hints.map((hint, index)=>{
          return <p className='hint'>{`${index+1}) ${hint}`}</p>
        })
      }
    </div>
  )
}

const ExamplesComponent = ({examples})=>{
  return(
    <div className='tab-component'>
      {
        examples.map((example, index)=>{
          return <div className='example-container'>
            <div className='heading'>
              <div className="spinner flex">{index+1}</div>
              <span>Example</span>
            </div>
            <div className="example-content">
              <div>Input: <span>{example.input}</span></div>
              <div>Output: <span>{example.output}</span></div>
              <div>Exaplanation: <span>{example.explanation}</span></div>
            </div>
          </div>
        })
      }
    </div>
  )
}

const ProblemSingle = () => {

  const location = useLocation();
  const { problemId } = location.state || {};
  const {url, token} = useContext(WebContext);

  // States

  const [activeTab, setActiveTab] = useState("description");
  const [language, setLanguage] = useState("javascript");
  const [languageId, setLanguageId] = useState(63);
  const [problemData, setProblemData] = useState({});
  const [activeCaseTab, setActiveCaseTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [runOrSubmit, setRunOrSubmit] = useState("");
  const [results, setResults] = useState([]);
  const [code, setCode] = useState("");

  // Helper Methods

  // Problem Fetch Method

  const problemFetch = async (problemId)=>{
    const response = await axios.post(url+"/api/problem/singleProblem", {problemId});
    if(response.data.success){
      setProblemData(response.data.problem);
    }
    else{
      toast.error(response.data.message);
    }
  }

  // Code Exectuion Handler Method

  const handleRun = async (testCases, functionName, languageId, userCode)=>{
    if(userCode !== ""){
      try {
        setLoading(true);
        setRunOrSubmit("Run");
        const response = await axios.post(url+"/api/submission/run", {testCases, functionName, languageId, userCode});
        const outputs = response.data.result.map(data => data.result);
        setResults(outputs);

        const allAccepted = outputs.every((result)=> result === "Accepted");

        if(allAccepted){
          toast.success("Your solution is correct");
        }
        else{
          toast.error("Your solution is not correct")
        }
      } catch (err) {
        toast.error("Execution Failed");
      } finally{
        setLoading(false);
        setRunOrSubmit("");
      }
    }
    else{
      toast.error("Please write some code");
    }
  }

  const handleSubmit = async (testCases, functionName, languageId, userCode, points, problemTitle, problemDescription, problemDifficulty)=>{
    if(token === ""){
      toast.error("You must be logged in to Submit");
    }

    if(userCode !== ""){
      try {
        setLoading(true);
        setRunOrSubmit("Submit");
        const response = await axios.post(url+"/api/submission/submit", {testCases, functionName, languageId, userCode, points, problemTitle, problemDescription, problemDifficulty, problemId, language, token});
        const result = response.data;

        setResults(result.output.map(data => data.result));

        if(result.success){
          if(result.result){
            toast.success(result.message);
          }
          else{
            toast.error(result.message);
          }
        }
        else{
          toast.error(result.message);
        }
      } catch (err) {
        toast.error("Execution Failed");
      } finally{
        setLoading(false);
        setRunOrSubmit("");
      }
    }
    else{
      toast.error("Please write some code");
    }
  }

  // Probelm Fetch UseEffect

  useEffect(() => {
    if(problemId){
      problemFetch(problemId);
    }
  }, [problemId])

  // Initial Code Setter UseEffect

  useEffect(() => {
    if(problemData.initialCodes){
      switch (language) {
        case "javascript":
          setCode(problemData.initialCodes.js);
          break;
        case "python":
          setCode(problemData.initialCodes.python);
          break;
        default:
          break;
      }
    }
  }, [language, problemData])

  // Language Id Setter UseEffect
  
  useEffect(() => {
    if(language === "javascript"){
      setLanguageId(63);
    }
    else{
      setLanguageId(71);
    }
  }, [language])

  // Results Array Timeout UseEffect

  useEffect(() => {
    if (results.length === 0) return;
  
    const timer = setTimeout(() => {
      setResults([]);
    }, 5000);
  
    return () => clearTimeout(timer);
  }, [results]);
  
  return (
    <div className='page-container'>
      <div className="header-strip">
        <NavLink to="/problems" className="back-link"><FaArrowLeftLong /> <span>Back to Problems</span></NavLink>
        <div className="run-buttons">
          <button 
            onClick={()=>handleRun(problemData.testCases, problemData.functionName, languageId, code)} 
            disabled={loading}
          >
            {loading && runOrSubmit === "Run" ? 
              <svg className="spinner" viewBox="0 0 50 50">
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke="#FF8C42"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="90 150"
                  strokeDashoffset="0"
                />
              </svg> 
            : <IoPlay className='button-icon' />} 
            <span>Run</span>
          </button>
          <button 
            onClick={()=>handleSubmit(problemData.testCases, problemData.functionName, languageId, code, problemData.points, problemData.title, problemData.description, problemData.difficulty)} 
            disabled={loading}
          >
            {loading && runOrSubmit === "Submit" ? 
              <svg className="spinner" viewBox="0 0 50 50">
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke="#FF8C42"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="90 150"
                  strokeDashoffset="0"
                />
              </svg> 
            : <MdCloudUpload className='button-icon' />} 
            <span>Submit</span>
          </button>
        </div>
        <div className="language-selector">
          <select defaultValue="javascript" value={language} onChange={(e)=>setLanguage(e.target.value)}>
            <option value="javascript">Javascript</option>
            <option value="python">Python</option>
          </select>
        </div>
      </div>

      <div className="main-container">
        <div className="left-details">
          <div className="tabs-bar">
            <button className={activeTab == "description" ? "tab-btn active" : "tab-btn"} onClick={()=>setActiveTab("description")}>Description</button>
            <button className={activeTab == "hints" ? "tab-btn active" : "tab-btn"} onClick={()=>setActiveTab("hints")}>Hints</button>
            <button className={activeTab == "examples" ? "tab-btn active" : "tab-btn"} onClick={()=>setActiveTab("examples")}>Examples</button>
          </div>

          <div className="tabs-content">
            {
              activeTab == "description" && <DescriptionComponent heading={problemData.title} description={problemData.description} />
            }
            {
              activeTab == "hints" && <HintsComponent hints={problemData.hints}/>
            }
            {
              activeTab == "examples" && <ExamplesComponent examples={problemData.examples}/>
            }
          </div>
        </div>

        <div className="right-editor">
          <div className="editor-wrapper">
            <Editor
              className='editor-component'
              language={language}
              value={code}
              onChange={(value)=>setCode(value || "")}
              options={{
                minimap: {enabled: false},
                wordWrap: "on",
                automaticLayout: true
              }}
              theme="vs-dark"
            />
          </div>

          <div className="test-case-container">
            <h2>Test Cases</h2>

            <div className="test-case-tabs">
              <button 
                className={
                  `${activeCaseTab === 1 ? "active" : ""}
                   ${results[0] === "Accepted" ? "accept" : ""}
                   ${results[0] && results[0] !== "Accepted" ? "reject" : ""}
                  `
                }
                onClick={()=>setActiveCaseTab(1)}
              >
                Case 1
              </button>
              <button 
                className={
                  `${activeCaseTab === 2 ? "active" : ""}
                   ${results[1] === "Accepted" ? "accept" : ""}
                   ${results[1] && results[1] !== "Accepted" ? "reject" : ""}
                  `
                }
                onClick={()=>setActiveCaseTab(2)}
              >
                Case 2
              </button>
              <button 
                className={
                  `${activeCaseTab === 3 ? "active" : ""}
                   ${results[2] === "Accepted" ? "accept" : ""}
                   ${results[2] && results[2] !== "Accepted" ? "reject" : ""}
                  `
                }
                onClick={()=>setActiveCaseTab(3)}
              >
                Case 3
              </button>
            </div>

            <div className="test-case-content">
              <div className="input-container">
                <p>Input: </p>
                <div>
                  {
                    problemData?.testCases?.[activeCaseTab-1]?.input.map((input)=>{
                      return <span>{JSON.stringify(input)}</span>
                    })
                  }
                </div>
              </div>
              <div className="output-container">
                <p>Output: </p>
                <div>
                  {
                    <span>{JSON.stringify(problemData?.testCases?.[activeCaseTab-1].output)}</span>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemSingle