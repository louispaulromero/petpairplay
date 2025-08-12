/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import './PetSimulation.css';
// import LeftArrow from "../LeftArrow.jsx";
import RabbitData from '../../rabbits.json';
import { useParams } from "react-router-dom";
import HeartIcon from '../../assets/images/heart.svg';
import FilledHeartIcon from '../../assets/images/heart-fill.png';
// import Clock from "../Clock.jsx";

import grassImage from '../../assets/images/PetSimulationImage/grass.png';
import bananaImage from '../../assets/images/PetSimulationImage/banana.png';
import carrotImage from '../../assets/images/PetSimulationImage/carrot.png';
import grass2Image from '../../assets/images/PetSimulationImage/grass2.png';
import pelletsImage from '../../assets/images/PetSimulationImage/pellets.png';
import toyImage from '../../assets/images/PetSimulationImage/toy.png';
import rabbitImage from '../../assets/images/PetSimulationImage/rabbit.png';
import rabbitEatingImage from '../../assets/images/PetSimulationImage/rabbit-eating.png';
import happyRabbitImage from '../../assets/images/PetSimulationImage/happy.png';
import toiletImage from '../../assets/images/PetSimulationImage/toilet.png';
import toiletRabbitImage from '../../assets/images/PetSimulationImage/rabbit-using-toilet.png';

import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const getItemImage = (type) => {
    switch (type) {
      case 'grass':
        return grassImage;
      case 'banana':
        return bananaImage;
      case 'carrot':
        return carrotImage;
      case 'grass2':
        return grass2Image;
      case 'pellets':
        return pelletsImage;
      case 'toy':
        return toyImage;
      case 'toilet':
        return toiletImage;
      default:
        return grassImage;
    }
  };

  // 可拖拽的物品组件
const DraggableItem = ({ id, type }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
  
    return (
      <div 
        className="item" 
        ref={setNodeRef} 
        style={style} 
        {...attributes} 
        {...listeners}
      >
        <img src={getItemImage(type)} alt={type} className="item-image" />
      </div>
    );
  };

  const Rabbit = ({ isEating, showHappy, feedingItem, isUsingToilet }) => {
    const { setNodeRef, isOver } = useDroppable({
      id: 'rabbit-image',
    });
  
    return (
      <div className="rabbit-container">
        <img 
          ref={setNodeRef}
          src={isUsingToilet ? toiletRabbitImage : (isEating ? rabbitEatingImage : rabbitImage)} 
          alt="rabbit" 
          className={`rabbit-image ${isOver ? 'over' : ''}`}
        />
        
        {showHappy && !isUsingToilet && <img src={happyRabbitImage} alt="happy-rabbit" className="happy-rabbit-image" />}
        
        {feedingItem && !isUsingToilet && (
          <div className="feeding-item">
            <img src={getItemImage(feedingItem.type)} alt={feedingItem.type} className="feeding-item-image" />
          </div>
        )}
      </div>
    );
  };
  
  // 兔子区域
  const RabbitArea = ({ children, isEating, showHappy, feedingItem, isUsingToilet }) => {
    return (
      <div className="rabbit-area">
        <Rabbit isEating={isEating} showHappy={showHappy} feedingItem={feedingItem} isUsingToilet={isUsingToilet} />
        {children}
      </div>
    );
  };
  
  const PetSimulation = ({ items, fedItems = [], feedingItem, isEating, showHappy, isUsingToilet = false, hapinessNumber = 0, hungerNumber = 0, toiletNumber = 0 }) => {
    const { id } = useParams();
    const [rabbit, setRabbit] = useState(null);

    // 百分比保护：将 undefined/null 非数字值转换为 0，并限制在 0-100
    const clampPercent = (value) => {
      const n = Number.isFinite(value) ? value : 0;
      if (n < 0) return 0;
      if (n > 100) return 100;
      return n;
    };

    const hapinessPercent = clampPercent(hapinessNumber);
    const hungerPercent = clampPercent(hungerNumber);
    const toiletPercent = clampPercent(toiletNumber);
    
    // 计算获得的heart数量
    const earnedHearts = (hapinessPercent === 100 ? 1 : 0) + (hungerPercent === 0 ? 1 : 0) + (toiletPercent === 0 ? 1 : 0);
    
    // 渲染heart icons
    const renderHeartIcons = () => {
      const hearts = [];
      for (let i = 0; i < 3; i++) {
        if (i < earnedHearts) {
          hearts.push(<img key={i} src={FilledHeartIcon} alt="filled heart" />);
        } else {
          hearts.push(<img key={i} src={HeartIcon} alt="heart" />);
        }
      }
      return hearts;
    };
  
    useEffect(() => {
        const foundRabbit = RabbitData.rabbits.find((r) => r.details_page.id === id);
        if (foundRabbit) {
          setRabbit(foundRabbit.details_page);
        }
      }, [id]);

      
      return (
        <div className="pet-simulation-page">
          <div className="pet-simulation">
            {/* 左边物品栏 */}
            <div className="items-area">
              {items.map((item) => (
                <DraggableItem key={item.id} id={item.id} type={item.type} />
              ))}
            </div>
      
            {/* 右边兔子区域 */}
            <div className="right-area">
              {/* 兔子学习进度 */}
              <div className="rabbit-learning-progress">
                <div className="simulation-rabbit-name">
                  <p>{rabbit?.name}</p>
                </div>
                <div>
                  <div className="heart-icons">{renderHeartIcons()}</div>
                  <div className="heart-description">
                    <p>Earn 3 hearts to graduate</p>
                  </div>
                </div>
              </div>
      
              {/* 兔子展示区 */}
              <RabbitArea
                isEating={isEating}
                showHappy={showHappy}
                feedingItem={feedingItem}
                isUsingToilet={isUsingToilet}
              >
                {fedItems.map((item) => (
                  <div key={item.id} className="fed-item">
                    <img
                      src={getItemImage(item.type)}
                      alt={item.type}
                      className="item-image"
                    />
                  </div>
                ))}
              </RabbitArea>
            </div>
          </div>
      
          {/* 底部进度条 */}
          <div className="learning-progress-bar-area">
            <div className="progress-row">
              <span className="progress-label"><p>Happiness</p></span>
              <div className="progress-track">
                <div
                  className="progress-fill happiness"
                  style={{ width: `${hapinessPercent}%` }}
                />
              </div>
            </div>
            <div className="progress-row">
              <span className="progress-label"><p>Hunger</p></span>
              <div className="progress-track">
                <div
                  className="progress-fill hunger"
                  style={{ width: `${hungerPercent}%` }}
                />
              </div>
            </div>
            <div className="progress-row">
              <span className="progress-label"><p>Toilet</p></span>
              <div className="progress-track">
                <div
                  className="progress-fill toilet"
                  style={{ width: `${toiletPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      );
      
  };
  
  export default PetSimulation; 