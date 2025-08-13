import React, { useEffect, useState } from "react";
import './RabbitCard.css'
import rabbitData from '../../rabbits.json'
const RabbitCard = ({rabbit}) =>{
    const [cardData, setCardData] = useState(null)

    useEffect(()=>{
        setCardData(rabbit.card_page)
    },[])
    // console.log(cardData)
    return (
        <div className="rabbit-card-container">
           <img src={cardData?.image} alt="rabbit photo" className="card-image"/>
            <div className="card-header">
                <div className="card-rabbit-name"><p>{cardData?.name}</p></div>
                {/* <div className="rabbit-distance"><p>{cardData?.distance}mi</p></div> */}
            </div>
            <div className="card-body">
                <div><p>{cardData?.sex}</p>  </div>
                <div><p>{cardData?.breed}</p></div>
                <div><p>{cardData?.age} yrs</p></div>
                <div><p>${cardData?.adoption_fee} adoption fee</p></div>
            </div>
        </div>
    )
}

export default RabbitCard