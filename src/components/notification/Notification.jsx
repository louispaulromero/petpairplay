import './Notification.css'
import LeftArrow from '../LeftArrow.jsx'
const Notification = () => {
    return (
        <div className="notification-container">
            <LeftArrow/>
            <div>

                <div className="card-header">
                    <div className=""><p>No notification</p></div>
                    {/* <div className="rabbit-distance"><p>{cardData?.distance}mi</p></div> */}
                </div>
                {/* <div className="card-body">
                    <div><p>xoxo</p>  </div>
                    <div><p>miaomiao</p></div>
                </div> */}
            </div>

        </div>
    )
}

export default Notification;