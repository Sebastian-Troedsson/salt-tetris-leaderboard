import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NewGame from './NewGame';
import PlayerChart from './PlayerChart';
import './PlayerInfo.css';

export default function PlayerInfo(props) {
  const id = props.match.params.id;
  const player = props.players.find(player => player.id === id);
  const position = props.players.indexOf(player);
  const [newGameCard, setNewGameCard] = useState(false);

  const handleClick = () => {
    setNewGameCard(!newGameCard);
  };

  const changeGameCard = () => {
    setNewGameCard(!newGameCard);
  }

  return (
    <div className="player-info">
      {newGameCard ? <NewGame checkForName={props.checkForName} updatePlayer={props.updatePlayer} changeGameCard={changeGameCard} player={player}/> : null}
      <div className="fade-in">
        <h1 className="player-info-name">{player.name}</h1>
        <div className="player-info-stats-container">
          <div className="player-info-stats">
            <ul>
              <li>Current rank: {position + 1}</li>
              <li>Games won: {player.won}</li>
              <li>Games lost: {player.loss}</li>
              <li>Total games played: {player.won + player.loss}</li>
              <li>Nemesis:</li>
              <li>Joined: {player.joined}</li>
            </ul>
          </div>
          <PlayerChart player={player}/>
        </div>
        <div className="buttons">
          <NavLink to="/">Back</NavLink>
          <NavLink to="/" onClick={() => props.removePlayer(id)} className="delete-button">Delete</NavLink>
          <a href="#" onClick={handleClick}>New Game</a>
        </div>
      </div>
    </div>
  )
}
