import React from 'react'
import './RestartGame.css'

function RestartGame() {
  return (
    <button class="delius-swash-caps-regular" onClick={restart}>Restart Game</button>
  )
}

function restart() {
    window.location.reload()
}

export default RestartGame