/*
* @Author: Marte
* @Date:   2017-08-03 21:33:59
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-03 22:41:01
*/

import React from 'react'

export default function (props) {
  return (
    <div className="loginWrap">
      <form className="signIn" onSubmit={props.submit}>
        <div className="row">
          <span className="login-icon login-icon-username"></span>
          <input type="text" value={props.formData.username} className="username" placeholder="用户名"
                 onChange={props.onChange.bind(null, 'username')} />
        </div>
        <div className="row">
          <span className="login-icon login-icon-password"></span>
          <input type="password" value={props.formData.password} className="password" placeholder="密码"
                 onChange={props.onChange.bind(null, 'password')} />
        </div>
        <div className="row actions">
          <button type="submit" >登录</button>
        </div>
        <div className="row action-forgotPassword">
          <a href="#" onClick={props.switch.bind(null, 'forgotPassword')}>忘记密码?</a>
        </div>
      </form>
      <div className="notify">
        <span>江湖还没留下您的名号！</span>
        <a href="#"  onClick={props.switch.bind(null, 'signUp')}>去挂名</a>
      </div>
    </div>

  )
}