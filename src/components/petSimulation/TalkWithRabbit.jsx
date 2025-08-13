import rabbitData from '../../rabbits.json';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TalkWithRabbit = ({rabbitId ,hunger,toilet,hapiness,feeditem }) => {
    const [foodPreference, setFoodPreference] = useState(null)
    const [response, setResponse] = useState(""); // 用来存 API 返回
    const [loading, setLoading] = useState(true);
    const [timeoutId, setTimeoutId] = useState(null); // 存储 timeout ID
    let feedItem = JSON.stringify(feeditem);
    useEffect(()=>{
        const rabbit = rabbitData.rabbits.find(r=>r.card_page.id === rabbitId);
        if (rabbit){
            setFoodPreference(JSON.stringify(rabbit.simulation_page.description));
        }
    },[rabbitId])

    useEffect(() => {
        // 只有当 feeditem 不为 null 时才调用 API
        if (feeditem === null) {
            setLoading(false);
            // 当 feeditem 变为 null 时，不要立即清空 response
            // 让之前设置的 timeout 自然完成
            return;
        }

        // 如果有正在进行的 timeout，清除它
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const callAPI = async () => {
          try {
            const res = await fetch(
              'https://noggin.rea.gent/sophisticated-trout-2578',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer rg_v1_h4oeuyeev0griee7f0a133mf4pn5nhnojqds_ngk',
                },
                body: JSON.stringify({
                  foodPreference: foodPreference || "",
                  hunger: hunger || "",
                  hapiness: hapiness || "",
                  toilet: toilet || "",
                  feeditem: feedItem || "",
                }),
              }
            );
    
            const text = await res.text();
            setResponse(text);

            // 设置新的 timeout 并保存 ID
            const newTimeoutId = setTimeout(() => {
                setResponse("");
                setTimeoutId(null);
              }, 5000); // 5秒后清空
            
            setTimeoutId(newTimeoutId);

          } catch (err) {
            setResponse("Error: " + err.message);
          } finally {
            setLoading(false);
          }
        };
        
        callAPI();
    }, [feedItem, foodPreference, hunger, hapiness, toilet]);

    // 清理函数：组件卸载时清除 timeout
    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);
    
    return (
        
        
        <div>
                  {loading ? <p> </p> : <p>{response}</p>}
        </div>
    )
}

TalkWithRabbit.propTypes = {
    rabbitId: PropTypes.string.isRequired,
    hunger: PropTypes.number,
    toilet: PropTypes.number,
    hapiness: PropTypes.number,
    feeditem: PropTypes.object
};

export default TalkWithRabbit;