import React, { useState, useEffect } from 'react';
import { Search } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { readIncome } from './store';

interface SearchProps {
  tickers: any[];
  loadTicker: Function;
}

interface ResultType {
  title: string;
  description: string;
  price: string;
}
// const resultRender = (results: string[]) => {
//     return (
//        results.map()
//     )

// };

const SearchTicker = ({ tickers, loadTicker }: SearchProps) => {
  const [ticker, setTicker] = useState<string>('');
  const [results, setResults] = useState<ResultType[]>([]);
  return (
    <Search
      value={ticker}
      onSearchChange={(ev, { value }) => {
        value ? setTicker(value) : setTicker('');
        const filtered = tickers
          .filter((cur) => {
            const val = value && value.toUpperCase();
            return cur.symbol.toUpperCase().includes(val);
          })
          .map((x) => ({
            title: x.symbol,
            description: x.name,
            price: String(`price: $${x.price}`),
          }));
        value ? setResults(filtered) : setResults([]);
      }}
      results={results}
      onResultSelect={(ev, { result }) => {
        setTicker(result.title);
        loadTicker(result.title);
        setResults([]);
      }}
    ></Search>
  );
};

const mapDispatchToProps = (dispatch: Function) => ({
  loadTicker: (ticker: string) => {
    dispatch(readIncome(ticker, 0.05, 0.05, 0.05, 0.05, 0.05));
  },
});

export default connect(null, mapDispatchToProps)(SearchTicker);
