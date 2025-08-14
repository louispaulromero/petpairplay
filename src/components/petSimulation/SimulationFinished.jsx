import './SimulationFinished.css';
import petPairLogo from '../../assets/images/header/petpairplaylogo.svg'
import { Link } from 'react-router-dom';

const SimulationFinished = ({ isVisible, onClose, rabbitName, rabbitId }) => {
  if (!isVisible) return null;

  return (
    <div className="simulation-finished-overlay">
      <div className="simulation-finished-modal">
        <div className="finished-header">
          <img src={petPairLogo} alt="" />
          <h2><p> Pet Pair Play</p></h2>
        </div>
        
        <div className="finished-content">
          {/* <div className="celebration-icon">
            <div className="hearts-celebration">
              <span className="heart">❤️</span>
              <span className="heart">❤️</span>
              <span className="heart">❤️</span>
            </div>
          </div> */}
          
          <div className="finished-message">
            <p className="main-message">
              Congratulations! You&apos;ve successfully taken care of <strong>{rabbitName}</strong>!
            </p>
            <p className="sub-message">
              All needs have been fulfilled - your rabbit is happy, well-fed, and comfortable!
            </p>
          </div>
          
          <div className="achievements">
            <div className="achievement-item">
              <span className="achievement-icon">🍽️</span>
              <span><p>Fed to satisfaction</p></span>
            </div>
            <div className="achievement-item">
              <span className="achievement-icon">😊</span>
              <span><p>Maximum happiness reached</p></span>
            </div>
            <div className="achievement-item">
              <span className="achievement-icon">🚽</span>
              <span><p>All bathroom needs met</p></span>
            </div>
          </div>
        </div>
        
        <div className="finished-actions">
          {/* <button className="continue-btn" onClick={onClose}>
            Continue Playing
          </button> */}
          <Link to={'/display'} key={rabbitId}>
          <button className="restart-btn" >
            <p>Next</p>
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimulationFinished; 