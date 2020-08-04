import { createStore, combineReducers, applyMiddleware, Dispatch } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import queryString from 'query-string';
const READ_INCOME = 'READ_INCOME';
const READ_TICKERS = 'READ_TICKERS';
const READ_BS = 'READ_BS';

const _readIncome = (data: string[]) => ({
  type: READ_INCOME,
  income: data,
});

const _readTickers = (data: string[]) => ({
  type: READ_TICKERS,
  tickers: data,
});

const _readBs = (data: string[]) => ({
  type: READ_BS,
  bs: data,
});

interface DA {
  da1: number;
  da2: number;
  da3: number;
  da4: number;
  da5: number;
}
export const readIncome = (
  ticker: string,
  py1: number,
  py2: number,
  py3: number,
  py4: number,
  py5: number,
  da: DA
) => async (dispatch: Dispatch) => {
  const daString = queryString.stringify(da);
  console.log(daString);

  const data = (
    await axios.post(
      `/api/income?ticker=${ticker}&py1=${py1}&py2=${py2}&py3=${py3}&py4=${py4}&py5=${py5}&da[]=${daString}`,
      {}
    )
  ).data;
  dispatch(_readIncome(data));
};

export const readBs = (ticker: string) => async (dispatch: Dispatch) => {
  const data = (await axios.get(`/api/bs?ticker=${ticker}`)).data;
  dispatch(_readBs(data));
};

export const readTickers = () => async (dispatch: Function) => {
  const data = (await axios.get(`/api/getTickers`)).data;
  dispatch(_readTickers(data));
};
interface incomeActionType {
  type: string;
  income: string[];
}

interface incomeActionType {
  type: string;
  bs: string[];
}

interface tickerActionType {
  type: string;
  tickers: string[];
}
const incomeReducer = (state = [], action: incomeActionType) => {
  switch (action.type) {
    case READ_INCOME:
      return action.income;
    default:
      return state;
  }
};

const bsReducer = (state = [], action: incomeActionType) => {
  switch (action.type) {
    case READ_BS:
      return action.income;
    default:
      return state;
  }
};
const tickerReducer = (state = [], action: tickerActionType) => {
  switch (action.type) {
    case READ_TICKERS:
      return action.tickers;
    default:
      return state;
  }
};

const reducer = combineReducers({
  incomeS: incomeReducer,
  tickers: tickerReducer,
  bs: bsReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
