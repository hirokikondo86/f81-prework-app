export enum EActionTypes {
  // User
  SET_USERS = 'SET_USERS',
  // Validation
  SET_POST = 'SET_POST',
  SET_RECEIVE = 'SET_RECEIVE',
  SET_TEXT = 'SET_TEXT',
  SET_DISABLED = 'SET_DISABLED',
  // Post
  SET_ITEMS = 'SET_ITEMS',
  ADD_ITEM = 'ADD_ITEM',
  // Clapped
  ADD_CLAPPED = 'ADD_CLAPPED',
  SET_CLAPPED_ITEMS = 'SET_CLAPPED_ITEMS',
  ADD_CLAPPED_ITEM = 'ADD_CLAPPED_ITEM',
}

// Types, Interfaces
export type TUser = {
  id: number;
  name: string;
  thumb: string;
  clap: number;
  clapped: number;
};
export type TItem = {
  id: number;
  post: number;
  receive: number;
  text: string;
  clapped: number;
  time: string;
};
export type TClapped = {
  user_id: number;
  clapped_num: number;
};
export type TClappedItem = {
  item_id: number;
  clapped: TClapped[];
};
export interface IState {
  users: TUser[];
  post: number;
  receive: number;
  text: string;
  disabled: boolean;
  items: TItem[];
  clappedItems: TClappedItem[];
}

// Actions
interface ISetUsers {
  type: EActionTypes.SET_USERS;
  payload: { users: TUser[] };
}
interface ISetPost {
  type: EActionTypes.SET_POST;
  payload: { post: number };
}
interface ISetReceive {
  type: EActionTypes.SET_RECEIVE;
  payload: { receive: number };
}
interface ISetText {
  type: EActionTypes.SET_TEXT;
  payload: { text: string };
}
interface ISetDisabled {
  type: EActionTypes.SET_DISABLED;
  payload: { disabled: boolean };
}
interface ISetItems {
  type: EActionTypes.SET_ITEMS;
  payload: { items: TItem[] };
}
interface IAddItem {
  type: EActionTypes.ADD_ITEM;
}
interface IAddClapped {
  type: EActionTypes.ADD_CLAPPED;
  payload: { id: number; post: number; receive: number };
}
interface ISetClappedItems {
  type: EActionTypes.SET_CLAPPED_ITEMS;
  payload: { clappedItems: TClappedItem[] };
}
interface IAddClappedItem {
  type: EActionTypes.ADD_CLAPPED_ITEM;
  payload: { clappedIndex: number };
}
export type IActions =
  | ISetUsers
  | ISetPost
  | ISetReceive
  | ISetText
  | ISetDisabled
  | IAddItem
  | ISetItems
  | IAddClapped
  | ISetClappedItems
  | IAddClappedItem;

export interface IStoreProvider {
  state: IState;
  dispatch: React.Dispatch<IActions>;
}
