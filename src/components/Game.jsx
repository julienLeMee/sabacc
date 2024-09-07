import React, { useState } from 'react';
import Player from './Player';

const Game = () => {
  const allCards = [
    { id: 1, name: 'As' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
    { id: 7, name: 'Joker' }
  ];

  // Fonction pour mélanger les cartes
  const shuffleCards = (cards) => {
    return [...cards].sort(() => 0.5 - Math.random());
  };

  // Mélanger les cartes au début
  const [deck, setDeck] = useState(shuffleCards(allCards));
  const [round, setRound] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(0); // Joueur actuel qui doit jouer
  const [selectedCard, setSelectedCard] = useState(null); // Carte sélectionnée pour le remplacement
  const [piocheCard, setPiocheCard] = useState(deck[0]); // Carte visible de la pioche

  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'Joueur 1',
      isEliminated: false,
      cards: deck.slice(1, 3) // Distribuer 2 cartes au début
    },
    {
      id: 2,
      name: 'Adversaire 1',
      isEliminated: false,
      cards: deck.slice(3, 5)
    },
    {
      id: 3,
      name: 'Adversaire 2',
      isEliminated: false,
      cards: deck.slice(5, 7)
    },
    {
      id: 4,
      name: 'Adversaire 3',
      isEliminated: false,
      cards: deck.slice(7, 9)
    }
  ]);

  // Fonction pour choisir une carte à remplacer
  const chooseCardToReplace = (card, playerId) => {
    if (playerId === players[currentPlayer].id) {
      setSelectedCard(card); // Sélectionner la carte à remplacer
    }
  };

  // Fonction pour piocher et remplacer une carte
  const drawAndReplaceCard = () => {
    if (!selectedCard) return;

    // Mise à jour des cartes du joueur
    const newPlayers = players.map((player) => {
      if (player.id === players[currentPlayer].id) {
        const newCards = player.cards.map((card) =>
          card.id === selectedCard.id ? piocheCard : card
        );
        return { ...player, cards: newCards };
      }
      return player;
    });

    // Mettre à jour les joueurs et passer au joueur suivant
    setPlayers(newPlayers);
    setSelectedCard(null); // Réinitialiser la sélection
    setPiocheCard(deck[1]); // Mettre à jour la pioche avec une nouvelle carte
    setDeck(deck.slice(1)); // Retirer la carte piochée du deck
    setCurrentPlayer((currentPlayer + 1) % players.length); // Passer au joueur suivant
    setRound(round + 1); // Incrémenter la manche
  };

  return (
    <div>
      <h1>Manche {round}</h1>
      <div className="pioche">
        <h2>Pioche</h2>
        <div className="card" onClick={drawAndReplaceCard}>
          {piocheCard.name}
        </div>
      </div>

      <div className="players">
        {players.map((player) => (
          !player.isEliminated && (
            <Player
              key={player.id}
              player={player}
              onCardClick={(card) => chooseCardToReplace(card, player.id)}
            />
          )
        ))}
      </div>

      <p>{`C'est le tour de ${players[currentPlayer].name}`}</p>
    </div>
  );
};

export default Game;
