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

  const findNemesis = () => {
    if (player.games.length === 0) {
      return 'No games played';
    }
    const names = player.games.filter(game => !game.win).map(loss => loss.opponent);
    let mf = 1;
    let m = 0;
    let item;

    for (let i = 0; i < names.length; i++) {
      for (let j = i; j < names.length; j++) {
        if (names[i] === names[j]) {
          m++;
        }
        if (mf < m) {
          mf = m;
          item = names[i];
        }
      }
      m = 0;
    }

    return item || 'Undefeated';
  }

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
        <div className="buttons delete-button">
          <NavLink to="/" onClick={() => props.removePlayer(id)} className="delete-button">Delete</NavLink>
        </div>
        <div className="player-info-title">
          <h1 className="player-info-name">{player.name}</h1>
          <h2>Score Progression</h2>
        </div>
        <div className="player-info-stats-container">
          <div className="player-info-stats">
            <ul>
              <li>Current rank: {position + 1}</li>
              <li>Games won: {player.won}</li>
              <li>Games lost: {player.loss}</li>
              <li>Total games played: {player.won + player.loss}</li>
              <li>Nemesis: {findNemesis()}</li>
              <li>Joined: {player.joined}</li>
            </ul>
          </div>
          <PlayerChart player={player}/>
        </div>
        <div className="buttons margin">
          <NavLink to="/">Back</NavLink>
          <a href="#" onClick={handleClick}>New Game</a>
        </div>
      </div>
    </div>
  )
}
