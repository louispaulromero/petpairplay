import React, { useState } from "react";
import "./Filter.css";

const Filter = ({ onApply, onClose }) => {
  const [filters, setFilters] = useState({
    sex: [],
    age: [],
    fee: [],
    other: [],
    time: 0
  });

  const handleCheckboxChange = (category, value) => {
    setFilters(prev => {
      const current = prev[category];
      return {
        ...prev,
        [category]: current.includes(value)
          ? current.filter(item => item !== value)
          : [...current, value]
      };
    });
  };

  const handleSliderChange = (e) => {
    setFilters(prev => ({ ...prev, time: e.target.value }));
  };

  const resetFilters = () => {
    setFilters({
      sex: [],
      age: [],
      fee: [],
      other: [],
      time: 0
    });
  };

  return (
    <div className="filter-overlay">
      <div className="filter-container">

        <h3>Sex</h3>
        <div className="filter-group">
          <label><input type="checkbox" checked={filters.sex.includes("Male")} onChange={() => handleCheckboxChange("sex", "Male")} /> Male</label>
          <label><input type="checkbox" checked={filters.sex.includes("Female")} onChange={() => handleCheckboxChange("sex", "Female")} /> Female</label>
        </div>

        <h3>Age</h3>
        <div className="filter-group">
          <label><input type="checkbox" checked={filters.age.includes("Baby")} onChange={() => handleCheckboxChange("age", "Baby")} /> Baby (0-1 years)</label>
          <label><input type="checkbox" checked={filters.age.includes("Young")} onChange={() => handleCheckboxChange("age", "Young")} /> Young (1-3 years)</label>
          <label><input type="checkbox" checked={filters.age.includes("Adult")} onChange={() => handleCheckboxChange("age", "Adult")} /> Adult (3-6 years)</label>
          <label><input type="checkbox" checked={filters.age.includes("Senior")} onChange={() => handleCheckboxChange("age", "Senior")} /> Senior (6+ years)</label>
        </div>

        <h3>Adoption Fee</h3>
        <div className="filter-group">
          <label><input type="checkbox" checked={filters.fee.includes("$0")} onChange={() => handleCheckboxChange("fee", "$0")} /> $0</label>
          <label><input type="checkbox" checked={filters.fee.includes("Under $50")} onChange={() => handleCheckboxChange("fee", "Under $50")} /> Under $50</label>
          <label><input type="checkbox" checked={filters.fee.includes("$50+")} onChange={() => handleCheckboxChange("fee", "$50+")} /> $50+</label>
        </div>

        <h3>Other</h3>
        <div className="filter-group">
          <label><input type="checkbox" checked={filters.other.includes("Hypoallergenic")} onChange={() => handleCheckboxChange("other", "Hypoallergenic")} /> Hypoallergenic</label>
          <label><input type="checkbox" checked={filters.other.includes("Good with kids/other animals")} onChange={() => handleCheckboxChange("other", "Good with kids/other animals")} /> Good with kids/other animals</label>
        </div>

        <h3>Time Commitment</h3>
        <div className="time-slider">
          <span>0 hrs</span>
          <input type="range" min="0" max="24" value={filters.time} onChange={handleSliderChange} />
          <span>24 hrs</span>
        </div>

        <div className="filter-buttons">
          <button onClick={() => onApply(filters)}>Apply Filter</button>
          <button onClick={resetFilters}>Reset</button>
          <button onClick={onClose}>Close</button>
        </div>

      </div>
    </div>
  );
};

export default Filter;

