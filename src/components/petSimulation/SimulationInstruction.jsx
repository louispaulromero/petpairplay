import './SimulationInstruction.css';
import {useParams} from 'react-router-dom';
import rabbitImage from '../../assets/images/PetSimulationImage/rabbit.png';
import { Link } from 'react-router-dom';
import LeftArrow from '../LeftArrow.jsx';
// 
// 
// 
const SimulationInstruction = () => {
    const {id,name} = useParams();
    // const id = 'rabbit1';
    // const name = 'Ball';
  return (
    <div className='instrruction-page'>
        <div className='simulation-instruction-container'>
                
                    <LeftArrow/>
                
                <div className='simulation-instruction-header'>
                    <p className='header-text-1'>Learn how to take care of</p>
                    
                    <div className='rabbit-name-logo-contianer'>
                        <p className='header-rabbit-name'>{name}</p>
                        <img src={rabbitImage} alt={name} />
                    </div>

                </div>
                <div className='simulation-instruction-content'>
                    <p>With a customized and interactive learning journey</p>
                </div>

            </div>
            <Link to={`/display/simulation/${id}`} key={'ToSimulation'}>
                    <button className='simulation-instruction-button'><p>Start</p></button>
            </Link>
    </div>
    
  );
};

export default SimulationInstruction;