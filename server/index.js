const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
const { PythonShell } = require('python-shell');
app.use(express.json());
const API = 'https://financialmodelingprep.com/api/v3';
const KEY = process.env.KEY || require('../key.json').KEY;
module.exports = app;

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use('/api', require('./api/income'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.get('/api/getTickers', async function (req, res) {
  const data = (await axios.get(`${API}/stock/list?apikey=${KEY}`)).data;
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
