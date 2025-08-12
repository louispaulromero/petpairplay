import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Transition.css';
import rabbitImage from '../../assets/images/PetSimulationImage/rabbit.png';

const Transition = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(old => {
        if (old >= 100) {
          clearInterval(interval);
          // 当进度达到100%时，调用完成回调
          if (onComplete) {
            setTimeout(() => onComplete(), 500); // 稍微延迟一下，让用户看到100%
          }
          return 100;
        }
        return old + 4;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="transition-container" style={{ '--progress': progress }}>

      <div className="outer-progress-circle"></div>

      <div className="rabbit-logo-container">
        <img src={rabbitImage} alt="rabbit" />
      </div>

        <div className='transition-text-container'>
            <p>Generating</p> 
            <p>simulation...</p> 
                 
        </div>

    </div>
  );
};

Transition.propTypes = {
  onComplete: PropTypes.func
};

export default Transition;
