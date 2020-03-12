const express = require('express');
const router = express.Router();
const fs = require('fs');
const util = require('util')

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

router.get('/players', async (req, res) => {
  const players = JSON.parse(await readFile(`${__dirname}/../db/players.json`));
  players.forEach((player) => {
    player.games.forEach(game => {
      if (game.win) {
        player.won = player.won + 1;
      }
      if (!game.win) {
        player.loss = player.loss + 1;
      }
    })
    player.score = player.won - player.loss;
  })

  players.sort((a, b) => {
    if(a.score < b.score) {
      return 1;
    }
    if(a.score > b.score) {
      return -1;
    }
    return 0;
  })
  res.json(players);
});

router.post('/players', async (req, res) => {
  const players = JSON.parse(await readFile(`${__dirname}/../db/players.json`));
  players.push(req.body); 
  await writeFile(`${__dirname}/../db/players.json`, JSON.stringify(players));
  res.status(201).end();
});

router.delete('/players/:id', async (req, res) => {
  const id = req.params.id;
  const players = JSON.parse(await readFile(`${__dirname}/../db/players.json`));
  const newPlayers = players.filter(player => player.id !== id);
  await writeFile(`${__dirname}/../db/players.json`, JSON.stringify(newPlayers));
  res.end();
});

router.put('/players/:id', async (req, res) => {
  const id = req.params.id;
  const opponent = req.body.opponent;

  const players = JSON.parse(await readFile(`${__dirname}/../db/players.json`));
  const user = players.find(player => player.id === id);
  players.forEach((player, index) => {
    if (player.id === id) {
      players[index].games.push(req.body);
    } 
    if (player.name === opponent) {
      players[index].games.push({ 
        opponent: user.name,
        win: !req.body.win
      })
    }
  });
  await writeFile(`${__dirname}/../db/players.json`, JSON.stringify(players));
  res.end();
});

module.exports = router;