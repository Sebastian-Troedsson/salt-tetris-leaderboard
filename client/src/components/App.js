import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Header from './Header';
import PlayerList from './PlayerList';
import PlayerInfo from './PlayerInfo';
import NotFound from './NotFound';
import './App.css';

export default function App() {
  const [players, setPlayers] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/api/players');
      setPlayers(result.data);
    }
    fetchData();
  }, [counter])

  const addPlayer = async (name) => {
    const newPlayer = {
      name,
      won: 0,
      loss: 0,
      score: 0,
      games: [],
      id: uuidv4(),
      joined: new Date().toISOString().split('T')[0]
    };
    await axios.post('http://localhost:5000/api/players', newPlayer);
    setCounter(counter + 1);
  }

  const removePlayer = async (id) => {
    await axios.delete(`http://localhost:5000/api/players/${id}`);
    setCounter(counter + 1);
  };

  const updatePlayer = async (id, game) => {
    await axios.put(`http://localhost:5000/api/players/${id}`, game);
    setCounter(counter + 1);
  }

  const checkForName = (name) => {
    const hit = players.find(player => player.name.toUpperCase() === name.toUpperCase());
    return hit ? true : false;
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header players={players}/>
        <Switch>
          <Route exact path="/" render={() => <PlayerList addPlayer={addPlayer} players={players}/>}/>
          <Route exact path="/player/:id" render={(props) => <PlayerInfo checkForName={checkForName} updatePlayer={updatePlayer} removePlayer={removePlayer} players={players} {...props}/>} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
