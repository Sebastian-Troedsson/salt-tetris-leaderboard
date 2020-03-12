import React from 'react'

export default function HeaderStats({ players }) {
  const leading = players.length !== 0 ? `${players[0].name} is leading!` : null;
  const amountOfPlayers = players.length !== 0 ? `Currently ${players.length} people playing` : null;
  return (
    <div className="header-stats">
      <ul>
        <li>
          {amountOfPlayers}
        </li>
        <li>
          {leading}
        </li>
      </ul>
    </div>
  )
}
