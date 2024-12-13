import React, { useState, useEffect } from "react";
import Card from "./Card";
import Header from "./Header";
import RestartGame from "./RestartGame";
import EndGame from "./EndGame"; // New EndGame component
import "./GameBoard.css";

function GameBoard() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0); // Track incorrect attempts
  const [gameOver, setGameOver] = useState(false); // Track game state

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    let timerInterval;
    if (isGameRunning) {
      timerInterval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [isGameRunning]);

  useEffect(() => {
    if (matches === cards.length / 2 && cards.length > 0) {
      setIsGameRunning(false);
      setGameOver(true); // End the game
    }
  }, [matches, cards]);

  const initGame = () => {
    const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
    const cards = [];
    for (let i = 0; i < emojis.length; i++) {
      cards.push({ id: i * 2, value: emojis[i], flipped: false, matched: false });
      cards.push({ id: i * 2 + 1, value: emojis[i], flipped: false, matched: false });
    }

    cards.sort(() => Math.random() - 0.5);

    const revealedCards = cards.map((card) => ({ ...card, flipped: true }));
    setCards(revealedCards);

    setTimeout(() => {
      const hiddenCards = revealedCards.map((card) => ({ ...card, flipped: false }));
      setCards(hiddenCards);
      setIsGameRunning(true);
      setTimer(0);
    }, 2000);

    setMatches(0);
    setIncorrectAttempts(0); // Reset incorrect attempts
    setGameOver(false); // Reset game state
  };

  const handleCardClick = (id) => {
    const updatedCards = [...cards];
    for (let i = 0; i < updatedCards.length; i++) {
      if (updatedCards[i].id === id) {
        updatedCards[i] = { ...updatedCards[i], flipped: true };
        break;
      }
    }

    setCards(updatedCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

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
      setIncorrectAttempts((prev) => prev + 1); // Increment incorrect attempts
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

  if (gameOver) {
    return (
      <EndGame
        timer={timer}
        incorrectAttempts={incorrectAttempts}
        totalPairs={cards.length / 2}
        onRestart={initGame}
      />
    );
  }

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
      <RestartGame onRestart={initGame} />
    </>
  );
}

export default GameBoard;
