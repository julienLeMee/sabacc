import React from 'react';
import Cards from './Cards';

const Player = ({ player }) => {
  return (
    <div className="player">
      <h3>{player.name}</h3>
      <p>Status: {player.isEliminated ? 'Eliminé' : 'En jeu'}</p>
      <Cards cards={player.cards} />
    </div>
  );
};

export default Player;
