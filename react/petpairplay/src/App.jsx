import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import FilterSidebar from "./components/FilterSidebar";
import PetCard from "./components/PetCard";
import PetDetails from "./components/PetDetails";
import PetSimulation from "./components/PetSimulation";
//import './App.css'

const App = () => {
  const [rabbits, setRabbits] = useState([]);
  const [visibleBlurbId, setVisibleBlurbId] = useState(null);
  const [biographies, setBiographies] = useState({});
  const [customBlurbs, setCustomBlurbs] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [savedRabbits, setSavedRabbits] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [queryInput, setQueryInput] = useState("");
  const [mode, setMode] = useState("list");
  const [navigationHistory, setNavigationHistory] = useState([]); // Stack of {mode: string, blurbId: string | null}

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/louispaulromero/petpairplay/refs/heads/louis/new_rabbits.json")
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        if (data && data.rabbits) setRabbits(data.rabbits);
        else setRabbits([]);
      })
      .catch(err => {
        console.error("Error loading rabbit data:", err);
        setRabbits([]); // Or handle error state here
      });
  }, []);

  const openNav = () => setFiltersOpen(true);
  const closeNav = () => setFiltersOpen(false);

  const generateBiography = async (rabbit) => {
    const cardPage = rabbit.card_page;
    const detailsPage = rabbit.details_page;
    try {

      const response = await fetch("https://noggin.rea.gent/yodelling-cicada-2365", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer rg_v1_aeg1zrcmeiqa2iqm6th462nie3xakdoc1ck1_ngk",
        },
        body: JSON.stringify({
          trait1: detailsPage.personality_traits[1],
          trait2: detailsPage.personality_traits[2],
          species: cardPage.species,
          breed: cardPage.breed,
          name: cardPage.name,
          trait0: detailsPage.personality_traits[0],
        }),
      });
      return await response.text();
    } catch (error) {
      console.error("Error generating biography:", error);
      return "Biography information not available.";
    }
  };

  const pushToHistory = (currentMode, currentBlurbId) => {
    setNavigationHistory((prev) => [...prev, { mode: currentMode, blurbId: currentBlurbId }]);
  };

  const goBack = () => {
    if (navigationHistory.length === 0) {
      // Fallback to home if no history
      setMode("list");
      setVisibleBlurbId(null);
      setCustomBlurbs({});
      return;
    }

    const updatedHistory = [...navigationHistory];
    const previous = updatedHistory.pop(); // Get the last state
    setNavigationHistory(updatedHistory);
    setMode(previous.mode);
    setVisibleBlurbId(previous.blurbId);

    // Clear custom blurbs if returning to list mode to make the box disappear permanently after backing out
    if (previous.mode === "list") {
      setCustomBlurbs({});
    }
  };

  // Optional: If you need a true "home" reset, call this separately (e.g., from a home button)
  const resetToHome = () => {
    setNavigationHistory([]); // Clear history
    setVisibleBlurbId(null);
    setMode("list");
    setCustomBlurbs({});
  };

  const onCardClick = async (rabbit) => {
    const rabbitId = rabbit.card_page.name.toLowerCase().replace(/\s+/g, "-");
    
    // Push current state before navigating
    pushToHistory(mode, visibleBlurbId);
    
    setVisibleBlurbId(rabbitId);
    setMode("detail");
    
    if (!biographies[rabbitId]) {
      const bio = await generateBiography(rabbit);
      setBiographies((prev) => ({ ...prev, [rabbitId]: bio }));
    }
  };

  const handleLike = (rabbitId) => {
    setLikeCounts((prev) => ({
      ...prev,
      [rabbitId]: (prev[rabbitId] || 0) + 1,
    }));
  };

  const handleSave = (rabbit) => {
    if (!savedRabbits.some((r) => r.card_page.name === rabbit.card_page.name)) {
      setSavedRabbits((prev) => [...prev, rabbit]);
    }
  };

  const clearSavedRabbits = () => {
    setSavedRabbits([]);
  };

  const onFilterSubmit = (e) => {
    e.preventDefault();
    setFiltersOpen(false);
    // Implement filtering logic if desired
  };

  const onSuggestSubmit = async (e) => {
    e.preventDefault();
    if (!queryInput.trim()) return;
  
    try {

      const rabbitsResponse = await fetch(
        "https://raw.githubusercontent.com/louispaulromero/petpairplay/refs/heads/louis/new_rabbits.json"
      );
      const rabbitsData = await rabbitsResponse.json();
      const allRabbits = rabbitsData.rabbits || [];



  
      const response = await fetch("https://noggin.rea.gent/bloody-orca-6738", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer rg_v1_66uiebjppm5h69ifreb1h6ahla7kogmctt5q_ngk",
        },
        body: JSON.stringify({
          userText: queryInput,
        }),
      });
      const responseText = await response.text();
  
      const suggestions = JSON.parse(responseText);
  
      // Assuming the first suggestion if multiple
      const { nameRabbit, responseRabbit } = suggestions[0] || {};
  
      if (!nameRabbit || !responseRabbit) {
        console.error("Invalid suggestion structure from API.");
        alert("Sorry, the suggestion format is invalid. Please try again.");
        return;
      }
  
      const rabbitName = nameRabbit.trim();
      const rabbitDescription = responseRabbit.trim();
      const rabbitId = rabbitName.toLowerCase().replace(/\s+/g, "-");
  
      // Debug logging
      console.log("Suggested rabbit name from API:", rabbitName);
      console.log("Available rabbit names in data:", allRabbits.map(r => r.card_page.name));

      // Find the matching rabbit object from allRabbits
      const selectedRabbit = allRabbits.find(
        (rabbit) => rabbit.card_page.name.toLowerCase() === rabbitName.toLowerCase()
      );
  
      if (!selectedRabbit) {
        console.error("Suggested rabbit not found in data.");
        alert("Sorry, the suggested rabbit couldn't be found in our data. Please try another query."); // User-friendly message
        return; // Optionally handle this error (e.g., show a message to the user)
      }
  
      // Push current state before navigating
      pushToHistory(mode, visibleBlurbId);
  
      // Set custom blurb
      setCustomBlurbs((prev) => ({
        ...prev,
        [rabbitId]: rabbitDescription,
      }));
  
      // Generate biography if not already loaded
      if (!biographies[rabbitId]) {
        const bio = await generateBiography(selectedRabbit);
        setBiographies((prev) => ({ ...prev, [rabbitId]: bio }));
      }
  
      // Navigate to detail mode
      setVisibleBlurbId(rabbitId);
      setMode("detail");
    } catch (e) {
      console.error("Error handling suggestion submit:", e);
    }
  };

  const setSimulation = () => {
    // Push current state before navigating to simulation
    pushToHistory(mode, visibleBlurbId);
    setMode("simulation");
  };

  const openSavedRabbits = () => {
    pushToHistory(mode, visibleBlurbId);
    setMode("saved");
    setVisibleBlurbId(null); // Clear blurb ID for list view
  };

  return (
    <div className="container">
      <Header />
      <header className="button-header d-flex justify-content-between align-items-center my-3">
        <h1></h1>
        {navigationHistory.length > 0 && (
          <button className="btn btn-secondary" onClick={goBack} id="home-button">
            Back
          </button>
        )}
      </header>

      {(mode === "detail" || mode === "simulation") && customBlurbs[visibleBlurbId] && (
        <div className="card mb-3" style={{ animation: "colorFlash 1s infinite" }}>
          <div className="card-body">
            {customBlurbs[visibleBlurbId]}
          </div>
        </div>
      )}

      <FilterSidebar
        filtersOpen={filtersOpen}
        closeNav={closeNav}
        onFilterSubmit={onFilterSubmit}
      />

      {mode === "list" && (
        <div>
          <form className="input-group mb-4 d-flex align-items-center" onSubmit={onSuggestSubmit}>
            <span
              className="me-3 fs-2"
              style={{ cursor: "pointer" }}
              onClick={openNav}
              aria-label="Open Filters"
              role="button"
            >
              &#9776;
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Describe your home, lifestyle, or what you’re looking for in a rabbit..."
              aria-label="What are you looking for?"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
            />
            <button className="btn btn-outline-primary" type="submit" id="suggest-button">
              Help me choose
            </button>
          </form>

          {savedRabbits.length > 0 && (
            <button className="btn btn-secondary mb-3" onClick={openSavedRabbits}>
              Saved Rabbits
            </button>
          )}

          <div id="home-page">
            {rabbits.map((rabbit) => {
              const rabbitId = rabbit.card_page.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <PetCard
                  key={rabbit.card_page.name}
                  rabbit={rabbit}
                  onClick={onCardClick}
                  likeCount={likeCounts[rabbitId] || 0}
                  onLike={() => handleLike(rabbitId)}
                />
              );
            })}
          </div>
        </div>
      )}

      {mode === "saved" && (
        <div>
          <h2>Saved Rabbits</h2>
          {savedRabbits.length > 0 && (
            <button className="btn btn-danger mb-3" onClick={clearSavedRabbits}>
              Clear Saved Rabbits
            </button>
          )}
          <div id="saved-page">
            {savedRabbits.length > 0 ? (
              savedRabbits.map((rabbit) => {
                const rabbitId = rabbit.card_page.name.toLowerCase().replace(/\s+/g, "-");
                return (
                  <PetCard
                    key={rabbit.card_page.name}
                    rabbit={rabbit}
                    onClick={onCardClick}
                    likeCount={likeCounts[rabbitId] || 0}
                    onLike={() => handleLike(rabbitId)}
                  />
                );
              })
            ) : (
              <p>No saved rabbits yet.</p>
            )}
          </div>
        </div>
      )}

      {mode === "detail" && (
        rabbits.map((rabbit) => {
          const rabbitId = rabbit.card_page.name.toLowerCase().replace(/\s+/g, "-");
          if (visibleBlurbId !== rabbitId) return null;
          return (
            <PetDetails
              key={rabbitId}
              rabbit={rabbit}
              biography={biographies[rabbitId]}
              likeCount={likeCounts[rabbitId] || 0}
              onLike={() => handleLike(rabbitId)}
              onSave={() => handleSave(rabbit)}
              setSimulation={setSimulation}
            />
          );
        })
      )}

      {mode === "simulation" && (
        rabbits.map((rabbit) => {
          const rabbitId = rabbit.card_page.name.toLowerCase().replace(/\s+/g, "-");
          if (visibleBlurbId !== rabbitId) return null;
          return (
            <PetSimulation
              key={rabbitId}
              rabbit={rabbit}
              biography={biographies[rabbitId]}
              setSimulation={setSimulation}
            />
          );
        })
      )}
    </div>
  );
};

export default App;
