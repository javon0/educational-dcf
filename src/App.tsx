import React, { useEffect, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import IncomeStatement from './incomeStatement';
import SearchTicker from './search';
import { readTickers } from './store/index';
import { connect } from 'react-redux';

interface AppProps {
  load: Function;
  tickers: string[];
}

function App({ load, tickers }: AppProps) {
  useEffect(() => {
    load();
  }, []);
  return (
    <div className="App">
      <SearchTicker tickers={tickers} />
      <IncomeStatement />
    </div>
  );
}
const mapStateToProps = ({ tickers }: { tickers: string[] }) => ({
  tickers,
});
const mapDispatchToProps = (dispatch: Function) => ({
  load: () => dispatch(readTickers()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
