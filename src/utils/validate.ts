/**
 * 投稿をバリデーションする関数
 *
 * @param {string} text 文字列
 * @param {number} post 投稿者のindex
 * @param {number} receiver 投稿される人のindex
 *
 * @return {boolean} バリデーションに引っかかるとtrueを返す
 */
function validate(text: string, post: number, receive: number) {
  // 文字列が５文字未満
  if (text.length < 5) {
    return true;
  }
  // postとreceiveが選択されていない
  if (post === 0 || receive === 0) {
    return true;
  }
  // postとreceiveが同じ
  if (post === receive) {
    return true;
  }

  return false;
}

export default validate;
