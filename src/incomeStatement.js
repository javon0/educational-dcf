import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

const classes = {
  table: {
    width: 5,
  },
};

class IncomeStatement extends React.Component {
  constructor() {
    super();
    this.state = {
      incomeS: {},
    };
  }

  async componentDidMount() {
    const incomeS = (await axios.get(`/api/income?ticker=aapl`)).data;
    this.setState({ incomeS });
  }

  render() {
    const { incomeS } = this.state;

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.table}>Income Statement</TableCell>
            <TableCell>{incomeS[0] && incomeS[4].date}</TableCell>
            <TableCell>{incomeS[0] && incomeS[3].date}</TableCell>
            <TableCell>{incomeS[0] && incomeS[2].date}</TableCell>
            <TableCell>{incomeS[0] && incomeS[1].date}</TableCell>
            <TableCell>{incomeS[0] && incomeS[0].date}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incomeS[0] &&
            Object.keys(incomeS[0]).map((cur) => (
              <TableRow key={cur}>
                <TableCell>{cur}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  }
}

export default IncomeStatement;
