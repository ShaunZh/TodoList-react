/**
 * @Author: Hexon
 * @Date: 2017/8/4 21:57
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/4 21:57
 */

import React from 'react';

export default function(props) {
  console.log('account');
  return (
    <div className="accountWrap">
      <span className="firstLetterUserName">{props.user.username.split('')[0]}</span>
      <span className="username">{props.user.username}</span>
      <span className="user-dialog-icon user-dialog-icon-logout" onClick={props.onLogout.bind(this)} title="点击退出登录"></span>  {/*onClick=''*/}
    </div>
  );
}
