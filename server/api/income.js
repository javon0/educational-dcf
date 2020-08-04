const express = require('express');
const router = express.Router();
const axios = require('axios');
const API = 'https://financialmodelingprep.com/api/v3';
const KEY = process.env.KEY || require('../../key.json').KEY;
const { PythonShell } = require('python-shell');
const queryString = require('query-string');
module.exports = router;

const runPython = (data, rates, da) =>
  new Promise((resolve) => {
    const options = {
      mode: 'json',
      encoding: 'utf8',
      pythongOptions: ['-u'],
      scriptPath: 'server/calculation/',
      pythonPath: '/usr/bin/python3',
      args: [data, rates, da],
    };

    return PythonShell.run('projectIncome.py', options, (err, results) => {
      resolve(results);
    });
  });

router.get('/income', async function (req, res) {
  const ticker = req.query.ticker.toUpperCase();
  const py1 = Number(req.query.py1) > -1 ? Number(req.query.py1) : 0.05;
  const py2 = Number(req.query.py2) > -1 ? Number(req.query.py2) : 0.05;
  const py3 = Number(req.query.py3) > -1 ? Number(req.query.py3) : 0.05;
  const py4 = Number(req.query.py4) > -1 ? Number(req.query.py4) : 0.05;
  const py5 = Number(req.query.py5) > -1 ? Number(req.query.py5) : 0.05;
  const rates = [py1, py2, py3, py4, py5];
  const incomeData = (
    await axios.get(`${API}/income-statement/${ticker}?apikey=${KEY}`)
  ).data
    .filter((cur, i) => i < 5)
    .reverse();
  const incomeString = JSON.stringify(incomeData[incomeData.length - 1]);
  const ratesString = JSON.stringify(rates);
  const pythonIncome = await runPython(incomeString, ratesString);
  pythonIncome[0].forEach((py) => incomeData.push(py));
  res.send(incomeData);
});

router.post('/income', async function (req, res) {
  const ticker = req.query.ticker.toUpperCase();
  const py1 = Number(req.query.py1);
  const py2 = Number(req.query.py2);
  const py3 = Number(req.query.py3);
  const py4 = Number(req.query.py4);
  const py5 = Number(req.query.py5);
  const da = queryString.parse(req.query.da);
  console.log('here,', da);
  const rates = [py1, py2, py3, py4, py5];
  const incomeData = (
    await axios.get(`${API}/income-statement/${ticker}?apikey=${KEY}`)
  ).data
    .filter((cur, i) => i < 5)
    .reverse();
  const incomeString = JSON.stringify(incomeData[incomeData.length - 1]);
  const ratesString = JSON.stringify(rates);
  const daString = JSON.stringify(da);
  const pythonIncome = await runPython(incomeString, ratesString, daString);
  pythonIncome[0].forEach((py) => incomeData.push(py));
  res.send(incomeData);
});
