/**
 * localStorage.getItem()の拡張関数
 *
 * @param {string} key 文字列
 * @return {string}    nullの場合は'null'を返す
 */
function getLocalStorage(key: string) {
  const ret = localStorage.getItem(key);
  return ret ? ret : 'null';
}

export default getLocalStorage;
