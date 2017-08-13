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

  onSubmit(e) {
    if ('title' in this.props.newFolder && this.props.newFolder.title.trim() !== '') {
      this.props.onSubmit(e);
    } else {
      alert('大哥，输入有误呀!');
    }
  }
  keySubmit(e) {
    if (e.key === 'Enter') {
      if (e.target.value.trim() !== '') {
        this.props.onSubmit(e);
      } else {
        alert('老铁，不说点啥我好紧张呀!')
      }
    }
  }

  render() {
    return (
      <div className="createFolder">
        <h3>主人又要干大事啦</h3>
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
          <button className="cancel-btn" onClick={this.props.onCancel.bind(this)}>下次见</button>
          <button className="confirm-btn" onClick={this.onSubmit.bind(this)}>棒棒哒</button>
        </div>
      </div>

    )
  }

}

