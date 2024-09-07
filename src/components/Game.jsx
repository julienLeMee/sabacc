import React, { useState } from 'react';
import Player from './Player';

const Game = () => {
  const [round, setRound] = useState(1);
  const [players, setPlayers] = useState([
    { id: 1, name: 'Joueur 1', isEliminated: false, cards: [] },
    { id: 2, name: 'Adversaire 1', isEliminated: false, cards: [] },
    { id: 3, name: 'Adversaire 2', isEliminated: false, cards: [] },
    { id: 4, name: 'Adversaire 3', isEliminated: false, cards: [] },
  ]);

  const allCards = [
    { id: 1, name: 'As' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
    { id: 7, name: 'Joker' }
  ];

  const shuffleCards = () => {
    // Crée une copie des cartes et mélange-les aléatoirement
    const shuffled = [...allCards].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2); // Retourne 2 cartes pour chaque joueur
  };

  const distributeCards = () => {
    // Répartit des cartes aléatoires pour chaque joueur
    const updatedPlayers = players.map(player => ({
      ...player,
      cards: shuffleCards() // Distribue deux cartes aléatoires à chaque joueur
    }));
    setPlayers(updatedPlayers);
  };

  const playRound = () => {
    distributeCards(); // Distribue des cartes au début de chaque manche
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
