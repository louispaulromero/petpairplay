import RabbitCard from "../components/rabbitDisplay/RabbitCard";
import rabbitData from '../rabbits.json';
import React, { useState, useEffect } from 'react';
import './RabbitDisplayPage.css';
import SearchIcon from '../assets/images/search.svg';
import SortIcon from '../assets/images/filter-left.svg';
import LeftArrowIcon from '../assets/images/arrow-left.svg';
import { Link, useNavigate } from "react-router-dom";
import Filter from "../components/filter/Filter.jsx";
import HelpIcon from '../assets/images/helpIcon.svg';

const RabbitDisplayPage = () => {
    const [rabbits, setRabbits] = useState([]);
    const [filteredNumbers, setFilteredNumbers] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [activeFilters, setActiveFilters] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [originalRabbits, setOriginalRabbits] = useState([]);
    const [queryInput, setQueryInput] = useState('');
    const [savedRabbits, setSavedRabbits] = useState([]); 
    const [viewingSaved, setViewingSaved] = useState(false);

    const navigate = useNavigate();

    const loadSavedRabbits = () => {
        try {
            return JSON.parse(localStorage.getItem("savedRabbits")) || [];
        } catch {
            return [];
        }
    };

    // Clear all bios cache
    const clearBioCache = () => {
        localStorage.removeItem("rabbitBios");
        alert("All rabbit biography cache cleared!");
    };

    const onSuggestSubmit = async (e) => {
        e.preventDefault();
        if (!queryInput.trim()) return;
        try {
            const allRabbits = originalRabbits;
            const response = await fetch("https://noggin.rea.gent/bloody-orca-6738", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer rg_v1_66uiebjppm5h69ifreb1h6ahla7kogmctt5q_ngk",
                },
                body: JSON.stringify({ userText: queryInput }),
            });

            const responseText = await response.text();
            const suggestions = JSON.parse(responseText);
            const { nameRabbit, responseRabbit } = suggestions[0] || {};
            if (!nameRabbit || !responseRabbit) {
                alert("Sorry, the suggestion format is invalid. Please try again.");
                return;
            }
            const rabbitName = nameRabbit.trim();
            const selectedRabbit = allRabbits.find(
                (r) => r.card_page.name.toLowerCase() === rabbitName.toLowerCase()
            );
            if (!selectedRabbit) {
                alert("Sorry, the suggested rabbit couldn't be found.");
                return;
            }
            navigate(`/display/detail/${selectedRabbit.details_page.id}`, {
                state: { customBlurb: responseRabbit.trim() }
            });
        } catch (error) {
            console.error("Error handling suggestion submit:", error);
        }
    };

    useEffect(() => {
        setRabbits(rabbitData.rabbits);
        setOriginalRabbits(rabbitData.rabbits);
        setFilteredNumbers(rabbitData.rabbits.length);
        setSavedRabbits(loadSavedRabbits());

        const updateSaved = () => {
            setSavedRabbits(loadSavedRabbits());
        };
        window.addEventListener("savedRabbitsUpdated", updateSaved);
        return () => {
            window.removeEventListener("savedRabbitsUpdated", updateSaved);
        };
    }, []);

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
        if (!searchValue.trim()) {
            setRabbits(originalRabbits);
            setFilteredNumbers(originalRabbits.length);
            return;
        }
        const filtered = originalRabbits.filter(rabbit => {
            const name = rabbit.card_page.name.toLowerCase();
            const sex = rabbit.card_page.sex.toLowerCase();
            const searchLower = searchValue.toLowerCase();
            return name.includes(searchLower) || sex.includes(searchLower);
        });
        setRabbits(filtered);
        setFilteredNumbers(filtered.length);
    };

    const handleSearchButtonClick = () => {
        handleSearch(searchTerm);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchButtonClick();
        }
    };

    const applyFilter = (filters) => {
        let filtered = originalRabbits;
        if (searchTerm.trim()) {
            filtered = filtered.filter(rabbit => {
                const name = rabbit.card_page.name.toLowerCase();
                const sex = rabbit.card_page.sex.toLowerCase();
                const searchLower = searchTerm.toLowerCase();
                return name.includes(searchLower) || sex.includes(searchLower);
            });
        }
        if (filters.sex.length > 0) {
            filtered = filtered.filter(r =>
                filters.sex.includes(r.card_page.sex)
            );
        }
        if (filters.age.length > 0) {
            filtered = filtered.filter(r => {
                const age = r.card_page.age;
                return filters.age.some(ageRange => {
                    switch (ageRange) {
                        case "Baby": return age >= 0 && age <= 1;
                        case "Young": return age > 1 && age <= 3;
                        case "Adult": return age > 3 && age <= 6;
                        case "Senior": return age > 6;
                        default: return false;
                    }
                });
            });
        }
        if (filters.fee.length > 0) {
            filtered = filtered.filter(r => {
                const fee = r.card_page.adoption_fee;
                return filters.fee.some(feeRange => {
                    switch (feeRange) {
                        case "$0": return fee === 0;
                        case "Under $50": return fee > 0 && fee < 50;
                        case "$50+": return fee >= 50;
                        default: return false;
                    }
                });
            });
        }
        setRabbits(filtered);
        setFilteredNumbers(filtered.length);
        setActiveFilters(filters);
        setShowFilter(false);
    };

    const clearAllFilters = () => {
        setRabbits(originalRabbits);
        setFilteredNumbers(originalRabbits.length);
        setActiveFilters({});
        setSearchTerm('');
    };

    const hasActiveFilters = () => {
        return Object.values(activeFilters).some(filter =>
            Array.isArray(filter) ? filter.length > 0 : filter > 0
        ) || searchTerm.trim() !== '';
    };

    const clearAllSavedRabbits = () => {
        localStorage.removeItem("savedRabbits");
        setSavedRabbits([]);
        setViewingSaved(false);
        setRabbits(originalRabbits);
        setFilteredNumbers(originalRabbits.length);
        window.dispatchEvent(new Event("savedRabbitsUpdated"));
    };

    return (
        <div className="display-page-container">

            {/* Help me choose — hide when viewing saved */}
            {!viewingSaved && (
                <form className="help-me-choose-bar" onSubmit={onSuggestSubmit}>
                    <input
                        type="text"
                        placeholder="Describe your home, lifestyle, or what you’re looking for in a rabbit..."
                        value={queryInput}
                        onChange={(e) => setQueryInput(e.target.value)}
                    />
                    <button type="submit" className="btn btn-outline-primary">
                        <img src={HelpIcon} alt="Help icon"
                            style={{ width: '20px', height: '20px', marginRight: '6px' }} />
                        <p>Help me choose</p>
                    </button>
                </form>
            )}

            {/* Top controls — hide when viewing saved */}
            {!viewingSaved && (
                <div className="top-controls">
                    <button className="sort-button" onClick={() => { setShowFilter(true) }}>
                        <img src={SortIcon} alt="" className="sort-icon" />
                        <span><p>Filter by</p></span>
                    </button>

                    {/* <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button onClick={handleSearchButtonClick}>
                            <img src={SearchIcon} alt="" />
                        </button>
                    </div> */}

                <div className="saved-rabbit-button-container">
                    
                    {savedRabbits.length > 0 && (
                    <Link to={'/display/saved'} key={'gotosavedpage'}>
                    <div className="saved-buttons" style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "250px", marginTop: "12px" }}>
                        {!viewingSaved && (
                            <button
                                className="saved-rabbit-button"
                                onClick={() => {
                                    setRabbits(savedRabbits);
                                    setViewingSaved(true);
                                    setFilteredNumbers(savedRabbits.length);
                                }}
                            >
                                <p>Saved Rabbits</p>
                            </button>
                        )}

                        {viewingSaved && (
                            <>
                                <button
                                    className="btn btn-outline-primary back-to-display-btn"
                                    onClick={() => {
                                        setRabbits(originalRabbits);
                                        setViewingSaved(false);
                                        setFilteredNumbers(originalRabbits.length);
                                    }}
                                    style={{ display: "flex", alignItems: "center", gap: "6px" }}
                                >
                                    <img src={LeftArrowIcon} alt="Back" style={{ width: "18px" }} />
                                    Back to All Rabbits
                                </button>

                                <button
                                    className="btn btn-danger clear-saved-rabbits-btn"
                                    onClick={clearAllSavedRabbits}
                                >
                                    Clear Saved Rabbits
                                </button>
                            </>
                        )}
                    </div>
                    </Link>
                )}
                </div>

                    <p className="results-text">{filteredNumbers} result(s)</p>

                    {hasActiveFilters() && (
                        <button className="clear-filters-button" onClick={clearAllFilters}>
                            Clear All Filters
                        </button>
                    )}
                </div>
            )}

            {/* ⬇️ Clear Bio Cache button moved here, under Top Controls */}
            
            <div className="saved-rabbit-btn-and-cache-container">




                

                {!viewingSaved && (
                    <div className="cache-btn-container">
                        <button onClick={clearBioCache} className="cache-btn btn btn-warning">
                            <p>Clear Bio Cache</p>
                        </button>
                    </div>
                )}
            
            </div>
            
            
           

            <div className="display-body">
                {rabbits.length > 0 ? (
                    rabbits.map(rabbit => (
                        <Link 
                            to={`/display/detail/${rabbit.details_page.id}`}
                            key={rabbit.details_page.id}
                            className="rabbit-link"
                        >
                            <RabbitCard rabbit={rabbit} />
                        </Link>
                    ))
                ) : (
                    <div className="no-results">
                        <p>No rabbits found matching your search criteria.</p>
                        <p>Try adjusting your search terms or filters.</p>
                    </div>
                )}
            </div>

            {showFilter && (
                <Filter
                    onApply={applyFilter}
                    onClose={() => setShowFilter(false)}
                />
            )}
        </div>
    );
};

export default RabbitDisplayPage;