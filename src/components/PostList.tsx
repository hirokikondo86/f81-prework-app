import React, { useContext } from 'react';
import styled from 'styled-components';
import { IStoreProvider, TItem } from '../interface';
import { Store } from '../store/index';
import PostListItem from './PostListItem';

const PostList: React.FC = () => {
  const { state }: IStoreProvider = useContext(Store);

  return (
    <>
      {state.items.length === 0 ? (
        <_Nothing>投稿なし</_Nothing>
      ) : (
        state.items.map((item: TItem, i: number) => (
          <React.Fragment key={i}>
            <PostListItem item={item} />
          </React.Fragment>
        ))
      )}
    </>
  );
};

const _Nothing = styled.p`
  margin: 1em auto;
  text-align: center;
`;

export default PostList;
