import React from "react";
import "./Card.css";

const Card = ({ card, handleClick }) => {
  let cardContent;

  if (card.flipped || card.matched) {
    cardContent = <div className="card-front">{card.value}</div>;
  } else {
    cardContent = <div className="card-back">?</div>;
  }

  return (
    <div
      className={`card ${card.flipped ? "flipped" : ""}`}
      onClick={handleClick}
    >
      {cardContent}
    </div>
  );
};

export default Card;
