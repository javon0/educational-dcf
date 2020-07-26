import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

const classes = makeStyles((theme) => ({
  table: {
    maxWidth: 5,
  },
}));

interface Props {
  incomeS: Income[];
}

interface Income {
  date: string;
  operatingIncome: number;
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  operatingExpenses: number;
}

const divide = 1000000;

const IncomeStatement: React.FC<Props> = ({ incomeS }) => {
  const [growth1, setGrowth1] = useState<number>(0);
  const [growth2, setGrowth2] = useState<number>(0);
  const [growth3, setGrowth3] = useState<number>(0);
  const [growth4, setGrowth4] = useState<number>(0);
  const [growth5, setGrowth5] = useState<number>(0);

  const pyYearStart =
    incomeS[incomeS.length - 1] &&
    Number(incomeS[incomeS.length - 1].date.substring(0, 4)) + 1;
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
          <TableCell>{pyYearStart}</TableCell>
          <TableCell>{pyYearStart + 1}</TableCell>
          <TableCell>{pyYearStart + 2}</TableCell>
          <TableCell>{pyYearStart + 3}</TableCell>
          <TableCell>{pyYearStart + 4}</TableCell>
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
export default connect(mapStateToProps)(IncomeStatement);
