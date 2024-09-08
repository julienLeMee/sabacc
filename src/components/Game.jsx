import React, { useState, useEffect } from 'react';
import Player from './Player';

const Game = () => {
  const baseCards = [
    { id: 1, name: '1', type: 'red' },
    { id: 2, name: '2', type: 'gold' },
    { id: 3, name: '3', type: 'red' },
    { id: 4, name: '4', type: 'gold' },
    { id: 5, name: '5', type: 'red' },
    { id: 6, name: '6', type: 'gold' },
    { id: 7, name: '*', type: 'red' },
    { id: 8, name: '#', type: 'gold' }
  ];

  const allCards = baseCards.flatMap(card => [
    { ...card, uniqueId: card.id + '-1' },
    { ...card, uniqueId: card.id + '-2' },
    { ...card, uniqueId: card.id + '-3' }
  ]);

  const shuffleCards = (cards) => [...cards].sort(() => 0.5 - Math.random());

  const [deck, setDeck] = useState(shuffleCards(allCards));
  const [round, setRound] = useState(1);
  const [turn, setTurn] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [piocheCards, setPiocheCards] = useState([]);
  const [deckRemaining, setDeckRemaining] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const initialDeck = shuffleCards(allCards);

    // Distribuer une carte de chaque type (red et gold) à chaque joueur
    const distributeCards = (cards) => {
      const playersSetup = [];
      for (let i = 0; i < 4; i++) {
        const redCard = cards.find(card => card.type === 'red');
        const goldCard = cards.find(card => card.type === 'gold');

        playersSetup.push({
          id: i + 1,
          name: i === 0 ? 'Joueur 1' : `Adv. ${i}`,
          isEliminated: false,
          cards: [redCard, goldCard],
          canPlay: i === 0
        });

        // Retirer les cartes distribuées du deck
        cards = cards.filter(card => card !== redCard && card !== goldCard);
      }
      return { players: playersSetup, remainingDeck: cards };
    };

    const { players: initialPlayers, remainingDeck } = distributeCards(initialDeck);

    setPlayers(initialPlayers);
    setDeckRemaining(remainingDeck.slice(8)); // Pioche restante après la distribution

    // Pioche de 2 cartes pour remplacer
    setPiocheCards(remainingDeck.slice(0, 2));
  }, []);

  const nextTurn = () => {
    setCurrentPlayer((currentPlayer + 1) % players.length);
  };

  const passTurn = () => {
    nextTurn(); // Passer au joueur suivant sans action
  };

  const drawAndReplaceCard = (index) => {
    if (!selectedCard) return;

    const newPlayers = players.map((player) => {
      if (player.id === players[currentPlayer].id) {
        const newCards = player.cards.map((card) =>
          card.uniqueId === selectedCard.uniqueId ? piocheCards[index] : card
        );
        return { ...player, cards: newCards };
      }
      return player;
    });

    setPlayers(newPlayers);
    setSelectedCard(null);

    const newPiocheCards = deckRemaining.slice(0, 2);
    setPiocheCards(newPiocheCards);
    setDeckRemaining(deckRemaining.slice(2));

    nextTurn();
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
              onClick={() => selectedCard && drawAndReplaceCard(index)}
              style={{
                cursor: 'pointer',
                border: selectedCard && selectedCard.uniqueId === card.uniqueId ? '2px solid red' : '1px solid black'
              }}
            >
              <p>{card.name}</p> {/* Afficher le nom et le type de la carte */}
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
              onCardClick={(card) => player.canPlay && setSelectedCard(card)} // Seul le joueur actif peut cliquer
              selectedCard={selectedCard}
              passTurn={passTurn} // Ajouter la fonction pour passer le tour
            />
          )
        ))}
      </div>

      <p>{`C'est le tour de ${players[currentPlayer]?.name}`}</p>
    </div>
  );
};

export default Game;
