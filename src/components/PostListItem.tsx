import React, { useContext } from 'react';
import styled from 'styled-components';
import arrow from '../images/arrow.png';
import star from '../images/star.png';
import user01 from '../images/user01.png';
import user02 from '../images/user02.png';
import user03 from '../images/user03.png';
import user04 from '../images/user04.png';
import user05 from '../images/user05.png';
import { EActionTypes as ATypes, IStoreProvider, TClapped, TItem } from '../interface';
import { Store } from '../store/index';
import { Primary } from '../utils/color';
import exFind from '../utils/exFind';
import getIndex from '../utils/getIndex';

interface IProps {
  item: TItem;
}

const PostListItem: React.FC<IProps> = props => {
  const { item } = props;
  const { state, dispatch }: IStoreProvider = useContext(Store);

  // 拍手機能
  function handleClap(id: number, post: number, receive: number) {
    // ユーザーを選択していない
    if (state.post === 0) {
      return;
    }

    // 投稿者または、被投稿者と同じ
    if (post === state.post || receive === state.post) {
      return;
    }

    // ポストのポイントが0
    const userIndex = getIndex(state.post, state.users, 'id');
    if (state.users[userIndex].clap === 0) {
      return;
    }

    // 拍手した回数が15回
    const clappedIndex = getIndex(id, state.clappedItems, 'item_id');
    const result = state.clappedItems[clappedIndex].clapped.find(
      (item: TClapped) => item.user_id === state.post && item.clapped_num === 15,
    );
    if (result) {
      return;
    }

    dispatch({ type: ATypes.ADD_CLAPPED_ITEM, payload: { clappedIndex: clappedIndex } });
    dispatch({ type: ATypes.ADD_CLAPPED, payload: { id: id, post: post, receive: receive } });
  }

  return (
    <_Wrapper>
      <_P>
        {/* TODO: 動的に画像を読み込む */}
        {item.post === 1 ? (
          <_Img src={user01} alt="Posted user image" />
        ) : item.post === 2 ? (
          <_Img src={user02} alt="Posted user image" />
        ) : item.post === 3 ? (
          <_Img src={user03} alt="Posted user image" />
        ) : item.post === 4 ? (
          <_Img src={user04} alt="Posted user image" />
        ) : (
          <_Img src={user05} alt="Posted user image" />
        )}
        <_Img src={arrow} alt="Arrow" />
        {item.receive === 1 ? (
          <_Img src={user01} alt="Received user image" />
        ) : item.receive === 2 ? (
          <_Img src={user02} alt="Received user image" />
        ) : item.receive === 3 ? (
          <_Img src={user03} alt="Received user image" />
        ) : item.receive === 4 ? (
          <_Img src={user04} alt="Received user image" />
        ) : (
          <_Img src={user05} alt="Received user image" />
        )}
      </_P>
      <p style={{ marginBottom: '1em' }}>{item.text}</p>
      <_Flex>
        <_Flex>
          <_Tooltip onClick={() => handleClap(item.id, item.post, item.receive)}>
            <figure>
              <img src={star} alt="Star" style={{ width: '30px' }} />
            </figure>
            <_ClapDetail>
              <h3>拍手一覧</h3>
              <ul>
                {Object.entries(state.clappedItems[item.id]['clapped']).length === 0 ? (
                  <p>拍手なし</p>
                ) : (
                  Object.entries(state.clappedItems[item.id]['clapped']).map(
                    (clappedItem: [string, TClapped], i: number) => (
                      <li key={i}>
                        {/* possibly undefined 回避 */}
                        {exFind(state.users, clappedItem[1].user_id)} {clappedItem[1].clapped_num}
                      </li>
                    ),
                  )
                )}
              </ul>
            </_ClapDetail>
          </_Tooltip>
          <p>{item.clapped}</p>
        </_Flex>
        <p>{item.time}</p>
      </_Flex>
    </_Wrapper>
  );
};

const _Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em;

  border-bottom: solid 1px ${Primary};
`;
const _P = styled.p`
  display: flex;
  align: items;
  margin-bottom: 1em;
`;
const _Img = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1em;
`;
const _Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
// ツールチップスタイル
const _Tooltip = styled.div`
  display: inline-block;
  position: relative;
  margin-right: '0.5em';

  cursor: pointer;
`;
const _ClapDetail = styled.div`
  width: 150px;
  height: 100px;
  display: none;
  position: absolute;
  padding: 10px;

  overflow-y: auto;
  opacity: 0.9;
  line-height: 1.6em;
  border-radius: 0.5em;
  font-size: 12px;
  background-color: ${Primary};
  color: #fff;

  ${_Tooltip}:hover & {
    display: inline-block;
    top: -100px;
    left: 0;
  }
`;

export default PostListItem;
