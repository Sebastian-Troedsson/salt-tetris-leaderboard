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
      <h3 className="form-title">Add new game</h3>
      {wrongInput ? <p>There is no player with this name</p> : null}
      <form onSubmit={handleSubmit}>  
        <label for="opponent">
          <h4>Who was your opponent?</h4>
          <input type="text" id="opponent" value={inputValue} onChange={handleChange}/>
        </label>
          <h4>Did you win?</h4>
          <div className="radio">
            <input type="radio" name="outcome" required onChange={() => setWin(true)}/>
            <p>Yes</p>
          </div>
          <div className="radio">
            <input type="radio" name="outcome" required onChange={() => setWin(false)}/>
            <p>No</p>
          </div>
          <input type="submit" value="Add" />
          <button onClick={() => changeGameCard()}>Cancel</button>
      </form>

    </div>
  )
}

export default withRouter(NewGame);
