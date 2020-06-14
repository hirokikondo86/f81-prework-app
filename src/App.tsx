import { IStoreProvider } from 'interface';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import UserSelection from './components/UserSelection';
import { Store } from './store/index';
import getLocalStorage from './utils/getLocalStorage';
import initData from './utils/initData';
import { EActionTypes as ATypes } from './interface';

const App: React.FC = () => {
  const { dispatch }: IStoreProvider = React.useContext(Store);

  const componentJustMounted = React.useRef(true);
  useEffect(() => {
    if (componentJustMounted.current) {
      const users = getLocalStorage('users');
      const items = getLocalStorage('items');
      const clapped = getLocalStorage('clapped_items');

      if (users == 'null' || items == 'null' || clapped == 'null') {
        // 初期データの投入
        dispatch({ type: ATypes.SET_USERS, payload: { users: initData } });
        dispatch({ type: ATypes.SET_ITEMS, payload: { items: [] } });
        dispatch({ type: ATypes.SET_CLAPPED_ITEMS, payload: { clappedItems: [] } });
      } else {
        // ローカルストレージのデータを保存
        dispatch({ type: ATypes.SET_USERS, payload: { users: JSON.parse(users) } });
        dispatch({ type: ATypes.SET_ITEMS, payload: { items: JSON.parse(items) } });
        dispatch({
          type: ATypes.SET_CLAPPED_ITEMS,
          payload: { clappedItems: JSON.parse(clapped) },
        });
      }
    }
    componentJustMounted.current = false;
  }, []);

  return (
    <_Wrapper>
      <UserSelection />
      <PostForm />
      <PostList />
    </_Wrapper>
  );
};

const _Wrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

export default App;
