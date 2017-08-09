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
    if (username !== undefined &&
        password !== undefined) {
      let success = (user) => {
        this.props.onSignIn.call(null, 'signIn', user);
      };

      let error = (error) => {
        switch(error.code) {
          case 210: {
            alert('用户名与密码不匹配');
          }
          break;
        }
      };

      signIn(username, password, success, error);

    } else {
      alert('请输入正确的用户名和密码');
      return ;
    }

  };

  // --------注册窗口----------

  signUpOnSubmit(e) {
    e.preventDefault();
    let {username, password, email} = this.state.formData;

    if (username !== undefined &&
        password !== undefined &&
        email !== undefined) {
      let success = (user) => {
        this.props.onSignUp.call(null, 'signUp', user);
      };

      let error = (error) => {
        switch(error.code) {
          case 202: {
            alert('用户名被占用了');
          }
           break;
        }
      };
      signUp(email, username, password, success, error);
    } else {
      alert("输入的注册信息有误！");
    }
  };

  //-------- 忘记密码 -------------
  forgotOnSubmit() {
    if (this.state.formData.email !== undefined) {
      console.log('忘记密码，提交邮箱信息找回密码');
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