import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './NewGame.css';

function NewGame({ player, history, changeGameCard, updatePlayer, checkForName }) {

  const [win, setWin] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [wrongInput, setWrongInput] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const game = { 
      opponent: inputValue,
      win
    }
    if(checkForName(game.opponent)) {
      updatePlayer(player.id, game);
      history.push('/');
    } else {
      setWrongInput(true);
      setTimeout(() => {
        setWrongInput(false);
      }, 2000)
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="new-game fade-in">
      <p>{player.name}</p>
      {wrongInput ? <p>There is no player with this name</p> : null}
      <form onSubmit={handleSubmit}>  
        <label for="opponent">
          Who was your opponent
          <input type="text" id="opponent" value={inputValue} onChange={handleChange}/>
        </label>
          Did you win?
          Yes <input type="radio" name="outcome" onChange={() => setWin(true)}/>
          No <input type="radio" name="outcome" onChange={() => setWin(false)}/>
          <input type="submit" value="submit" />
          <button onClick={() => changeGameCard()}>Back</button>
      </form>

    </div>
  )
}

export default withRouter(NewGame);
