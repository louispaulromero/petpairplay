import React from "react";
import './Welcome.css'
import welcomeDogImg from '../../assets/images/WelcomePage/welclomeDog.png'
import { Link } from "react-router-dom";
import LOGO from '../../assets/images/PetSimulationImage/petpairplaylogo.svg'
import rightArrow from '../../assets/images/arrow-right.svg'

const Welcome = ()=>{
    return (
        <div className="welcome-container">

            <img src={LOGO} alt="" className="pet-pair-logo"/>
            <img className='welcome-image' src={welcomeDogImg} alt="" />

            <div className="welcome-header"><p>Welcome to Pet Pair Play.</p></div>
            
            <Link to={'/display'}>
                <div className="circle-arrow">
                    <img src={rightArrow} alt=""  className="right-arrow-welcome"/>
                </div>
            </Link>

            

        </div>
    )
}

export default Welcome