import React from 'react';

const Cards = ({ cards }) => {
  return (
    <div className="cards">
      {cards.map((card) => (
        <div key={card.id}>
          <p>{card.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
