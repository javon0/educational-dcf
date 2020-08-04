const express = require('express');
const router = express.Router();
const axios = require('axios');
const API = 'https://financialmodelingprep.com/api/v3';
const KEY = process.env.KEY || require('../../key.json').KEY;
const { PythonShell } = require('python-shell');
module.exports = router;

const runPython = (data, rates) =>
  new Promise((resolve) => {
    const options = {
      mode: 'json',
      encoding: 'utf8',
      pythongOptions: ['-u'],
      scriptPath: 'server/calculation/',
      pythonPath: '/usr/bin/python3',
      args: [data, rates],
    };

    return PythonShell.run('projectIncome.py', options, (err, results) => {
      resolve(results);
    });
  });

router.get('/bs', async function (req, res) {
  const ticker = req.query.ticker.toUpperCase();
  const py1 = Number(req.query.py1) > -1 ? Number(req.query.py1) : 0.05;
  const py2 = Number(req.query.py2) > -1 ? Number(req.query.py2) : 0.05;
  const py3 = Number(req.query.py3) > -1 ? Number(req.query.py3) : 0.05;
  const py4 = Number(req.query.py4) > -1 ? Number(req.query.py4) : 0.05;
  const py5 = Number(req.query.py5) > -1 ? Number(req.query.py5) : 0.05;
  const rates = [py1, py2, py3, py4, py5];
  const bsData = (
    await axios.get(`${API}/balance-sheet-statement/${ticker}?apikey=${KEY}`)
  ).data
    .filter((cur, i) => i < 5)
    .reverse();
  //   const incomeString = JSON.stringify(incomeData[incomeData.length - 1]);
  //   const ratesString = JSON.stringify(rates);
  //   const pythonIncome = await runPython(incomeString, ratesString);
  //   pythonIncome[0].forEach((py) => incomeData.push(py));
  res.send(bsData);
});
