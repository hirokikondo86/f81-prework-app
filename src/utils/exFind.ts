import { TUser } from '../interface';

/**
 * Array.prototype.findの拡張関数
 *
 * @param  {TUser}  arr [検索対象配列]
 * @param  {number} id  [検索値]
 * @return {string}     [name]
 */
function exFind(arr: Array<TUser>, id: number) {
  const found = arr.find(el => el.id === id);
  if (found == null) {
    throw new Error('The value was promised to always be there');
  }
  return found.name;
}

export default exFind;
