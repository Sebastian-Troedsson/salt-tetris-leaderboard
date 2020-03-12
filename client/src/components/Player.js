import React from 'react'

export default function Player({ player, position }) {
  return (
    <div className="player-row">
        <div className="player-position">{ position }</div>
        <div className="playerName">{ player.name }</div>
        <div className="playerWon">{ player.won }</div>
        <div className="playerLoss">{ player.loss }</div>
        <div className="player-score">{ player.score }</div>
      </div>
  )
}
