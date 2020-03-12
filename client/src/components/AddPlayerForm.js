import React, { useState } from 'react';
import './AddPlayerForm.css';

export default function AddPlayerForm({ addPlayer }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue !== '') {
      addPlayer(inputValue);
      setInputValue('');
    }
  }

  const handleClick = () => {
    if (inputValue !== '') {
      addPlayer(inputValue);
      setInputValue('');
    }
  }

  return (
    <div className="add-player-form">
      <input 
        className="add-player-input" 
        type="text" placeholder="Add player..." 
        value={inputValue} 
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        />
      <button className="add-player-button" onClick={handleClick}>Add</button>
    </div>
  )
}
