const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/api'));

const port = 5000;

app.listen(port, () => console.log(`Listening on ${port}`));