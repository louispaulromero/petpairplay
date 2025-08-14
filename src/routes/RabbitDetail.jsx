import React, { useEffect, useState } from "react";
import './RabbitDetail.css';
import { useParams, Link, useLocation } from "react-router-dom";
import RabbitData from '../rabbits.json';
import DogLeashIcon from '../assets/images/dogLeash.svg';
import HeartIcon from '../assets/images/heart.svg';
import PlusSaveIcon from '../assets/images/plusMath.svg';
import LeftArrowIcon from '../assets/images/arrow-left.svg';

const RabbitDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const [rabbit, setRabbit] = useState(null);
    const [rabbitBio, setRabbitBio] = useState('');
    const [hasLiked, setHasLiked] = useState(false);
    const [hasSaved, setHasSaved] = useState(false);

    const customBlurb = location.state?.customBlurb || '';

    const safeParse = (key) => {
        try {
            return JSON.parse(localStorage.getItem(key)) || [];
        } catch {
            return [];
        }
    };

    const loadBioCache = () => {
        try {
            return JSON.parse(localStorage.getItem("rabbitBios")) || {};
        } catch {
            return {};
        }
    };

    const saveBioCache = (cache) => {
        localStorage.setItem("rabbitBios", JSON.stringify(cache));
    };

    const generateBiography = async (rabbit) => {
        const { card_page, details_page } = rabbit;
        try {
            const response = await fetch("https://noggin.rea.gent/yodelling-cicada-2365", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer rg_v1_aeg1zrcmeiqa2iqm6th462nie3xakdoc1ck1_ngk",
                },
                body: JSON.stringify({
                    trait1: details_page.personality_traits[1],
                    trait2: details_page.personality_traits[2],
                    species: card_page.species,
                    breed: card_page.breed,
                    name: card_page.name,
                    trait0: details_page.personality_traits[0],
                    sex: card_page.sex,
                }),
            });
            return await response.text();
        } catch (error) {
            console.error("Error generating biography:", error);
            return "Biography information not available.";
        }
    };

    useEffect(() => {
        const foundRabbit = RabbitData.rabbits.find(
            r => String(r.details_page.id) === String(id)
        );
        if (foundRabbit) {
            setRabbit(foundRabbit);

            // Load Bio from cache or API
            const bioCache = loadBioCache();
            if (bioCache[id]) {
                setRabbitBio(bioCache[id]);
            } else {
                (async () => {
                    const bio = await generateBiography(foundRabbit);
                    const updatedCache = { ...bioCache, [id]: bio };
                    saveBioCache(updatedCache);
                    setRabbitBio(bio);
                })();
            }

            // Check if rabbit is already saved
            const savedList = safeParse("savedRabbits");
            if (savedList.some(r => String(r.details_page.id) === String(id))) {
                setHasSaved(true);
            } else {
                setHasSaved(false);
            }
        }
    }, [id]);

    const handleLike = () => {
        setHasLiked(prev => !prev);
    };

    const handleSave = () => {
        if (!rabbit) return;

        let savedList = safeParse("savedRabbits");
        const currentId = String(id);

        if (savedList.some(r => String(r.details_page.id) === currentId)) {
            // Remove rabbit
            savedList = savedList.filter(r => String(r.details_page.id) !== currentId);
            setHasSaved(false);
        } else {
            // Add rabbit
            savedList.push(rabbit);
            setHasSaved(true);
        }

        localStorage.setItem("savedRabbits", JSON.stringify(savedList));

        // Notify other components about the update
        window.dispatchEvent(new Event("savedRabbitsUpdated"));
    };

    return (
        <div className="detail-page-container">
            <Link to="/display" className="backToDisplay">
                <img src={LeftArrowIcon} alt="Go back" className="go-back-arrow" />
            </Link>

            {customBlurb && (
                <div className="custom-blurb-box">{customBlurb}</div>
            )}
            <div className="detail-image-container">
                <img
                    src={rabbit?.details_page.image}
                    alt={rabbit?.card_page.name}
                    className="detail-image"
                />
            </div>



            <div className="detail-header">
                <div className="rabbit-name"><p>{rabbit?.card_page.name}</p></div>
                <div className="detail-icons">
                    <Link to={`/display/simulation-instruction/${rabbit?.details_page.id}/${rabbit?.card_page.name}`}>
                        <div className="icon-items">
                            <img src={DogLeashIcon} alt="learn" />
                            <p>Learn</p>
                        </div>
                    </Link>

                    {/* ❤️ Like */}
                    <div className="icon-items" onClick={handleLike} style={{ cursor: "pointer" }}>
                        <img
                            src={HeartIcon}
                            alt="like"
                            style={{
                                filter: hasLiked
                                    ? "invert(27%) sepia(88%) saturate(7493%) hue-rotate(342deg) brightness(93%) contrast(102%)"
                                    : "none"
                            }}
                        />
                        <p>{hasLiked ? "Liked" : "Like"}</p>
                    </div>

                    {/* 💾 Save */}
                    <div className="icon-items" onClick={handleSave} style={{ cursor: "pointer" }}>
                        <img
                            src={PlusSaveIcon}
                            alt="save"
                            style={{
                                filter: hasSaved
                                    ? "invert(33%) sepia(97%) saturate(2000%) hue-rotate(197deg) brightness(93%) contrast(102%)"
                                    : "none"
                            }}
                        />
                        <p>{hasSaved ? "Saved" : "Save"}</p>
                    </div>
                </div>
            </div>

            <div className="detail-body">
                <div className="detail-row">
                    <div className="detail-key"><p>DISTANCE</p></div>
                    <div className="detail-value"><p>{rabbit?.details_page.distance} miles away</p></div>
                </div>
                <div className="detail-row">
                    <div className="detail-key"><p>GENDER</p></div>
                    <div className="detail-value"><p>{rabbit?.card_page.sex}</p></div>
                </div>
                <div className="detail-row">
                    <div className="detail-key"><p>BREED</p></div>
                    <div className="detail-value"><p>{rabbit?.card_page.breed}</p></div>
                </div>
                <div className="detail-row">
                    <div className="detail-key"><p>WEIGHT</p></div>
                    <div className="detail-value"><p>{rabbit?.details_page.weight} lbs</p></div>
                </div>
                <div className="detail-row">
                    <div className="detail-key"><p>AGE</p></div>
                    <div className="detail-value"><p>{rabbit?.card_page.age} yrs</p></div>
                </div>
                <div className="detail-row">
                    <div className="detail-key"><p>PRICE</p></div>
                    <div className="detail-value"><p>${rabbit?.card_page.adoption_fee} adoption fee</p></div>
                </div>
                <div className="detail-row">
                    <div className="detail-key"><p>LOCATION</p></div>
                    <div className="detail-value"><p>{rabbit?.details_page.location}</p></div>
                </div>

                <div className="traits-container">
                    {rabbit?.details_page.personality_traits?.map((trait, i) => (
                        <span key={i} className="trait-pill">{trait}</span>
                    ))}
                </div>

                <div className="rabbit-bio"><p>{rabbitBio}</p></div>

                <Link to={'/display/shelter'} key={'gotoshetler'}>
                    <div className="contact-button-container">
                        <button className="contact-button"><p>Adopt Me</p></button>
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default RabbitDetail;