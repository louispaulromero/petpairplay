import React from "react";

const Header = () => (

   <div className="header-container">
      <header className="app-header">
        <div className="logo">
          <img src="/assets/petpairplaylogo.svg" alt="PetPairPlay Logo" className="logo-icon" />
          <span className="logo-text">Pet Pair Play</span>
        </div>
        <div className="header-icons">
          <button className="icon-btn" aria-label="Learn">
            <img src="/assets/education-center.svg" alt="Graduation cap icon for Education Center" />
          </button>
          <button className="icon-btn" aria-label="Notifications">
            <img src="/assets/Notification.svg" alt="Bell icon for Notifications" />
          </button>
          <button className="icon-btn" aria-label="Profile">
            <img src="/assets/profile.svg" alt="User profile icon" />
          </button>
        </div>
      </header>

      <header className="button-header">
        <h1></h1>
        <button className="btn btn-secondary hidden" id="home-button">Back</button>
      </header>
    </div>


);

export default Header;