import React, { useContext, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import { useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { WebContext } from '../context/WebContext';
import ScrollToTop from "../components/ScrollToTop/ScrollToTop"

import Home from "../pages/Home/Home"
import About from "../pages/About/About"
import Login from "../pages/Login/Login";
import Problems from "../pages/Problems/Problems"
import Leaderboard from '../pages/Leaderboard/Leaderboard'
import ProblemSingle from "../pages/ProblemSingle/ProblemSingle"
import UserDashboard from "../pages/UserDashboard/UserDashboard"
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard'
import AddProblem from "../components/AddProblem/AddProblem"
import ProblemList from "../components/ProblemList/ProblemList"
import AdminHome from "../components/AdminHome/AdminHome"
import UpdateProblem from '../components/UpdateProblem/UpdateProblem'
import ProblemDetails from "../components/ProblemDetails/ProblemDetails"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import UserList from '../components/UserList/UserList';
import UpdateUser from '../components/UpdateUser/UpdateUser';
import UserDetails from '../components/UserDetails/UserDetails';
import Submissions from '../pages/Submissions/Submissions';

const App = () => {

  const [showOverlay, setShowOverlay] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showAiResults, setShowAiResults] = useState(false);

  const location = useLocation();
  const isProblemPage = location.pathname.startsWith("/problems/");

  const { userData } = useContext(WebContext);
  const isAdmin = userData?.role === "admin";

  const hideLayout = isAdmin || isProblemPage;

  return (
    <div>
      <ToastContainer />
      <ScrollToTop />
      {!hideLayout && <Header setShowOverlay={setShowOverlay} showMenu={showMenu} setShowMenu={setShowMenu} />}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/problems' element={<Problems />}/>
        <Route path='/leaderboard' element={<Leaderboard />}/>
        <Route path="/problems/:problem-title" element={<ProblemSingle />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/user/dashboard' element={<UserDashboard />}/>
        <Route path='/user/dashboard/submissions' element={<Submissions setShowOverlay={setShowOverlay} showPopup={showPopup} setShowPopup={setShowPopup} showAiResults={showAiResults} setShowAiResults={setShowAiResults} />}/>
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="add-problem" element={<AddProblem />} />
          <Route path="problems" element={<ProblemList />} />
          <Route path="update-problem" element={<UpdateProblem />} />
          <Route path="users" element={<UserList />} />
          <Route path="update-user" element={<UpdateUser />} />
          <Route path="user-details/:userId" element={<UserDetails />} />
          <Route path="problem-details/:problemId" element={<ProblemDetails />} />
        </Route>
      </Routes>
      {!hideLayout && <Footer />}

      {/* Mobile Menu Overlay */}
      {showOverlay && (<div className='overlay' onClick={()=>{
        setShowOverlay(false);
        setShowMenu(false);
        setShowPopup(false);
        setShowAiResults(false);
      }}></div>)}
    </div>
  )
}

export default App