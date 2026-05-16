import React from 'react'
import "./Home.css"
import { motion } from "framer-motion"

// Components

import Hero from "../../components/Hero/Hero"
import Features from '../../components/Features/Features'
import Problems from '../../components/Problems/Problems'
import WorkGuide from '../../components/WorkGuide/WorkGuide'
import Leaderboard from '../../components/Leaderboard/Leaderboard'

const Home = () => {
  return (
    <div className='home-page'>
        <div className="gradient-container">
          <Hero motion={motion} />
        </div>
        <Features motion={motion} />
        <div className="gradient-container">
          <Problems motion={motion} />
        </div>
        <WorkGuide motion={motion} />
        <div className="gradient-container">
          <Leaderboard motion={motion} />
        </div>
    </div>
  )
}

export default Home