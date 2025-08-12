import React from "react";
import './Header.css'
import petpairplaylogo from '../../assets/images/header/petpairplaylogo.svg';
import educationCenter from '../../assets/images/header/education-center.svg';
import notification from '../../assets/images/header/Notification.svg';
import profile from '../../assets/images/header/Profile.svg';
import { Link } from "react-router-dom";
const Header = ()=>{
    return(
        
        <div className="app-header">
            <Link to={'/display'} key='backHome' className="logo-link">
                <div className="logo">
                    <img src={petpairplaylogo} alt="PetPairPlay Logo" className="logo-icon" />
                    <span className="logo-text">Pet Pair Play</span>
                </div>
            </Link>
            

            <div className="header-icons">
                <button className="icon-btn">
                    <img src={educationCenter} alt="" />
                </button>

                <button className="icon-btn">
                    <img src={notification} alt="" />
                </button>

                <button className="icon-btn">
                    <img src={profile} alt="" />
                </button>

            </div>
        </div>
    )
}

export default Header;