import * as React from 'react';
import { IState } from '../interface';
import { reducer } from '../reducers/index';

const initialState: IState = {
  users: [{ id: 0, name: 'ー', thumb: 'noUser', clap: 0, clapped: 0 }],
  post: 0,
  receive: 0,
  text: '',
  disabled: true,
  items: [],
  clappedItems: [],
};

export const Store = React.createContext<IState | any>(initialState);

export const StoreProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
};
