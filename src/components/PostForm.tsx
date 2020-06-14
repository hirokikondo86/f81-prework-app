import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import noUser from '../images/no-user.png';
import user01 from '../images/user01.png';
import user02 from '../images/user02.png';
import user03 from '../images/user03.png';
import user04 from '../images/user04.png';
import user05 from '../images/user05.png';
import { EActionTypes as ATypes, IStoreProvider } from '../interface';
import { Store } from '../store/index';
import { Primary } from '../utils/color';
import validate from '../utils/validate';

const PostForm: React.FC = () => {
  const { state, dispatch }: IStoreProvider = useContext(Store);
  const [index, setIndex] = useState(0);

  function changeTarget(e: React.ChangeEvent<HTMLSelectElement>) {
    setIndex(Number(e.target.value));
    dispatch({ type: ATypes.SET_RECEIVE, payload: { receive: Number(e.target.value) } });
    dispatch({
      type: ATypes.SET_DISABLED,
      payload: { disabled: validate(state.text, state.post, Number(e.target.value)) },
    });
  }
  function changeText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch({
      type: ATypes.SET_TEXT,
      payload: { text: e.target.value },
    });
    dispatch({
      type: ATypes.SET_DISABLED,
      payload: { disabled: validate(e.target.value, state.post, state.receive) },
    });
  }
  function postText() {
    dispatch({ type: ATypes.ADD_ITEM });
  }

  return (
    <_Wrapper>
      <_Flex>
        <div style={{ margin: '1em' }}>
          <figure style={{ marginBottom: '0.5em' }}>
            {/* TODO: 動的に画像を読み込む */}
            {index === 0 ? (
              <img src={noUser} alt="No user image" style={{ width: '100px' }} />
            ) : index === 1 ? (
              <img src={user01} alt="User image" style={{ width: '100px' }} />
            ) : index === 2 ? (
              <img src={user02} alt="User image" style={{ width: '100px' }} />
            ) : index === 3 ? (
              <img src={user03} alt="User image" style={{ width: '100px' }} />
            ) : index === 4 ? (
              <img src={user04} alt="User image" style={{ width: '100px' }} />
            ) : (
              <img src={user05} alt="User image" style={{ width: '100px' }} />
            )}
          </figure>
          <p style={{ textAlign: 'center' }}>
            <select name="name" style={{ width: '100%' }} onChange={changeTarget}>
              <option value="0">ー</option>
              {state.users.map((user, i) => (
                <option key={i} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </p>
        </div>
        <_Textarea
          name="text"
          id="text"
          placeholder="あなたの周りの素敵な行動を集めようぜ！"
          value={state.text}
          onChange={changeText}
        ></_Textarea>
      </_Flex>
      <_P>
        <button onClick={postText} disabled={state.disabled}>
          投稿
        </button>
      </_P>
    </_Wrapper>
  );
};

const _Wrapper = styled.div`
  overflow: hidden;
  border-bottom: solid 1px ${Primary};
`;
const _Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;
const _Textarea = styled.textarea`
  width: calc(100% - 150px);
  height: 120px;
  margin-right: 1em;

  resize: none;
`;
const _P = styled.p`
  float: right;
  margin-right: 1em;
  margin-bottom: 1em;
`;

export default PostForm;
