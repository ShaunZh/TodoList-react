/*
* @Author: Marte
* @Date:   2017-08-03 21:34:24
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-03 23:04:47
*/

import React from 'react';

export default function(props) {
    return (
      <div className="loginWrap">
        <form className="signUp" onSubmit={props.submit}>
          <div className="row">
            <span className="login-icon login-icon-username"></span>
            <input type="text" value={props.formData.username} placeholder="用户名"
            onChange={props.onChange.bind(null, 'username')} />
          </div>

          <div className="row">
            <span className="login-icon login-icon-password"></span>
            <input type="password" value="" placeholder="密码"
            onChange={props.onChange.bind(null, 'password')} />
          </div>

          <div className="row">
            <span className="login-icon login-icon-email"></span>
            <input type="email" value="" placeholder="邮箱"
                   onChange={props.onChange.bind(null, 'email')} />
          </div>
          <div className="row actions">
            <button type="submit">创建免费账号</button>
          </div>
        </form>
        <div className="notify">
          <span>已有账号</span>
          <a href="#" className="returnSignnIn" onClick={props.switch.bind(null, 'signIn')}>登录</a>
        </div>
      </div>
    )
}