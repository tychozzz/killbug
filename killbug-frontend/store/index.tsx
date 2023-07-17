import React, { ReactElement, createContext, useContext } from 'react';
import {enableStaticRendering, useLocalObservable} from 'mobx-react-lite';
import createStore, {IStore} from './rootStore';

interface IProps {
  initialValue: Record<any, any>;
  children: ReactElement
}

enableStaticRendering(!process.browser);

const StoreContext = createContext({});

export const StoreProvider = ({ initialValue, children }: IProps) => {
  const store: IStore = useLocalObservable(createStore(initialValue))
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store: IStore = useContext(StoreContext) as IStore;
  if (!store) {
    throw new Error('data not exist');
  }
  return store;
}