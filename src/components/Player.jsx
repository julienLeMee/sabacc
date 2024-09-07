import React from 'react';

const Player = ({ player, onCardClick, selectedCard }) => {

  return (
    <div className={`player player-${player.id}`}>
      <h3>{player.name}</h3>
      <div className="cards">
        {player.cards.map((card) => (
          <div
            key={card.uniqueId}
            className="card"
            onClick={() => onCardClick(card)}
            style={{
              cursor: 'pointer',
              background: selectedCard && selectedCard.uniqueId === card.uniqueId ? 'tomato' : 'white'
            }}
          >
            <p>{card.name}</p> {/* Afficher le nom de la carte pour vérification */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Player;
