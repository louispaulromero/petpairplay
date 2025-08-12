import './SimulationFinished.css';
import petPairLogo from '../../assets/images/header/petpairplaylogo.svg'
import { Link } from 'react-router-dom';

const SimulationFinished = ({ isVisible, onClose, rabbitName }) => {
  if (!isVisible) return null;

  return (
    <div className="simulation-finished-overlay">
      <div className="simulation-finished-modal">
        <div className="finished-header">
          <img src={petPairLogo} alt="" />
          <h2> Pet Pair Play</h2>
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
              <span>Fed to satisfaction</span>
            </div>
            <div className="achievement-item">
              <span className="achievement-icon">😊</span>
              <span>Maximum happiness reached</span>
            </div>
            <div className="achievement-item">
              <span className="achievement-icon">🚽</span>
              <span>All bathroom needs met</span>
            </div>
          </div>
        </div>
        
        <div className="finished-actions">
          <button className="continue-btn" onClick={onClose}>
            Continue Playing
          </button>
          <Link to='/display/simulation/:id'>
          <button className="restart-btn" >
            Start Over
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimulationFinished; 