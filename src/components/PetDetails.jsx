import React from "react";

const PetDetails = ({ rabbit, biography, likeCount, onLike, onSave, setSimulation }) => {
  const cardPage = rabbit.card_page;
  const detailsPage = rabbit.details_page;
  const rabbitId = cardPage.name.toLowerCase().replace(/\s+/g, "-");

  const buttonStyle = {
    fontWeight: 500,
    fontSize: "1.12em",
    textDecoration: "none",
    width: "80px", // Fixed width to make all buttons the same size
  };

  const iconStyle = {
    height: "1.6em",
    marginBottom: "0.2em",
  };

  const labelStyle = {
    fontSize: "1.12em", // Consistent font size for labels
  };

  return (
    <div id={`${rabbitId}-blurb`} className="planet-blurb">
      <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center">
        <div className="planet-image mb-3">
          <img src={detailsPage.image} alt={cardPage.name} />
        </div>
        <div className="planet-info px-3">
          <h2>Name: {cardPage.name}</h2>

          <div className="secondary-page-buttons-container d-flex justify-content-center gap-4 my-3">
            <button
              className="btn btn-link p-0 d-flex flex-column align-items-center"
              style={buttonStyle}
              aria-label="Learn more"
              onClick={setSimulation}
            >
              <img
                src="/assets/dogLeash.svg"
                alt="Learn"
                style={iconStyle}
              />
              <span style={labelStyle}>Learn</span>
            </button>
            <button
              className="btn btn-link p-0 d-flex flex-column align-items-center"
              style={buttonStyle}
              aria-label="Like"
              onClick={onLike}
            >
              <img
                src="/assets/heart.svg"
                alt="Like"
                style={{
                  ...iconStyle,
                  filter: likeCount > 0 ? "hue-rotate(0deg) saturate(100%) brightness(0.8)" : "grayscale(100%)",
                }}
              />
              <span style={labelStyle}>{likeCount}</span>
            </button>
            <button
              className="btn btn-link p-0 d-flex flex-column align-items-center"
              style={buttonStyle}
              aria-label="Save"
              onClick={onSave}
            >
              <img
                src="/assets/plusMath.svg"
                alt="Save"
                style={iconStyle}
              />
              <span style={labelStyle}>Save</span>
            </button>
          </div>

          <p>Location: {detailsPage.location}</p>
          <p>Distance: {detailsPage.distance}</p>
          <p>Sex: {detailsPage.sex}</p>
          <p>Breed: {detailsPage.breed}</p>
          <p>Weight: {detailsPage.weight}</p>
          <p>Age: {detailsPage.age}</p>
          <p>Adoption Fee: ${detailsPage.adoption_fee}</p>

          <div className="mb-3">
            {detailsPage.personality_traits.map((trait, idx) => (
              <span key={idx} className="badge rounded-pill bg-secondary mx-1">
                {trait}
              </span>
            ))}
          </div>

          <p id={`pet-biography-dp-${rabbitId}`}>
            Biography: {biography || "Loading..."}
          </p>

          <button className="btn btn-primary mt-3" id={`contact-button-${rabbitId}`}>
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
