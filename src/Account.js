/**
 * @Author: Hexon
 * @Date: 2017/8/4 21:57
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/4 21:57
 */

import React from 'react';

export default function(props) {
  return (
    <div className="accountWrap">
      <span className="firstLetterUserName">{props.accountInfo.username.split('')[0]}</span>
      <span className="username">{props.accountInfo.username}</span>
      <span className="user-dialog-icon user-dialog-icon-logout"></span>  {/*onClick=''*/}
    </div>
  );
}
