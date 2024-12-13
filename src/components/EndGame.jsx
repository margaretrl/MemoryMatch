import React from 'react';
import './EndGame.css';

function EndGame({timer, incorrectAttempts, totalPairs, onRestart}) {
    const totalAttempts = incorrectAttempts + totalPairs;
    const accuracy = totalPairs / totalAttempts;

    const perfectMessages = ["Perfect!!", "How Do You Do It?!", "Impeccable!"]
    const goodMessages = ["Excellent Work!", "You're a Memory Master!", "Outstanding!", "Impressive!", "Incredible!"];
    const intermediateMessages = ["Nice Job!", "Good Effort!", "Well Done!", "Pretty Good!"];
    const badMessages = ["Better Luck Next Time!", "Keep Practicing!", "Don't Give Up!"];

    let endMessage;

    // Set endMessage to either perfect/good/intermediate/bad based on accuracy
    if (accuracy == 1) {
        endMessage = perfectMessages[Math.floor(Math.random() * perfectMessages.length)];
    }
    else if (accuracy >= 0.8) {
        endMessage = goodMessages[Math.floor(Math.random() * goodMessages.length)];
    } else if (accuracy >= 0.5) {
        endMessage = intermediateMessages[Math.floor(Math.random() * intermediateMessages.length)];
    } else {
        endMessage = badMessages[Math.floor(Math.random() * badMessages.length)];
    }


    return (
    <>
        <h1>{endMessage}</h1>
        <p>Time: {timer}s</p>
        <p>{incorrectAttempts} incorrect attempts</p>
        <p>Accuracy: {(accuracy * 100).toFixed(2)}%</p>
        <button type='button' onClick={onRestart}>Play Again</button>
    </>
    )
}

export default EndGame;