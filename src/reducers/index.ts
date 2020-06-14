import { EActionTypes as ATypes, IActions, IState, TClapped } from '../interface';
import getCurrentDateTime from '../utils/getCurrentDateTime';
import getIndex from '../utils/getIndex';
import getLocalStorage from '../utils/getLocalStorage';

export const reducer = (state: IState, action: IActions): IState => {
  switch (action.type) {
    case ATypes.SET_USERS:
      localStorage.setItem('users', JSON.stringify(action.payload.users));
      return {
        ...state,
        users: action.payload.users,
      };
    case ATypes.SET_POST:
      return {
        ...state,
        post: action.payload.post,
      };
    case ATypes.SET_RECEIVE:
      return {
        ...state,
        receive: action.payload.receive,
      };
    case ATypes.SET_TEXT:
      return {
        ...state,
        text: action.payload.text,
      };
    case ATypes.SET_DISABLED:
      return {
        ...state,
        disabled: action.payload.disabled,
      };
    case ATypes.SET_ITEMS:
      localStorage.setItem('items', JSON.stringify(action.payload.items));
      return {
        ...state,
        items: action.payload.items,
      };
    case ATypes.ADD_ITEM: {
      // 投稿を追加
      const newItems = state.items.concat();
      const id = state.items.length;
      const item = {
        id: id,
        post: state.post,
        receive: state.receive,
        text: state.text,
        clapped: 0,
        time: getCurrentDateTime(),
      };
      newItems.unshift(item);
      localStorage.setItem('items', JSON.stringify(newItems));

      // clapped_itemsに値を追加
      const newClappedItems = JSON.parse(getLocalStorage('clapped_items'));
      newClappedItems.push({ item_id: id, clapped: [] });
      localStorage.setItem('clapped_items', JSON.stringify(newClappedItems));

      return {
        ...state,
        items: newItems,
        clappedItems: newClappedItems,
      };
    }
    case ATypes.ADD_CLAPPED: {
      // 投稿の拍手を+1
      const newItems = state.items.concat();
      let i = getIndex(action.payload.id, newItems, 'id');
      newItems[i].clapped = newItems[i].clapped + 1;

      // 拍手できるポイントを-2
      const newUsers = state.users.concat();
      i = getIndex(state.post, newUsers, 'id');
      newUsers[i].clap = newUsers[i].clap - 2;

      // 拍手されたポイントを+1
      i = getIndex(action.payload.post, newUsers, 'id');
      newUsers[i].clapped = newUsers[i].clapped + 1;
      i = getIndex(action.payload.receive, newUsers, 'id');
      newUsers[i].clapped = newUsers[i].clapped + 1;

      localStorage.setItem('items', JSON.stringify(newItems));
      localStorage.setItem('users', JSON.stringify(newUsers));

      return {
        ...state,
        items: newItems,
        users: newUsers,
      };
    }
    case ATypes.SET_CLAPPED_ITEMS: {
      localStorage.setItem('clapped_items', JSON.stringify(action.payload.clappedItems));
      return {
        ...state,
        clappedItems: action.payload.clappedItems,
      };
    }
    case ATypes.ADD_CLAPPED_ITEM: {
      // 値を更新
      let isExist = true;
      let NewClappedItems = state.clappedItems.concat();
      // 拍手したユーザーの総拍手数を+1
      NewClappedItems[action.payload.clappedIndex].clapped.forEach((item: TClapped) => {
        if (item.user_id === state.post) {
          item.clapped_num += 1;
          isExist = false;
        }
      });
      // 拍手がない場合は新たに追加
      if (isExist) {
        const newVal = {
          user_id: state.post,
          clapped_num: 1,
        };
        NewClappedItems[action.payload.clappedIndex].clapped.push(newVal);
      }

      // 拍手数で降順にソート
      NewClappedItems[action.payload.clappedIndex].clapped = NewClappedItems[
        action.payload.clappedIndex
      ].clapped.sort((a, b) => {
        if (a.clapped_num > b.clapped_num) return -1;
        if (a.clapped_num < b.clapped_num) return 1;
        return 0;
      });

      localStorage.setItem('clapped_items', JSON.stringify(NewClappedItems));

      return {
        ...state,
        clappedItems: NewClappedItems,
      };
    }

    default:
      return state;
  }
};
