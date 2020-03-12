import React from 'react';
import Player from './Player';
import { NavLink } from 'react-router-dom';
import './PlayerList.css';
import AddPlayerForm from './AddPlayerForm';

export default function PlayerList({ players, addPlayer }) {
  return (
    <>
      <div className="player-row dark player-list-header">
        <div className="player-position">Pos.</div>
        <div className="playerName">Players</div>
        <div className="playerWon">Won</div>
        <div className="playerLoss">Loss</div>
        <div className="playerscore">Score</div>
      </div>
      <div className="playerList">
        {players.map((player, index) => <NavLink to={`/player/${player.id}`}><Player key={index} position={index + 1} player={player}/></NavLink>)}
      </div>
      <AddPlayerForm addPlayer={addPlayer}/>
    </>
  )
}
