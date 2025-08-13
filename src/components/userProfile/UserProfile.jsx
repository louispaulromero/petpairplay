import './UserProfile.css'
import userImage from '../../assets/images/users/cutesansei.jpeg'
import LeftArrow from '../LeftArrow.jsx'
const UserProfile = () => {
    return (
        
        <div className="user-profile-container">
            <LeftArrow/>
            <div>
                <img src={userImage} alt="rabbit photo" className="user-image"/>
                <div className="card-header">
                    <div className="card-rabbit-name"><p>sansei mo</p></div>
                    {/* <div className="rabbit-distance"><p>{cardData?.distance}mi</p></div> */}
                </div>
                <div className="card-body">
                    <div><p>xoxo</p>  </div>
                    <div><p>miaomiao</p></div>
                </div>
            </div>

        </div>
        
    )
}

export default UserProfile;