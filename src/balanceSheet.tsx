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
import { readBs } from './store/index';

const classes = makeStyles((theme) => ({
  table: {
    maxWidth: 5,
  },
}));

interface Props {
  bs: BS[];
  loadTicker: Function;
}

interface BS {
  date: string;
  cashAndCashEquivalents: number;
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  operatingExpenses: number;
  symbol: string;
  growth_rate: number;
}

const divide = 1000000;

const BalanceSheet: React.FC<Props> = ({ bs, loadTicker }) => {
  const ticker = bs.length && bs[0].symbol;

  return bs.length ? (
    <Table id="bs">
      <TableHead>
        <TableRow>
          <TableCell>Balance Sheeet</TableCell>
          {bs.map((cur) => (
            <TableCell key={cur.date}>
              {cur && cur.date.substring(0, 4)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {/* <TableRow key={'inputRate'}>
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
          </TableRow> */}
        <TableRow>
          <TableCell>Revenue</TableCell>
          {bs.map((cur) => (
            <TableCell key={cur.date}>
              {cur && formatMoney(cur.revenue / divide, '$', 0)}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>COGS</TableCell>
          {bs.map((cur) => (
            <TableCell key={cur.date}>
              {cur && formatMoney(cur.costOfRevenue / divide, '$', 0)}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Gross Margin</TableCell>
          {bs.map((cur) => (
            <TableCell key={cur.date}>
              {cur && formatMoney(cur.grossProfit / divide, '$', 0)}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Operating Expenses</TableCell>
          {bs.map((cur) => (
            <TableCell key={cur.date}>
              {cur && formatMoney(cur.operatingExpenses / divide, '$', 0)}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  ) : (
    <div></div>
  );
};

const mapStateToProps = ({ bs }: any) => ({
  bs,
});

const mapDispatchToProps = (dispatch: Function) => ({
  loadTicker: (ticker: string) => {
    dispatch(readBs(ticker));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(BalanceSheet);
