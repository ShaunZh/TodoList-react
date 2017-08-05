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
    console.log(e);
    console.log('key: ' + key + ', value: ' + e.target.value);
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
    console.log('submit');
    if (this.state.formData.username !== undefined &&
        this.state.formData.password !== undefined) {
      alert('我要登录了');
    } else {
      alert("输入的登录信息有错误呀！");
    }
  };

  // --------注册窗口----------

  signUpOnSubmit(e) {
    console.log('submit');
    if (this.state.formData.username !== undefined &&
      this.state.formData.password !== undefined &&
      this.state.formData.email !== undefined) {
      alert('我要注册了');
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