const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
app.use(express.json());
const API = 'https://financialmodelingprep.com/api/v3';
const KEY = process.env.KEY || require('../key.json').KEY;
module.exports = app;

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use('/api', require('./api/income'));
app.use('/api', require('./api/bs'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.get('/api/getTickers', async function (req, res) {
  const data = (await axios.get(`${API}/stock/list?apikey=${KEY}`)).data;
  res.send(data);
});

app.listen(port, () => console.log(`listening on port ${port}`));
