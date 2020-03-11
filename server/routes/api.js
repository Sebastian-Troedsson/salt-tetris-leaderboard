const express = require('express');
const router = express.Router();
const fs = require('fs');
const util = require('util')

const readFile = util.promisify(fs.readFile);

router.get('/persons', async (req, res) => {
  const persons = JSON.parse(await readFile(`${__dirname}/../db/persons.json`));
  res.send('Hello!');
});

module.exports = router;