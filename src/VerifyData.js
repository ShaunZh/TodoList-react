/**
 * @Author: Hexon
 * @Date: 2017/8/13 21:17
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/13 21:17
 */
var VerifyData = (function(){

  function email(str) {
    var exp = /.+@.+\.com$/;
    return str !== undefined && exp.test(str);
  }

  function username(str) {
    var exp = /\w{3,20}/g;
    return str !== undefined && exp.test(str);
  }

  // 密码校验
  // 规则：6 ~ 20个字符
  function password(str) {
    var exp = /\w{6,20}/g;
    return str !== undefined && exp.test(str);
  }
  return {
    email: email,
    username: username,
    password: password
  };
})();


export default VerifyData;