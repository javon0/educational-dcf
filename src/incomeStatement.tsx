import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { formatMoney } from 'accounting';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { readIncome } from './store/index';

const classes = makeStyles((theme) => ({
  table: {
    maxWidth: 5,
  },
}));

interface Props {
  incomeS: Income[];
  loadTicker: Function;
}

interface Income {
  date: string;
  operatingIncome: number;
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  operatingExpenses: number;
  symbol: string;
  growth_rate: number;
  depreciationAndAmortization: number;
}

interface DA {
  da1: number;
  da2: number;
  da3: number;
  da4: number;
  da5: number;
}

const initialDa = {
  da1: 5,
  da2: 5,
  da3: 5,
  da4: 5,
  da5: 5,
};
const divide = 1000000;

const IncomeStatement: React.FC<Props> = ({ incomeS, loadTicker }) => {
  const [growth1, setGrowth1] = useState<number>(5);
  const [growth2, setGrowth2] = useState<number>(5);
  const [growth3, setGrowth3] = useState<number>(5);
  const [growth4, setGrowth4] = useState<number>(5);
  const [growth5, setGrowth5] = useState<number>(5);
  const [da, setDa] = useState<DA>(initialDa);
  console.log(da);
  const ticker = incomeS.length && incomeS[0].symbol;

  useEffect(() => {
    if (incomeS.length) {
      loadTicker(
        ticker,
        growth1 / 100,
        growth2 / 100,
        growth3 / 100,
        growth4 / 100,
        growth5 / 100,
        da
      );
    }
  }, [growth1, growth2, growth3, growth4, growth5, da]);
  incomeS.length && console.log(growth1, incomeS[5].growth_rate);

  return incomeS.length ? (
    <Table id="income">
      <TableHead>
        <TableRow>
          <TableCell>Income Statement</TableCell>
          {incomeS.map((cur) => (
            <TableCell key={cur.date}>
              {cur && cur.date.substring(0, 4)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow key={'inputRate'}>
          <TableCell>growth rate %</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>
            <input
              id="year1Input"
              onChange={(ev) => setGrowth1(Number(ev.target.value))}
              type="number"
              value={growth1}
            ></input>
          </TableCell>
          <TableCell>
            <input
              id="year2Input"
              onChange={(ev) => setGrowth2(Number(ev.target.value))}
              type="number"
              value={growth2}
            ></input>
          </TableCell>
          <TableCell>
            <input
              id="year3Input"
              onChange={(ev) => setGrowth3(Number(ev.target.value))}
              type="number"
              value={growth3}
            ></input>
          </TableCell>
          <TableCell>
            <input
              id="year4Input"
              onChange={(ev) => setGrowth4(Number(ev.target.value))}
              type="number"
              value={growth4}
            ></input>
          </TableCell>
          <TableCell>
            <input
              id="year5Input"
              onChange={(ev) => setGrowth5(Number(ev.target.value))}
              type="number"
              value={growth5}
            ></input>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Revenue</TableCell>
          {incomeS.map((cur) => (
            <TableCell key={cur.date}>
              {cur && formatMoney(cur.revenue / divide, '$', 0)}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>COGS</TableCell>
          {incomeS.map((cur) => (
            <TableCell key={cur.date}>
              {cur && formatMoney(cur.costOfRevenue / divide, '$', 0)}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Gross Margin</TableCell>
          {incomeS.map((cur) => (
            <TableCell key={cur.date}>
              {cur && formatMoney(cur.grossProfit / divide, '$', 0)}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Dep and AM %</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>
            <input
              id="year1Da"
              onChange={(ev) => setDa({ ...da, da1: Number(ev.target.value) })}
              type="number"
              value={da.da1}
            ></input>
          </TableCell>
          <TableCell>
            <input
              id="yearDa"
              onChange={(ev) => setDa({ ...da, da2: Number(ev.target.value) })}
              type="number"
              value={da.da2}
            ></input>
          </TableCell>
          <TableCell>
            <input
              id="year3Da"
              onChange={(ev) => setDa({ ...da, da3: Number(ev.target.value) })}
              type="number"
              value={da.da3}
            ></input>
          </TableCell>
          <TableCell>
            <input
              id="year4Da"
              onChange={(ev) => setDa({ ...da, da4: Number(ev.target.value) })}
              type="number"
              value={da.da4}
            ></input>
          </TableCell>
          <TableCell>
            <input
              id="year5Da"
              onChange={(ev) => setDa({ ...da, da5: Number(ev.target.value) })}
              type="number"
              value={da.da5}
            ></input>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Dep and Am</TableCell>
          {incomeS.map((cur) => (
            <TableCell key={cur.date}>
              {cur &&
                formatMoney(cur.depreciationAndAmortization / divide, '$', 0)}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Operating Expenses</TableCell>
          {incomeS.map((cur) => (
            <TableCell key={cur.date}>
              {cur && formatMoney(cur.operatingExpenses / divide, '$', 0)}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>EBIT</TableCell>
          {incomeS.map((cur) => (
            <TableCell key={cur.date}>
              {cur && formatMoney(cur.operatingIncome / divide, '$', 0)}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  ) : (
    <div></div>
  );
};

const mapStateToProps = ({ incomeS }: any) => ({
  incomeS,
});

const mapDispatchToProps = (dispatch: Function) => ({
  loadTicker: (
    ticker: string,
    py1: number,
    py2: number,
    py3: number,
    py4: number,
    py5: number,
    da: DA
  ) => {
    dispatch(readIncome(ticker, py1, py2, py3, py4, py5, da));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(IncomeStatement);
