import React from 'react'
import "./Header.css"

function Header( {matches, totalPairs, timer, counter}) {
  return (
    <div class="header">
        <h1 class="bonbon-regular">Memory Match</h1>
        <div class="gameContents">
          <p class="content delius-swash-caps-regular">Matches: { matches } / { totalPairs } </p>
          <p class="content delius-swash-caps-regular"> Time: {timer}s</p>
          <p class="content delius-swash-caps-regular"> Flipped: {counter}</p>
        </div>
    </div>
  )
}

export default Header