/*
* @Author: Marte
* @Date:   2017-08-03 21:34:50
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-03 23:04:50
*/

import React from 'react';

export default function(props) {
  return (
    <div className="loginWrap">
      <form className="forgotPassword" onSubmit={props.submit}>
        <div className="row title-wrap">
          <h2>忘记密码？</h2>
          <h3>客官无需担心，请输入邮箱，天涯海角也帮您找回来哟！</h3>
        </div>
        <div className="row">
          <span className="login-icon login-icon-email"></span>
          <input type="email" value={props.formData.email} placeholder="电子邮箱"
                 onChange={props.onChange.bind(null, 'email')} />
        </div>
        <div className="row actions">
          <button type="submit">重置密码</button>
        </div>
      </form>
      <div className="notify">
        <span>已有账号</span>
        <a href="#" className="returnSignnIn" onClick={props.switch.bind(null, 'signIn')}>登录</a>
      </div>
    </div>

    )
}