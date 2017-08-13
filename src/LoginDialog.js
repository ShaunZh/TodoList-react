/*
* @Author: Marte
* @Date:   2017-08-03 21:28:29
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-04 11:20:01
*/
import './LoginDialog.css'

import React from 'react';
import SignInDialog from './SignInDialog';
import SignUpDialog from './SignUpDialog';
import ForgotPassword from './ForgotPassword';

import { signUp, signIn, sendPasswordResetEmail} from './leanCloud';
import VerifyData from './VerifyData';

export default class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curDialog: 'signIn',    // signUp, forgotPassword
      formData: {
        username: '',
        password: '',
        email: ''
      },
    };
  };


  changeFormData(key, e) {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.formData[key] = e.target.value;
    this.setState(stateCopy);
  }

  switch(key) {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.curDialog = key;
    stateCopy.formData = {};
    this.setState(stateCopy);
  }

  // --------登录窗口----------
  signInOnSubmit(e) {

    e.preventDefault();
    let {username, password} = this.state.formData;
    if (!(VerifyData.username(username) && VerifyData.password(password))) {
      alert('输入有误');
      return;
    }
      let success = (user) => {
        this.props.onSignIn.call(null, 'signIn', user);
      };

      let error = (error) => {
        switch(error.code) {
          case 210: {
            alert('用户名与密码不匹配');
          }
          break;

          case 211: {
            alert('找不到用户')
          }
          break;

          case 217: {
            alert('无效的用户名')
          }
          break;

          case 218: {
            alert('无效的密码')
          }
          break;
        }
      };
      signIn(username, password, success, error);

  };

  // --------注册窗口----------

  signUpOnSubmit(e) {
    e.preventDefault();
    let {username, password, email} = this.state.formData;

    if (!(VerifyData.username(username) && VerifyData.email(email) && VerifyData.password(password))) {
      alert('输入有误');
      return;
    }
      let success = (user) => {
        this.props.onSignUp.call(null, 'signUp', user);
      };

      let error = (error) => {
        switch(error.code) {
          case 202: {
            alert('用户名被占用了');
          }
           break;
          case 203: {
            alert('电子邮箱被占用');
          }
          break;
          case 204: {
            alert('请输入电子邮箱')
          }
        }
      };
      signUp(email, username, password, success, error);
  };

  //-------- 忘记密码 -------------
  forgotOnSubmit() {
    if (this.state.formData.email !== undefined) {
      sendPasswordResetEmail(this.state.formData.email, (response) => {
        alert('重置密码邮件已发送，请主要查收');
      });
    } else {
      alert('请输入有效的邮箱地址');
    }
  };

  chooseDialog() {
    if (this.state.curDialog === 'signIn') {
      return (
        <SignInDialog formData={this.state.formData}
                      onChange={this.changeFormData.bind(this)}
                      submit={this.signInOnSubmit.bind(this)}
                      switch={this.switch.bind(this)}
        />
      );
    } else if (this.state.curDialog === 'signUp') {
      return (
        <SignUpDialog formData={this.state.formData}
                      onChange={this.changeFormData.bind(this)}
                      submit={this.signUpOnSubmit.bind(this)}
                      switch={this.switch.bind(this)}
        />
      );
    } else if (this.state.curDialog === 'forgotPassword') {
      return (
        <ForgotPassword formData={this.state.formData}
                        onChange={this.changeFormData.bind(this)}
                        submit={this.forgotOnSubmit.bind(this)}
                        switch={this.switch.bind(this)}
        />
      );
    }
  };

  render() {
    return (
      <div className="loginDialogWrap">
        {this.chooseDialog()}
      </div>

    );
  }
}