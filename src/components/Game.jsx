import React, { useState } from 'react';
import Player from './Player';

const Game = () => {
  const [round, setRound] = useState(1);
  const [players, setPlayers] = useState([
    { id: 1, name: 'Joueur 1', isEliminated: false },
    { id: 2, name: 'Adversaire 1', isEliminated: false },
    { id: 3, name: 'Adversaire 2', isEliminated: false },
    { id: 4, name: 'Adversaire 3', isEliminated: false },
  ]);

  const playRound = () => {
    setRound(round + 1);
  };

  return (
    <div>
      <h1>Manche {round}</h1>
      <div className="players">
        {players.map((player) => (
          !player.isEliminated && <Player key={player.id} player={player} />
        ))}
      </div>
      <button onClick={playRound}>Jouer la manche</button>
    </div>
  );
};

export default Game;
