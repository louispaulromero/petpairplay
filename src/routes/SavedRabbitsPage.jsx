import React, { useEffect, useState } from "react";
import RabbitCard from "../components/rabbitDisplay/RabbitCard";
import { Link } from "react-router-dom";
import LeftArrowIcon from '../assets/images/arrow-left.svg'; // back arrow icon
import './SavedRabbitsPage.css'; // includes backToDisplay styling
import LeftArrow from '../components/LeftArrow'
const SavedRabbitsPage = () => {
    const [savedRabbits, setSavedRabbits] = useState([]);

    // Helper to load list from localStorage
    const loadSavedRabbits = () => {
        const stored = JSON.parse(localStorage.getItem("savedRabbits")) || [];
        setSavedRabbits(stored);
    };

    // Clear all saved rabbits
    const clearAllSaved = () => {
        localStorage.removeItem("savedRabbits");
        setSavedRabbits([]);
        // Fire event so other components update
        window.dispatchEvent(new Event("savedRabbitsUpdated"));
    };

    useEffect(() => {
        loadSavedRabbits();

        // Listen for updates
        window.addEventListener("savedRabbitsUpdated", loadSavedRabbits);
        window.addEventListener("storage", loadSavedRabbits);

        return () => {
            window.removeEventListener("savedRabbitsUpdated", loadSavedRabbits);
            window.removeEventListener("storage", loadSavedRabbits);
        };
    }, []);

    return (
        <div className="display-page-container">
            <LeftArrow/>


            <div className="saved-rabbits-containter">

                {savedRabbits.length > 0 ? (
                    <div className="display-body">
                        {savedRabbits.map((rabbit) => (
                            <Link
                                to={`/display/detail/${rabbit.details_page.id}`}
                                key={rabbit.details_page.id}
                                className="rabbit-link"
                            >
                                <RabbitCard rabbit={rabbit} />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>No saved rabbits yet.</p>
                )}
            </div>



            <div className="buttons-container">


            {/* Clear all button */}
            {savedRabbits.length > 0 && (
                <Link to={'/display'} key={'gobacktodisplay'}>
                    <button
                    className="clear-filters-button" 
                    style={{ marginBottom: "16px" }}
                    onClick={clearAllSaved}
                    >

                    <p>Clear All Saved</p>
                </button>
                </Link>

            )}

            </div>
        </div>
    );
};

export default SavedRabbitsPage;
