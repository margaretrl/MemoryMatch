import React, { useState, useEffect } from "react";
import Card from "./Card";
import Header from "./Header";
import RestartGame from "./RestartGame";
import "./GameBoard.css";

function GameBoard() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [timer, setTimer] = useState(0); // Timer state
  const [isGameRunning, setIsGameRunning] = useState(false); // Game running state

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    let timerInterval;
    if (isGameRunning) {
      // Start the timer when the game is running
      timerInterval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      // Clear the timer when the game is stopped
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval); // Cleanup
  }, [isGameRunning]);

  useEffect(() => {
    // Stop the timer if all matches are found
    if (matches === cards.length / 2 && cards.length > 0) {
      setIsGameRunning(false);
    }
  }, [matches, cards]);

  const initGame = () => {
    const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
    const cards = [];
    for (let i = 0; i < emojis.length; i++) {
      // Add two copies of each card
      cards.push({ id: i * 2, value: emojis[i], flipped: false, matched: false });
      cards.push({ id: i * 2 + 1, value: emojis[i], flipped: false, matched: false });
    }

    // Shuffle cards
    cards.sort(() => Math.random() - 0.5);

    // Temporarily reveal all cards
    const revealedCards = cards.map((card) => ({ ...card, flipped: true }));
    setCards(revealedCards);

    // Flip cards back after 2 seconds
    setTimeout(() => {
      const hiddenCards = revealedCards.map((card) => ({ ...card, flipped: false }));
      setCards(hiddenCards);
      setIsGameRunning(true); // Start the game
      setTimer(0); // Reset the timer
    }, 2000);

    setMatches(0);
  };

  const handleCardClick = (id) => {
    const updatedCards = [...cards];

    // Iterate over cards to find matching
    for (let i = 0; i < updatedCards.length; i++) {
      if (updatedCards[i].id === id) {
        updatedCards[i] = { ...updatedCards[i], flipped: true };
        break;
      }
    }

    setCards(updatedCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      checkMatch(newFlippedCards);
    }
  };

  const checkMatch = ([firstId, secondId]) => {
    const [firstCard, secondCard] = cards.filter(
      (card) => card.id === firstId || card.id === secondId
    );

    if (firstCard.value === secondCard.value) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === firstId || card.id === secondId
            ? { ...card, matched: true }
            : card
        )
      );
      setMatches((prev) => prev + 1);
    } else {
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, flipped: false }
              : card
          )
        );
      }, 1000);
    }
    setFlippedCards([]);
  };

  return (
    <>
      <Header matches={matches} totalPairs={cards.length / 2} timer={timer} />
      <div className="game-board">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleClick={() =>
              !card.flipped && !card.matched && handleCardClick(card.id)
            }
          />
        ))}
      </div>
      <RestartGame />
    </>
  );
}

export default GameBoard;
