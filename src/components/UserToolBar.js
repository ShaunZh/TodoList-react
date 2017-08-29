/**
 * @Author: Hexon
 * @Date: 2017/8/19 17:22
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/19 17:22
 */

import React from 'react';

export default function(props) {
  return (
    <div className="userToolBar">
      <span className="firstLetterUserName">{props.user.username.split('')[0]}</span>
      <span className="username">{props.user.username}</span>
      <span className="icon icon-logout" onClick={props.onLogout.bind(this)} title="点击退出登录"></span>  {/*onClick=''*/}
    </div>
  );
}
