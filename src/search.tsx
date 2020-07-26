import React, { useState, useEffect } from 'react';
import { Search } from 'semantic-ui-react';
interface SearchProps {
  tickers: any[];
}

const SearchTicker = ({ tickers }: SearchProps) => {
  const [ticker, setTicker] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);
  console.log(results);
  return (
    <Search
      value={ticker}
      onSearchChange={(ev, { value }) => {
        value ? setTicker(value) : setTicker('');
        const filtered = tickers
          .filter((cur) => cur.symbol.includes(value))
          .map((x) => x.symbol);
        setResults(filtered);
      }}
      results={results}
    ></Search>
  );
};

export default SearchTicker;
