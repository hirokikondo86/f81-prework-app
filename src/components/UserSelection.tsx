import React, { useState } from 'react';
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

const UserSelection: React.FC = () => {
  const { state, dispatch }: IStoreProvider = React.useContext(Store);
  const [index, setIndex] = useState(0);

  function changeTarget(e: React.ChangeEvent<HTMLSelectElement>) {
    setIndex(Number(e.target.value));
    dispatch({ type: ATypes.SET_POST, payload: { post: Number(e.target.value) } });
    dispatch({
      type: ATypes.SET_DISABLED,
      payload: { disabled: validate(state.text, Number(e.target.value), state.receive) },
    });
  }

  return (
    <_Wrapper>
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
      <_Ul>
        <_Li>拍手できる数 {index === 0 ? 'ー' : state.users[index - 1].clap}</_Li>
        <_Li>拍手された数 {index === 0 ? 'ー' : state.users[index - 1].clapped}</_Li>
      </_Ul>
    </_Wrapper>
  );
};

const _Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  background-color: ${Primary};
`;
const _Ul = styled.ul`
  width: calc(100% - 150px);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const _Li = styled.li`
  margin-right: 1em;
  color: white;
`;

export default UserSelection;
