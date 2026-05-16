import React, { useContext, useEffect, useState } from "react";
import "./UserDetails.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { WebContext } from "../../context/WebContext";

const UserDetails = () => {
    const {userId} = useParams();
    const {url} = useContext(WebContext);
    const [data, setData] = useState({
      username: "",
      email: "",
      rankPoints: 0,
      role: ""
    });

    const fetchUser = async (id)=>{
      try {
        const response = await axios.post(url+"/api/user/getDataById", {userId: id});
        const user = response.data.user;
  
        if(response.data.success){
          setData({
            username: user.username,
            email: user.email,
            rankPoints: user.rankPoints,
            role: user.role
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
      fetchUser(userId);
    }, [])

    return (
      <div className='update-user'>
        <h1>User Details</h1>

        <form>
          <div className="user-row">
              <div className="user-box">
                  <label htmlFor="username">Username</label>
                  <input 
                      type="text"  
                      className="user-input" 
                      name="username"
                      placeholder="Enter the Username"
                      value={data.username} 
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
                      required 
                  />
              </div>

              <div className="user-box">
                  <label htmlFor="role">User Role</label>
                  <select className="user-input" name="role" value={data.role} required>
                      <option value="">Select Role</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                  </select>
              </div>
          </div>
        </form>
      </div>
    );
}

export default UserDetails;