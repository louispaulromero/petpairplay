import LeftArrowIcon from '../assets/images/arrow-left.svg'
import './LeftArrow.css'
import { Link } from 'react-router-dom'
const LeftArrow = ()=>{
    return (
        <div>
            <Link to="/display" className="backToDisplay">
            <img src={LeftArrowIcon} alt="" className="go-back-arrow"/>
            </Link>
            
        </div>
    )
}
export default LeftArrow
