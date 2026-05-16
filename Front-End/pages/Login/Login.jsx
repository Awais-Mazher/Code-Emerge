import React, { useCallback, useContext, useState } from "react";
import Particles from "react-tsparticles";
import { loadBasic } from "tsparticles-basic";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { WebContext } from "../../context/WebContext.jsx";
import "./Login.css";

const Login = () => {

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const {url, setToken} = useContext(WebContext);
  const navigate = useNavigate();

  // Input Change Handler

  const onChangeHandler = (e)=> {
    const name = e.target.name;
    const value = e.target.value;
    setData(prevData=>({...prevData, [name]:value}));
  }

  // Form Submission Handler

  const onSubmitHandler = async (e)=> {
    e.preventDefault();
    let newUrl = url;

    if(currState === "Login"){
      newUrl += "/api/user/login";
    }
    else{
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        if(response.data.userRole === "user"){
          navigate("/user/dashboard");
        }
        else{
          navigate("/admin/dashboard");
        }
      }
      else{
        toast.error(response.data.message);
      }
    } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
    }
  }

  // Background Particles

  const particlesInit = useCallback(async (engine) => {
    await loadBasic(engine);
  }, []);

  return (
    <div className="login-page flex">

      {/* Particles */}
      <Particles
        id="particles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: "transparent" },
          particles: {
            number: {
              value: 50,
              density: { enable: true, area: 800 },
            },
            color: { value: "#ff7a27" },
            move: {
              enable: true,
              speed: 1,
            },
            size: { value: 2 },
            opacity: { value: 0.4 },
          },
        }}
      />

      {/* Login Card */}
      
      <motion.div className="login-card"
          initial={{
            opacity: 0,
            y: -80,
            rotateX: 25,
            scale: 0.85
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1
          }}
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1]
          }}
      >
        <h2 className="login-title">
          {
            currState === "Sign Up"
            ? "Welcome Coder!"
            : "Welcome Back!"
          }
        </h2>
        <p className="login-subtitle">
          {
            currState === "Sign Up" 
            ? "Start your coding journey today."
            : "Continue where you left off."
          }
        </p>

        <form className="login-form" onSubmit={onSubmitHandler}>
          {
            currState === "Sign Up" 
            ? <div className="input-group">
                <label>Username</label>
                <input type="text" placeholder="Enter your username" name="username" value={data.username} onChange={onChangeHandler} required />
               </div>
            : <></>
          }

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" name="email" value={data.email} onChange={onChangeHandler} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" name="password" value={data.password} onChange={onChangeHandler} required />
          </div>
          <button className="login-btn">
            {
              currState === "Sign Up"
              ? "Register"
              : "Login"
            }
          </button>
        </form>

        <div className="signup-text">
            {
                currState === "Login" ? 
                <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p> :
                <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
            }
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
