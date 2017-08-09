/**
 * @Author: Hexon
 * @Date: 2017/8/5 10:01
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/5 10:01
 */ 
import React, {Component} from 'react';
import $ from 'jquery';

import './CreateFolder.css';

export default class CreateFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderInfo: {},
    };
  }

  keySubmit(e) {
    if (e.key === 'Enter') {
      if (e.target.value.trim() !== '') {
        this.props.onSubmit(e);
      }
    }
  }

  render() {
    return (
      <div className="createFolder">
        <h3>创建新清单</h3>
        <input type="text" value={this.props.newFolder.title} placeholder="清单名称"
               onChange={this.props.onChange.bind(this)}
               onKeyPress={this.keySubmit.bind(this)}
        />
        <div className="accountInfoWrap">
          <span className="firstLetterUserName">{this.props.user.username.split('')[0]}</span>
          <div className="accountInfo">
            <p className="username">{this.props.user.username}</p>
            <p className="email">{this.props.user.email}</p>
          </div>
        </div>
        <div className="btn-group">
          <button className="cancel-btn" onClick={this.props.onCancel.bind(this)}>取消</button>
          <button className="confirm-btn" onClick={this.props.onSubmit.bind(this)}>保存</button>
        </div>
      </div>

    )
  }

}

