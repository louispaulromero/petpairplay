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
                <Link to={'/display/article'}>
                <button className="icon-btn">
                    <img src={educationCenter} alt="" />
                </button>
                </Link>

                <Link to={'/display/notification'}>
                    <button className="icon-btn">
                        <img src={notification} alt="" />
                    </button>
                </Link>

                <Link to={'/display/user-profile'}>
                <button className="icon-btn">
                    <img src={profile} alt="" />
                </button>
                </Link>

            </div>
        </div>
    )
}

export default Header;