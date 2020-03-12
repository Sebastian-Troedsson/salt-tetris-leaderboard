import React from 'react'
import HeaderStats from './HeaderStats';
import './Header.css';

export default function Header({ players }) {
  return (
    <header className="header">
      <div className="header-title">
        <h2>&lt;/SALT&gt; Tetris Leaderboard</h2>
      </div>
      <HeaderStats players={players}/>
    </header>
  )
}
