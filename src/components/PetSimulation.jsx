import React from "react";

const PetSimulation = ({ rabbit, biography, customBlurb }) => {
	console.log(rabbit);
	return (
		<div>{rabbit.card_page.name}</div>
	)
}

export default PetSimulation;