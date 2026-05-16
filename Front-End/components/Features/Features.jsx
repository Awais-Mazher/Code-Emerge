import React from 'react'
import "./Features.css"

const Features = ({motion}) => {

  return (
    <div className='features-section' id='features-section'>
        <div className="feature-col">
            <motion.div className="feature"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                viewport={{ once: false, amount: 0.2 }}
            >
                <div className="number-circle">1</div>
                <h3>Real-Time Code Execution</h3>
                <p>Run your code instantly across multiple languages with accurate test results.</p>
            </motion.div>
            <motion.div className="feature"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
                viewport={{ once: false, amount: 0.2 }}
            >
                <div className="number-circle">2</div>
                <h3>AI Skill Assistance</h3>
                <p>Get personalized insights and suggestions to improve your coding.</p>
            </motion.div>
        </div>
        <div className="feature-col">
            <motion.div className="feature"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                viewport={{ once: false, amount: 0.2 }}
            >
                <div className="number-circle">3</div>
                <h3>Curated Challenges</h3>
                <p>Solve structured problems from easy to hard with smart filtering options.</p>
            </motion.div>
            <motion.div className="feature"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
                viewport={{ once: false, amount: 0.2 }}
            >
                <div className="number-circle">4</div>
                <h3>Gamified Progress</h3>
                <p>Earn points, compete globally, and climb the leaderboard.</p>
            </motion.div>
        </div>
    </div>
  )
}

export default Features