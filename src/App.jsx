import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import FilterModal from "./components/FilterModal";
import PetCard from "./components/PetCard";
import PetDetails from "./components/PetDetails";
import PetSimulation from "./components/PetSimulation";

const App = () => {
  const [rabbits, setRabbits] = useState([]);
  const [visibleBlurbId, setVisibleBlurbId] = useState(null);
  const [biographies, setBiographies] = useState({});
  const [customBlurbs, setCustomBlurbs] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [savedRabbits, setSavedRabbits] = useState([]);

  // Popup + search
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [queryInput, setQueryInput] = useState("");

  // View navigation
  const [mode, setMode] = useState("list");
  const [navigationHistory, setNavigationHistory] = useState([]);

  // Filters (AND across categories; OR within a category)
  const [filters, setFilters] = useState({
    byProximity: false,
    species: [],
    sex: [],
    ageBands: [],
    size: [],               // "Small" | "Med" | "Large"
    fee: [],                // "$0" | "Under $50" | "$50+"
    specialNeeds: [],       // ["Yes"], ["No"], ["Yes","No"] => ignore
    other: {
      hypoallergenic: false,
      goodWithKids: false,
    },
    timeCommitmentHrs: 0,
  });

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/louispaulromero/petpairplay/refs/heads/louis/new_rabbits.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setRabbits(data?.rabbits ?? []))
      .catch((err) => {
        console.error("Error loading rabbit data:", err);
        setRabbits([]);
      });
  }, []);

  const openNav = () => setFiltersOpen(true);
  const closeNav = () => setFiltersOpen(false);

  const generateBiography = async (rabbit) => {
    const c = rabbit.card_page, d = rabbit.details_page;
    try {
      const response = await fetch("https://noggin.rea.gent/yodelling-cicada-2365", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer rg_v1_aeg1zrcmeiqa2iqm6th462nie3xakdoc1ck1_ngk",
        },
        body: JSON.stringify({
          trait0: d.personality_traits[0],
          trait1: d.personality_traits[1],
          trait2: d.personality_traits[2],
          species: c.species,
          breed: c.breed,
          name: c.name,
        }),
      });
      return await response.text();
    } catch {
      return "Biography information not available.";
    }
  };

  const pushToHistory = (modeNow, blurbIdNow) =>
    setNavigationHistory((prev) => [...prev, { mode: modeNow, blurbId: blurbIdNow }]);

  const goBack = () => {
    if (!navigationHistory.length) {
      setMode("list");
      setVisibleBlurbId(null);
      setCustomBlurbs({});
      return;
    }
    const updated = [...navigationHistory];
    const previous = updated.pop();
    setNavigationHistory(updated);
    setMode(previous.mode);
    setVisibleBlurbId(previous.blurbId);
    if (previous.mode === "list") setCustomBlurbs({});
  };

  const resetToHome = () => {
    setNavigationHistory([]);
    setVisibleBlurbId(null);
    setMode("list");
    setCustomBlurbs({});
  };

  const onCardClick = async (rabbit) => {
    const rabbitId = rabbit.card_page.name.toLowerCase().replace(/\s+/g, "-");
    pushToHistory(mode, visibleBlurbId);
    setVisibleBlurbId(rabbitId);
    setMode("detail");
    if (!biographies[rabbitId]) {
      const bio = await generateBiography(rabbit);
      setBiographies((p) => ({ ...p, [rabbitId]: bio }));
    }
  };

  const handleLike = (rabbitId) =>
    setLikeCounts((p) => ({ ...p, [rabbitId]: (p[rabbitId] || 0) + 1 }));

  const handleSave = (rabbit) => {
    if (!savedRabbits.some((r) => r.card_page.name === rabbit.card_page.name)) {
      setSavedRabbits((p) => [...p, rabbit]);
    }
  };
  const clearSavedRabbits = () => setSavedRabbits([]);

  // ---------------------------
  // Size resolution (breed-first, weight-fallback)
  // ---------------------------
  const SIZE_BY_BREED = {
    Rabbit: {
      "netherland dwarf": "Small",
      "holland lop": "Small",
      "mini lop": "Small",
      "mini rex": "Small",
      lionhead: "Small",
      dutch: "Small",
      rex: "Med",
      "english angora": "Med",
      angora: "Med",
      "french lop": "Large",
      "english lop": "Large",
      "flemish giant": "Large",
    },
    // Future: Dog: { ... }, Cat: { ... }
  };

  // Species-specific weight rules (kg)
  const WEIGHT_RULES = {
    Rabbit: { smallMax: 2.5, medMax: 4.0 }, // <2.5 Small, 2.5–4 Med, >4 Large
  };

  function computeSize(cardPage) {
    const species = (cardPage?.species || "").trim();
    const breedKey = (cardPage?.breed || "").trim().toLowerCase();

    // 1) Breed map
    const table = SIZE_BY_BREED[species];
    if (table && table[breedKey]) return table[breedKey];

    // 2) Weight fallback
    const rules = WEIGHT_RULES[species];
    if (!rules) return null;

    const raw = cardPage?.weight ?? cardPage?.weight_kg ?? cardPage?.weight_lbs;
    if (raw == null) return null;

    let w = Number(String(raw).replace(/[^0-9.]/g, "")) || NaN;
    if (Number.isNaN(w)) return null;

    // detect lbs and convert to kg
    const isLbs = /lb|pound/i.test(String(raw));
    if (isLbs) w = w * 0.453592;

    if (w < rules.smallMax) return "Small";
    if (w <= rules.medMax) return "Med";
    return "Large";
  }

  // ---- FILTERING ----
  const normalize = (s) => (s == null ? "" : String(s).trim().toLowerCase());

  const hasActiveFilters = useMemo(() => {
    const f = filters;
    return (
      f.byProximity ||
      f.species.length ||
      f.sex.length ||
      f.ageBands.length ||
      f.size.length ||
      f.fee.length ||
      f.specialNeeds.length ||
      f.other.hypoallergenic ||
      f.other.goodWithKids ||
      f.timeCommitmentHrs > 0
    );
  }, [filters]);

  const filteredRabbits = useMemo(() => {
    const feeMatch = (feeSelections, value) => {
      if (!feeSelections?.length) return true;
      const feeNumber = Number(String(value ?? "").replace(/[^0-9.]/g, "")) || 0;
      const wants0 = feeSelections.includes("$0") && feeNumber === 0;
      const wantsUnder50 = feeSelections.includes("Under $50") && feeNumber > 0 && feeNumber < 50;
      const wants50Plus = feeSelections.includes("$50+") && feeNumber >= 50;
      return wants0 || wantsUnder50 || wants50Plus;
    };

    // [] => ignore, ["Yes","No"] => ignore, ["Yes"] => true, ["No"] => false
    const specialNeedsMatch = (sel, r) => {
      if (!sel.length || sel.length === 2) return true;
      const requireTrue = sel.includes("Yes");
      const requireFalse = sel.includes("No");
      const hasNeeds = Boolean((r.card_page?.special_needs) ?? (r.details_page?.special_needs));
      if (requireTrue) return hasNeeds === true;
      if (requireFalse) return hasNeeds === false;
      return true;
    };

    const ageBandOf = (age) => {
      const n = Number(age);
      if (!Number.isFinite(n)) return null;
      if (n <= 1) return "Baby";
      if (n <= 6) return "Adult";
      return "Senior";
    };

    return rabbits.filter((r) => {
      const c = r.card_page || {};
      const d = r.details_page || {};

      // Species
      if (filters.species.length) {
        const wanted = filters.species.map(normalize);
        if (!wanted.includes(normalize(c.species))) return false;
      }

      // Sex
      if (filters.sex.length) {
        const wanted = filters.sex.map(normalize);
        if (!wanted.includes(normalize(c.sex))) return false;
      }

      // Size (computed from breed first, else weight)
      if (filters.size.length) {
        const computed = computeSize(c);
        if (!computed || !filters.size.includes(computed)) return false;
      }

      // Age bands
      if (filters.ageBands.length) {
        const band = ageBandOf(c.age);
        if (!band || !filters.ageBands.includes(band)) return false;
      }

      // Adoption fee
      if (!feeMatch(filters.fee, c.adoption_fee)) return false;

      // Special needs
      if (!specialNeedsMatch(filters.specialNeeds, r)) return false;

      // Other flags
      if (filters.other.hypoallergenic) {
        const hypo = Boolean(c.hypoallergenic ?? d.hypoallergenic);
        if (!hypo) return false;
      }
      if (filters.other.goodWithKids) {
        const gk = Boolean(c.good_with_kids ?? d.good_with_kids ?? d.good_with_children);
        if (!gk) return false;
      }

      // timeCommitmentHrs placeholder (no dataset field yet)
      return true;
    });
  }, [rabbits, filters]);

  // Modal
  const onFilterOpen = () => setFiltersOpen(true);
  const onFilterApply = (nextFilters) => {
    setFilters(nextFilters);
    setFiltersOpen(false);
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
      const rabbitDescription = responseRabbit.trim();
      const rabbitId = rabbitName.toLowerCase().replace(/\s+/g, "-");

      const selectedRabbit = allRabbits.find(
        (rabbit) => rabbit.card_page.name.toLowerCase() === rabbitName.toLowerCase()
      );
      if (!selectedRabbit) {
        alert("Sorry, the suggested rabbit couldn't be found in our data. Please try another query.");
        return;
      }

      pushToHistory(mode, visibleBlurbId);
      setCustomBlurbs((prev) => ({ ...prev, [rabbitId]: rabbitDescription }));

      if (!biographies[rabbitId]) {
        const bio = await generateBiography(selectedRabbit);
        setBiographies((prev) => ({ ...prev, [rabbitId]: bio }));
      }

      setVisibleBlurbId(rabbitId);
      setMode("detail");
    } catch (e2) {
      console.error("Error handling suggestion submit:", e2);
    }
  };

  const setSimulation = () => {
    pushToHistory(mode, visibleBlurbId);
    setMode("simulation");
  };

  const openSavedRabbits = () => {
    pushToHistory(mode, visibleBlurbId);
    setMode("saved");
    setVisibleBlurbId(null);
  };

  const listToShow = hasActiveFilters ? filteredRabbits : rabbits;

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
          <div className="card-body">{customBlurbs[visibleBlurbId]}</div>
        </div>
      )}

      <FilterModal open={filtersOpen} onClose={closeNav} onApply={onFilterApply} value={filters} />

      {mode === "list" && (
        <div>
          <form className="input-group mb-4 d-flex align-items-center" onSubmit={onSuggestSubmit}>
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={onFilterOpen}
              aria-label="Open Filters"
            >
              Filter
            </button>

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
            {listToShow.map((rabbit) => {
              const rabbitId = rabbit.card_page.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <PetCard
                  key={rabbit.card_page.name}
                  rabbit={rabbit}
                  onClick={() => onCardClick(rabbit)}
                  likeCount={likeCounts[rabbitId] || 0}
                  onLike={() => handleLike(rabbitId)}
                />
              );
            })}

            {hasActiveFilters && listToShow.length === 0 && (
              <p className="text-center text-muted mt-3">
                No pets match your filters. Try removing one or two.
              </p>
            )}
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
            {savedRabbits.length ? (
              savedRabbits.map((rabbit) => {
                const rabbitId = rabbit.card_page.name.toLowerCase().replace(/\s+/g, "-");
                return (
                  <PetCard
                    key={rabbit.card_page.name}
                    rabbit={rabbit}
                    onClick={() => onCardClick(rabbit)}
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

      {mode === "detail" &&
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
        })}

      {mode === "simulation" &&
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
        })}
    </div>
  );
};

export default App;
