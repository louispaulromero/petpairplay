import PetSimulation from "../components/petSimulation/PetSimulation.jsx";
import SimulationFinished from "../components/petSimulation/SimulationFinished.jsx";
import Transition from "../components/petSimulation/Transition.jsx";
import { useState, useEffect } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useParams } from 'react-router-dom';
import RabbitData from '../rabbits.json';

const PetSimulationRoute = () => {
  const { id } = useParams();
  const [items, setItems] = useState([
    { id: 'veggies-1', type: 'veggies' },
    { id: 'banana-1', type: 'banana' },
    { id: 'carrot-1', type: 'carrot' },
    { id: 'hay-1', type: 'hay' },
    { id: 'pellets-1', type: 'pellets' },
    { id: 'toy-1', type: 'toy' },
    { id: 'toilet-1', type: 'toilet' },
  ]);

  const [fedItems] = useState([]);
  const [feedingItem, setFeedingItem] = useState(null);
  const [isEating, setIsEating] = useState(false);
  const [showHappy, setShowHappy] = useState(false);
  const [isUsingToilet, setIsUsingToilet] = useState(false);
  
  // 添加loading状态
  const [isLoading, setIsLoading] = useState(true);
  
  // 添加弹窗状态和兔子信息
  const [showFinishedModal, setShowFinishedModal] = useState(false);
  const [currentRabbit, setCurrentRabbit] = useState(null);
  
  // 添加hunger和happiness状态
  const [hunger, setHunger] = useState(50);
  const [happiness, setHappiness] = useState(50);
  const [toilet, setToilet] = useState(50);

  // 从rabbits.json读取初始值
  useEffect(() => {
    const foundRabbit = RabbitData.rabbits.find((r) => r.details_page.id === id);
    if (foundRabbit) {
      setHunger(foundRabbit.simulation_page.hunger);
      setHappiness(foundRabbit.simulation_page.hapiness);
      setToilet(foundRabbit.simulation_page.toilet);
      setCurrentRabbit(foundRabbit.details_page);
    }
  }, [id]);

  // 检测是否达到3个filled hearts
  useEffect(() => {
    const clampPercent = (value) => {
      const n = Number.isFinite(value) ? value : 0;
      if (n < 0) return 0;
      if (n > 100) return 100;
      return n;
    };

    const hapinessPercent = clampPercent(happiness);
    const hungerPercent = clampPercent(hunger);
    const toiletPercent = clampPercent(toilet);
    
    const earnedHearts = (hapinessPercent === 100 ? 1 : 0) + (hungerPercent === 0 ? 1 : 0) + (toiletPercent === 0 ? 1 : 0);
    
    if (earnedHearts === 3 && !showFinishedModal) {
      setShowFinishedModal(true);
    }
  }, [happiness, hunger, toilet, showFinishedModal]);

  // 处理Transition完成
  const handleTransitionComplete = () => {
    setIsLoading(false);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    // 如果拖拽到兔子图片
    if (over.id === 'rabbit-image') {
      const item = items.find(item => item.id === active.id);
      if (item) {
        
        if (item.type === 'toilet') {
          
          // 立即从物品区域移除
          setItems(currentItems => {
            const filteredItems = currentItems.filter(i => i.id !== item.id);
            return filteredItems;
          });
          
          // 设置使用厕所状态
          setIsUsingToilet(true);
          setFeedingItem(null);
          setIsEating(false);
          setShowHappy(false);
          
          
          // 更新toilet值和happiness值
          const foundRabbit = RabbitData.rabbits.find((r) => r.details_page.id === id);
          if (foundRabbit && foundRabbit.simulation_page.toiletPreference) {
            const toiletEffects = foundRabbit.simulation_page.toiletPreference.toilet;
            if (toiletEffects) {
              // 更新toilet值
              if (toiletEffects.toilet) {
                setToilet(prev => {
                  const newToilet = prev + toiletEffects.toilet;
                  return Math.max(0, Math.min(100, newToilet));
                });
              }
              
              // 更新happiness值
              if (toiletEffects.hapiness) {
                setHappiness(prev => {
                  const newHappiness = prev + toiletEffects.hapiness;
                  return Math.max(0, Math.min(100, newHappiness));
                });
              }
            }
          }
          
          // 2秒后恢复
          setTimeout(() => {
            // 重置状态
            setIsUsingToilet(false);
            
            // 将toilet添加回items
            setItems(currentItems => {
              const newItems = [...currentItems, item];
              return newItems;
            });
          }, 2000);
          
        } else {
          // 喂食的逻辑
          
          // 从物品区域移除
          setItems(prev => prev.filter(item => item.id !== active.id));
          
          setFeedingItem(item);
          setIsEating(true);
          setShowHappy(true);
          
          // 更新hunger和happiness值
          const foundRabbit = RabbitData.rabbits.find((r) => r.details_page.id === id);
          if (foundRabbit) {
            const foodEffects = foundRabbit.simulation_page.foodPreference[item.type];
            if (foodEffects) {
              // 更新hunger（注意：hunger值应该是减少的，所以用加号）
              setHunger(prev => {
                const newHunger = prev + foodEffects.hunger;
                return Math.max(0, Math.min(100, newHunger));
              });
              
              // 更新happiness
              setHappiness(prev => {
                const newHappiness = prev + foodEffects.hapiness;
                return Math.max(0, Math.min(100, newHappiness));
              });
            }
          }
          
          // 2.5秒后恢复
          setTimeout(() => {
            setFeedingItem(null);
            setIsEating(false);
            setShowHappy(false);
            
            // 物品回到原位置
            setItems(prevItems => [...prevItems, item]);
          }, 2500);
        }
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        // 显示Transition加载页面
        <Transition onComplete={handleTransitionComplete} />
      ) : (
        // 显示PetSimulation游戏页面
        <>
          <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
            <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
              <PetSimulation 
                items={items} 
                fedItems={fedItems}
                feedingItem={feedingItem}
                isEating={isEating}
                showHappy={showHappy}
                isUsingToilet={isUsingToilet}
                hapinessNumber={happiness}
                hungerNumber={hunger}
                toiletNumber={toilet}
              />
            </SortableContext>
          </DndContext>
          
          <SimulationFinished 
            isVisible={showFinishedModal}
            onClose={() => setShowFinishedModal(false)}
            rabbitName={currentRabbit?.name || 'Your Rabbit'}
            rabbitId={id}
          />
        </>
      )}
    </div>
  );
};

export default PetSimulationRoute; 