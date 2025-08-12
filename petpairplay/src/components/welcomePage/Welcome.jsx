import React from "react";
import './Welcome.css'
import welcomeDogImg from '../../assets/images/WelcomePage/welclomeDog.png'
import { Link } from "react-router-dom";
const Welcome = ()=>{
    return (
        <div className="welcome-container">

            <img className='welcome-image' src={welcomeDogImg} alt="" />

            <div className="welcome-header">Welcome to Pet Pair Play.</div>
            
            <Link to={'/display'}>
                <div className="circle-arrow"></div>
            </Link>
            

        </div>
    )
}

export default Welcome