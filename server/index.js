const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
const { spawn } = require('child_process');
const { PythonShell } = require('python-shell');
app.use(express.json());
const API = 'https://financialmodelingprep.com/api/v3';
const { KEY } = process.env.KEY || require('../key.json');

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.get('/api/income', async function (req, res) {
  const ticker = req.query.ticker.toUpperCase();
  const data = (
    await axios.get(`${API}/income-statement/${ticker}?apikey=${KEY}`)
  ).data;
  res.send(data);
});

app.get('/api/run', function (req, res) {
  const options = {
    mode: 'text',
    args: ['aapl'],
  };
  const data = PythonShell.run('server/calculation/dcf.py', options, function (
    err,
    results
  ) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    res.send(results);
  });
});

app.listen(port, () => console.log(`listening on port ${port}`));
