import './Article.css' 
import LeftArrow from '../LeftArrow.jsx'
import ReactPlayer from "react-player";
import img1 from '../../assets/images/articles/scissor.png'
import img2 from '../../assets/images/articles/article-1.png'
import img3 from '../../assets/images/articles/article-2.png'
const Article = ()=>{
    return (
        <div className='article-container'>
            <LeftArrow/>

            <div className='article-header'><p>Grooming</p></div>

            
            <div className="video-slot">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/rvausPZOJ5A?si=PJl4RBSNxgiy23Gx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen className='video-control'></iframe>
            </div>

            <div className='article-content'>

                <div>
                    <div className='article-sub-header'><p>How to Trim Your Rabbit’s Nails</p></div>
                    
                    <div className='content-container'>

                        <div className='article-sub-header'>
                            <p>1.Gather Supplies</p>
                        </div>

                        <div className='article-p-text'>
                            <p>You’ll need small animal nail clippers, styptic powder (in case of bleeding), a towel, and good lighting. Optional: a helper to gently hold your bunny.
                            </p>
                        </div>

                        <div className='article-img'>
                            <img src={img1} alt="" />
                        </div>


                        <div className='article-sub-header'>
                            <p>2.Get Your Bunny Comfortable</p>
                        </div>

                        <div className='article-p-text'>
                            <p>Find a calm, quiet space. Wrap your rabbit securely in a towel like a bunny burrito, leaving one paw exposed. This helps prevent sudden movements and keeps them feeling safe.
                            </p>
                        </div>

                        <div className='article-img'>
                            <img src={img2} alt="" />
                        </div>


                        <div className='article-sub-header'>
                            <p>3.Identify the Quick</p>
                        </div>

                        <div className='article-p-text'>
                            <p>Hold the paw up to the light to locate the pink vein (quick) inside each nail. Avoid cutting into the quick—it’s painful and will bleed.
                            </p>
                        </div>

                        <div className='article-img'>
                            <img src={img3} alt="" />
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Article