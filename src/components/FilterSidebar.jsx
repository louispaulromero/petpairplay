import React from "react";

const FilterSidebar = ({ filtersOpen, closeNav, onFilterSubmit }) => (
  <form onSubmit={onFilterSubmit}>
    <div
      className="sidenav"
      aria-hidden={!filtersOpen}
      style={{ width: filtersOpen ? "250px" : "0" }}
    >
      <button
        type="button"
        className="closebtn"
        onClick={closeNav}
        aria-label="Close Filters"
      >
        &times;
      </button>
      <div className="filters ps-3">
        <h1>Filters</h1>

        <a href="#location" tabIndex={filtersOpen ? 0 : -1}>
          Location
        </a>
        <input type="checkbox" id="near" name="near" value="near" tabIndex={filtersOpen ? 0 : -1} />
        <label htmlFor="near">Near</label>

        <a href="#species" tabIndex={filtersOpen ? 0 : -1}>
          Species
        </a>
        <input type="checkbox" id="cat" name="cat" value="cat" tabIndex={filtersOpen ? 0 : -1} />
        <label htmlFor="cat">Cat</label>
        <input type="checkbox" id="dog" name="dog" value="dog" tabIndex={filtersOpen ? 0 : -1} />
        <label htmlFor="dog">Dog</label>
        <input
          type="checkbox"
          id="rabbit"
          name="rabbit"
          value="rabbit"
          tabIndex={filtersOpen ? 0 : -1}
        />
        <label htmlFor="rabbit">Rabbit</label>

        <a href="#sex" tabIndex={filtersOpen ? 0 : -1}>
          Sex
        </a>
        <input
          type="checkbox"
          id="female"
          name="female"
          value="female"
          tabIndex={filtersOpen ? 0 : -1}
        />
        <label htmlFor="female">Female</label>
        <input type="checkbox" id="male" name="male" value="male" tabIndex={filtersOpen ? 0 : -1} />
        <label htmlFor="male">Male</label>

        <a href="#age" tabIndex={filtersOpen ? 0 : -1}>
          Age
        </a>
        <input type="checkbox" id="baby" name="baby" value="baby" tabIndex={filtersOpen ? 0 : -1} />
        <label htmlFor="baby">Baby</label>
        <input
          type="checkbox"
          id="adult"
          name="adult"
          value="adult"
          tabIndex={filtersOpen ? 0 : -1}
        />
        <label htmlFor="adult">Adult</label>
        <input
          type="checkbox"
          id="senior"
          name="senior"
          value="senior"
          tabIndex={filtersOpen ? 0 : -1}
        />
        <label htmlFor="senior">Senior</label>

        <a href="#size" tabIndex={filtersOpen ? 0 : -1}>
          Size
        </a>
        <input type="checkbox" id="small" name="small" value="small" tabIndex={filtersOpen ? 0 : -1} />
        <label htmlFor="small">Small</label>
        <input
          type="checkbox"
          id="medium"
          name="medium"
          value="medium"
          tabIndex={filtersOpen ? 0 : -1}
        />
        <label htmlFor="medium">Medium</label>
        <input
          type="checkbox"
          id="large"
          name="large"
          value="large"
          tabIndex={filtersOpen ? 0 : -1}
        />
        <label htmlFor="large">Large</label>

        <a href="#adoptionfee" tabIndex={filtersOpen ? 0 : -1}>
          Adoption Fee
        </a>
        <input type="checkbox" id="free" name="free" value="free" tabIndex={filtersOpen ? 0 : -1} />
        <label htmlFor="free">$0</label>
        <input type="checkbox" id="under" name="under" value="under" tabIndex={filtersOpen ? 0 : -1} />
        <label htmlFor="under">Under $20</label>
        <input type="checkbox" id="over" name="over" value="over" tabIndex={filtersOpen ? 0 : -1} />
        <label htmlFor="over">$20+</label>

        <a href="#specialneeds" tabIndex={filtersOpen ? 0 : -1}>
          Open to Special Needs
        </a>
        <input type="checkbox" id="yes" name="yes" value="yes" tabIndex={filtersOpen ? 0 : -1} />
        <label htmlFor="yes">Yes</label>
        <input type="checkbox" id="no" name="no" value="no" tabIndex={filtersOpen ? 0 : -1} />
        <label htmlFor="no">No</label>

        <a href="#other" tabIndex={filtersOpen ? 0 : -1}>
          Other
        </a>
        <input type="checkbox" id="hypo" name="hypo" value="hypo" tabIndex={filtersOpen ? 0 : -1} />
        <label htmlFor="hypo">Hypoallergenic</label>
        <input
          type="checkbox"
          id="good-kids"
          name="good-kids"
          value="good-kids"
          tabIndex={filtersOpen ? 0 : -1}
        />
        <label htmlFor="good-kids">Good with Kids</label>
        <input
          type="checkbox"
          id="good-animals"
          name="good-animals"
          value="good-animals"
          tabIndex={filtersOpen ? 0 : -1}
        />
        <label htmlFor="good-animals">Good with Other Animals</label>
      </div>
      <input
        type="submit"
        value="Apply Filter"
        className="btn btn-primary my-3 ms-3"
        tabIndex={filtersOpen ? 0 : -1}
      />
    </div>
  </form>
);

export default FilterSidebar;
