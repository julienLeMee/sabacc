import React from 'react';

const Player = ({ player, onCardClick, selectedCard, passTurn }) => {
  return (
    <div className={`player player-${player.id}`}>
      <h3>{player.name}</h3>
      <button className='pass-button' onClick={passTurn}>Passer</button> {/* Bouton Passer */}
      <div className="cards">
        {player.cards.map((card) => (
          <div
            key={card.uniqueId}
            className={`card ${card.type}`}
            onClick={() => onCardClick(card)}
            style={{
              cursor: 'pointer',
              background: selectedCard && selectedCard.uniqueId === card.uniqueId ? 'tomato' : '',
              border: card.type === 'red' ? '2px solid tomato' : '2px solid gold' // Border en fonction du type
            }}
          >
            <p>{card.name}</p> {/* Afficher le nom et le type */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Player;
