import React, { useContext, useEffect, useState } from 'react';
import "./UserList.css";
import { WebContext } from "../../context/WebContext";
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const ProblemList = () => {
  const { url, token } = useContext(WebContext);
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);

  const navigate = useNavigate();

  const fetchUsersData = async ()=>{
    const response = await axios.get(url+"/api/user/getUsersData", {headers: {token}});
    
    if(response.data.success){
      setUsersData(response.data.users);
    }
    else{
      toast.error(response.data.message);
    }
    setLoading(false);
  }

  const deleteUser = async (userId)=>{
    const response = await axios.post(url+"/api/user/deleteUser", {userId}, {headers: {token}});

    if(response.data.success){
      toast.success(response.data.message);
    }
    else{
      toast.error(response.data.message);
    }
  }

  const updateUser = async (id)=>{
    try {
      const response = await axios.post(url+"/api/user/getDataById", {userId: id});

      console.log(response);

      if(response.data.success){
        navigate("/admin/dashboard/update-user", {state: {user: response.data.user}});
      }
      else{
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    if(token){
      fetchUsersData();
    }
  }, [token])
  
  return (
    <div className='user-list'>
      <h1 className='list-title'>All Users</h1>

      <div className="user-list-container">
        <div className="list-row">
          <h3>Sr #</h3>
          <h3>Username</h3>
          <h3>Email</h3>
          <h3>Rank Points</h3>
          <h3>Problems Solved</h3>
          <h3>Action</h3>
        </div>
        {
          loading ?
            <p>Loading Users</p>
          : usersData?.length === 0 ?
            <p>No Users Found</p>
          :
          usersData?.map((user, index)=>{
              return (<div className="list-row" key={user._id}>
                <p>{index+1}</p>
                <p><NavLink to={`/admin/dashboard/user-details/${user._id}`} className='user-title'>{user.username}</NavLink></p>
                <p>{user.email}</p>
                <p>{user.rankPoints}</p>
                <p>{user.problemsSolved.length}</p>
                <div className="action-buttons">
                  <button className='delete-btn flex' onClick={()=>{deleteUser(user._id)}}><MdDelete /></button>
                  <button className='edit-btn flex' onClick={()=>{updateUser(user._id)}}><AiFillEdit /></button>
                </div>
              </div>)
          })
        }
      </div>
    </div>
  )
}

export default ProblemList