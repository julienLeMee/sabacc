import React from 'react';

const Player = ({ player, onCardClick }) => {
  return (
    <div className="player">
      <h3>{player.name}</h3>
      <p>Status: {player.isEliminated ? 'Eliminé' : 'En jeu'}</p>
      <div className="cards">
        {player.cards.map((card) => (
          <div
            key={card.id}
            className="card"
            onClick={() => onCardClick(card)}
          >
            {card.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Player;
