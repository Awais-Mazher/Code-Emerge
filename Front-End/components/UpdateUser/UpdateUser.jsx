import React, { useContext, useState } from "react";
import "./UpdateUser.css";
import { WebContext } from "../../context/WebContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateUser = () => {

    const {url, token} = useContext(WebContext);
    const location = useLocation();
    const user = location?.state.user;
  
    const [data, setData] = useState({
      username: user.username,
      email: user.email,
      rankPoints: user.rankPoints,
      role: user.role
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
      
      const response = await axios.post(url+"/api/user/updateUser", data, {headers: {token, id: user._id}});
  
      if(response.data.success){
        toast.success(response.data.message);
      }
      else{
        toast.error(response.data.message);
      }
    }

  return (
    <div className='update-user'>
        <h1>Update User</h1>

        <form onSubmit={onSubmitHandler}>
            <div className="user-row">
                <div className="user-box">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text"  
                        className="user-input" 
                        name="username"
                        placeholder="Enter the Username"
                        value={data.username} 
                        onChange={onChangeHandler} 
                        required 
                    />
                </div>

                <div className="user-box">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"  
                        className="user-input" 
                        name="email"
                        placeholder="Enter the Email"
                        value={data.email} 
                        onChange={onChangeHandler} 
                        required 
                    />
                </div>
            </div>

            <div className="user-row">
                <div className="user-box">
                    <label htmlFor="rankPoints">Rank Points</label>
                    <input 
                        type="number"
                        className="user-input" 
                        name="rankPoints"
                        placeholder="Enter the Rank Points"
                        value={data.rankPoints} 
                        onChange={onChangeHandler} 
                        required 
                    />
                </div>

                <div className="user-box">
                    <label htmlFor="role">User Role</label>
                    <select className="user-input" name="role" value={data.role} onChange={onChangeHandler} required>
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>

            <button className="update-user-btn">Update User</button>
        </form>
    </div>
  )
}

export default UpdateUser