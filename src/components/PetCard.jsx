import React from "react";

const PetCard = ({ rabbit, onClick }) => {
  const cardPage = rabbit.card_page;
  const rabbitId = cardPage.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div
      id={`${rabbitId}-button`}
      className="card mb-3"
      role="button"
      tabIndex={0}
      onClick={() => onClick(rabbit)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick(rabbit);
      }}
    >
      <div className="row g-0 align-items-center">
        <div className="col-md-4 text-center">
          <img
            src={cardPage.image}
            className="img-fluid rounded-start mt-4"
            alt={cardPage.name}
          />
        </div>
        <div className="col-md-8 d-flex flex-column justify-content-center">
          <div className="card-body text-center">
            <h2 className="card-title">Name: {cardPage.name}</h2>
            <p>Sex: {cardPage.sex}</p>
            <p>Breed: {cardPage.breed}</p>
            <p>Age: {cardPage.age}</p>
            <p>Adoption Fee: ${cardPage.adoption_fee}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;