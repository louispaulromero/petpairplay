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

        <p><h3>Sex</h3></p>
        <div className="filter-group">
          <label><input type="checkbox" checked={filters.sex.includes("Male")} onChange={() => handleCheckboxChange("sex", "Male")} /> <p>Male</p></label>
          <label><input type="checkbox" checked={filters.sex.includes("Female")} onChange={() => handleCheckboxChange("sex", "Female")} /> <p>Female</p></label>
        </div>

        <p><h3>Age</h3></p>
        <div className="filter-group">
          <label><input type="checkbox" checked={filters.age.includes("Baby")} onChange={() => handleCheckboxChange("age", "Baby")} /> <p>Baby (0-1 years)</p></label>
          <label><input type="checkbox" checked={filters.age.includes("Young")} onChange={() => handleCheckboxChange("age", "Young")} /> <p>Young (1-3 years)</p></label>
          <label><input type="checkbox" checked={filters.age.includes("Adult")} onChange={() => handleCheckboxChange("age", "Adult")} /> <p>Adult (3-6 years)</p></label>
          <label><input type="checkbox" checked={filters.age.includes("Senior")} onChange={() => handleCheckboxChange("age", "Senior")} /> <p>Senior (6+ years)</p></label>
        </div>

        <p><h3>Adoption Fee</h3></p>
        <div className="filter-group">
          <label><input type="checkbox" checked={filters.fee.includes("$0")} onChange={() => handleCheckboxChange("fee", "$0")} /> <p>$0</p></label>
          <label><input type="checkbox" checked={filters.fee.includes("Under $50")} onChange={() => handleCheckboxChange("fee", "Under $50")} /> <p>Under $50</p></label>
          <label><input type="checkbox" checked={filters.fee.includes("$50+")} onChange={() => handleCheckboxChange("fee", "$50+")} /> <p>$50+</p></label>
        </div>

        <p><h3>Other</h3></p>
        <div className="filter-group">
          <label><input type="checkbox" checked={filters.other.includes("Hypoallergenic")} onChange={() => handleCheckboxChange("other", "Hypoallergenic")} /> <p>Hypoallergenic</p></label>
          <label><input type="checkbox" checked={filters.other.includes("Good with kids/other animals")} onChange={() => handleCheckboxChange("other", "Good with kids/other animals")} /> <p>Good with kids/other animals</p></label>
        </div>

        <p><h3>Time Commitment</h3></p>
        <div className="time-slider">
          <span><p>0 hrs</p></span>
          <input type="range" min="0" max="24" value={filters.time} onChange={handleSliderChange} />
          <span><p>24 hrs</p></span>
        </div>

        <div className="filter-buttons">
          <button onClick={() => onApply(filters)}><p>Apply Filter</p></button>
          <button onClick={resetFilters}><p>Reset</p></button>
          <button onClick={onClose}><p>Close</p></button>
        </div>

      </div>
    </div>
  );
};

export default Filter;

