/**
 * 連想配列の検索関数
 *
 * @param  {string, number, boolean}   value [検索値]
 * @param  {any}    arr   [検索対象配列]
 * @param  {string} prop  [検索添字]
 *
 * @return {Int}         [添字 or -1]
 */
function getIndex(val: string | number | boolean, arr: any, prop: string) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][prop] === val) {
      return i;
    }
  }
  return -1; // 検索できなかった場合
}

export default getIndex;
