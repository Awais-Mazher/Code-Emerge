import React, { useContext, useState } from 'react';
import "./Submissions.css";
import { useLocation } from 'react-router-dom';
import { WebContext } from '../../context/WebContext';
import { toast } from "react-toastify";

import { FaCode } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { SiTicktick } from "react-icons/si";
import axios from 'axios';

const Submissions = ({setShowOverlay, showPopup, setShowPopup, showAiResults, setShowAiResults}) => {

  const {url} = useContext(WebContext);
  const location = useLocation();
  const {submissions} = location.state || [];
  const [submissionDetails, setSubmissionDetails] = useState({});
  const [aiResults, setAiResults] = useState([]);

  const titleClickHandler = (submission)=>{
    setShowPopup(true);
    setShowOverlay(true);
    setSubmissionDetails(submission);
  }

  const buttonClickHandler = async (submission)=>{

    const response = await axios.post(url+"/api/analyzer/analyze", {problem_title: submission.problemTitle, problem_description: submission.problemDescription, language: submission.language, code: submission.code});

    if(response.data.success){
      console.log(response.data);
      setAiResults(response.data.results);
      setShowAiResults(true);
      setShowOverlay(true);
    }
    else{
      toast.error(response.data.message);
    }

  }

  return (
    <div className='ai-service'>
      <h1>Submissions</h1>

      <div className="submissions-container">
        {
          submissions?.map((submission, index)=>{
            return <div className="submission" key={index}>
                      <div className="icon flex">
                        <FaCode />
                      </div>
                      <p>
                        <span className='submission-problem-title' onClick={()=>titleClickHandler(submission)}>{submission.problemTitle}</span>
                      </p>
                      <p className={submission.problemDifficulty === "Easy" ? "difficulty easy" : submission.problemDifficulty === "Medium" ? "difficulty medium" : "difficulty hard"}>
                        {submission.problemDifficulty}
                      </p>
                      <p>
                        {submission.language}
                      </p>
                      <p className={submission.status === "Accepted" ? "status accepted" : "status rejected"}>
                        {submission.status}
                      </p>
                      <div className='flex'>
                        <button onClick={()=>buttonClickHandler(submission)}>Get Help</button>
                      </div>
                   </div>
          })
        }
      </div>

      <div className={showPopup ? "submission-details-popup popup-active" : "submission-details-popup"}>
        <h2>Submission Details</h2>
        <div className="detail-row">
          <h3>Problem Title:</h3>
          <p>{submissionDetails?.problemTitle}</p>
        </div>
        <div className="detail-row">
          <h3>Problem Difficulty:</h3>
          <p>{submissionDetails?.problemDifficulty}</p>
        </div>
        <div className="detail-row">
          <h3>Language:</h3>
          <p>{submissionDetails?.language}</p>
        </div>
        <div className="detail-row">
          <h3>Status:</h3>
          <p>{submissionDetails?.status}</p>
        </div>
        <div className="submission-code">
          <h3>Submission's Code</h3>
          <pre>
            <code>{submissionDetails?.code}</code>
          </pre>
        </div>
      </div>

      <div className={showAiResults ? "ai-suggestions-popup popup-active" : "ai-suggestions-popup"}>
        <h1>AI Help</h1>

        <div className="ai-data-container flex">
          <div className="left-container">
            <h2>Description</h2>
            <p>{aiResults ? aiResults.description : "No description was given."}</p>
          </div>
          <hr />
          <div className="right-container">
            <h2>Weak Areas</h2>
            <div className="weak-points-container">
              {
                aiResults?.weak_areas?.map((weakness, index)=>{
                  return <div className="point" key={index}>
                          <RxCross2 className='point-icon' />
                          <p className='point-text'>{weakness}</p>
                        </div>
                })
              }
            </div>
            <h2>Suggestions</h2>
            <div className="suggestions-container">
              {
                aiResults?.suggestions?.map((suggestion, index)=>{
                  return <div className="suggestion" key={index}>
                          <SiTicktick className='suggestion-icon' />
                          <p className='suggestion-text'>{suggestion}</p>
                        </div>
                })
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Submissions