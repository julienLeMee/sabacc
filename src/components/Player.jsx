import React from 'react';

const Player = ({ player }) => {
  return (
    <div className="player">
      <h3>{player.name}</h3>
      <p>Status: {player.isEliminated ? 'Eliminé' : 'En jeu'}</p>
    </div>
  );
};

export default Player;
