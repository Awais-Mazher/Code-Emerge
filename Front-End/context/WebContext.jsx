import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const WebContext = createContext(null);

const WebContextProvider = (props)=>{

    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [userData, setUserData] = useState({});

    const fetchUserData = async (token)=> {
        try {
            if(token){
                const response = await axios.get(url+"/api/user/getData", {headers: {token}});
                setUserData(response.data.userData);
            }
            else{
                setUserData({});
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
      }
    }, []);

    useEffect(()=> {
        fetchUserData(token);
    }, [token])
    
    const contextValue = {
        url,
        token,
        userData,
        setToken,
        setUserData
    }
    
    return (
        <WebContext.Provider value={contextValue}>
            {props.children}
        </WebContext.Provider>
    )
}

export default WebContextProvider