import React, { useState, useEffect } from 'react';
import Player from './Player';

const Game = () => {
  const baseCards = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
    { id: 7, name: '*' },
    { id: 8, name: '#' }
  ];

  // Duplicating each card 3 times
  const allCards = baseCards.flatMap(card => [
    { ...card, uniqueId: card.id + '-1' },
    { ...card, uniqueId: card.id + '-2' },
    { ...card, uniqueId: card.id + '-3' }
  ]);

  // Fonction pour mélanger les cartes
  const shuffleCards = (cards) => [...cards].sort(() => 0.5 - Math.random());

  const [deck, setDeck] = useState(shuffleCards(allCards));
  const [round, setRound] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [piocheCards, setPiocheCards] = useState([]);
  const [deckRemaining, setDeckRemaining] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Initial setup after the first render
    const initialDeck = shuffleCards(allCards);
    setDeck(initialDeck);

    // Pioche et deck restants
    const initialPioche = initialDeck.slice(0, 2);
    const remainingDeck = initialDeck.slice(2);

    setPiocheCards(initialPioche);
    setDeckRemaining(remainingDeck);

    // Distribuer 2 cartes à chaque joueur
    const initialPlayers = [
      { id: 1, name: 'Joueur 1', isEliminated: false, cards: remainingDeck.slice(0, 2) },
      { id: 2, name: 'Adversaire 1', isEliminated: false, cards: remainingDeck.slice(2, 4) },
      { id: 3, name: 'Adversaire 2', isEliminated: false, cards: remainingDeck.slice(4, 6) },
      { id: 4, name: 'Adversaire 3', isEliminated: false, cards: remainingDeck.slice(6, 8) }
    ];

    setPlayers(initialPlayers);
    setDeckRemaining(remainingDeck.slice(8)); // Mettre à jour le deck restant après distribution
  }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une seule fois

  const drawAndReplaceCard = (index) => {
    if (!selectedCard) return;

    // Remplacement de la carte sélectionnée par une carte de la pioche
    const newPlayers = players.map((player) => {
      if (player.id === players[currentPlayer].id) {
        const newCards = player.cards.map((card) =>
          card.uniqueId === selectedCard.uniqueId ? piocheCards[index] : card
        );
        return { ...player, cards: newCards };
      }
      return player;
    });

    // Mise à jour des états
    setPlayers(newPlayers);
    setSelectedCard(null); // Réinitialiser la carte sélectionnée

    // Mettre à jour la pioche avec deux nouvelles cartes
    const newPiocheCards = deckRemaining.slice(0, 2);
    setPiocheCards(newPiocheCards);
    setDeckRemaining(deckRemaining.slice(2));

    // Passer au joueur suivant
    setCurrentPlayer((currentPlayer + 1) % players.length);
    setRound(round + 1);
  };

  return (
    <div>
      <h1>Manche {round}</h1>

      <div className="pioche">
        <h3>Pioche</h3>
        <div className="pioche-cards">
          {piocheCards.map((card, index) => (
            <div
              key={card.uniqueId}
              className="pioche-card"
              onClick={() => drawAndReplaceCard(index)}
              style={{ cursor: 'pointer', border: selectedCard && selectedCard.uniqueId === card.uniqueId ? '2px solid red' : '1px solid black' }}
            >
              <p>{card.name}</p> {/* Afficher le nom de la carte pour vérification */}
            </div>
          ))}
        </div>
      </div>

      <div className="players">
        {players.map((player) => (
          !player.isEliminated && (
            <Player
              key={player.id}
              player={player}
              onCardClick={(card) => setSelectedCard(card)} // Sélectionner une carte à remplacer
              selectedCard={selectedCard}
            />
          )
        ))}
      </div>

      <p>{`C'est le tour de ${players[currentPlayer]?.name}`}</p>
    </div>
  );
};

export default Game;
