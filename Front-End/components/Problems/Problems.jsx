import React, { useContext, useEffect, useState } from 'react'
import "./Problems.css"
import { WebContext } from "../../context/WebContext"
import axios from 'axios';
import { toast } from "react-toastify";
import { Link } from "react-router-dom"

import { MdDataArray } from "react-icons/md";
import { IoLayersOutline } from "react-icons/io5";
import { IoGitNetwork } from "react-icons/io5";
import { MdOutlineElectricBolt } from "react-icons/md";
import { LuHash } from "react-icons/lu";
import { IoTextOutline } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";

const Problems = ({motion}) => {

    const {url} = useContext(WebContext);
    const [categories, setCategories] = useState([]);
    const [categoryIcons, setCategoryIcons] = useState([
        {
            category: "Array",
            icon: <MdDataArray className='icon' />
        },
        {
            category: "Dynamic Programming",
            icon: <IoLayersOutline className='icon' />
        },
        {
            category: "Graph",
            icon: <IoGitNetwork className='icon' />
        },
        {
            category: "Greedy",
            icon: <MdOutlineElectricBolt className='icon' />
        },
        {
            category: "Hashing",
            icon: <LuHash className='icon' />
        },
        {
            category: "String",
            icon: <IoTextOutline className='icon' />
        }
    ])

    const fetchCategories = async ()=>{
        const response = await axios.get(url+"/api/problem/categories");
        
        if(response.data.success){
            setCategories(response.data.data);
        }
        else{
            toast.error(response.data.message);
        }
    }

    useEffect(() => {
      fetchCategories();
    }, [])
    
    const containerVariants = {
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
          }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 25 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeIn" }
        }
    };

  return (
    <div className='problems-section'>
        <h1 className="section-title">Explore Problems</h1>
        <motion.div className="problems-container"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
        >
            {
                categories?.map((category, index)=>{
                    return <motion.div className="motion-wrapper" variants={cardVariants}>
                        <div className={index+1 < 4? "problem problem-upper" : "problem problem-bottom"}>
                            { category.category === categoryIcons[index].category ? categoryIcons[index].icon : <FaCode className='icon' />}
                            <Link to="/problems"><h3>{category.category}</h3></Link>
                            <p>{category.count === 1 ? `${category.count} Problem` : `${category.count} Problems`}</p>
                        </div>
                    </motion.div>
                })
            }
        </motion.div>
    </div>
  )
}

export default Problems