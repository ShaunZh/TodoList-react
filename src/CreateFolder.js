/**
 * @Author: Hexon
 * @Date: 2017/8/5 10:01
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/5 10:01
 */ 
import React, {Component} from 'react';
import $ from 'jquery';

import './CreateFolder.css';


function keySubmit(props, e) {
  if (e.key === 'Enter') {
    if (e.target.value.trim() !== '') {
      console.log('WTF');
      props.onSubmit(e);
    }
  }
}


export default function(props) {
    return (
      <div className="createFolder">
          <h3>创建新清单</h3>
          <input type="text" value={props.newFolderTitle} placeholder="清单名称"
                 onChange={props.onChange}
                 onKeyPress={keySubmit.bind(null, props)}
          />
          <div className="accountInfoWrap">
            <span className="firstLetterUserName">{props.accountInfo.username.split('')[0]}</span>
            <div className="accountInfo">
              <p className="username">{props.accountInfo.username}</p>
              <p className="email">{props.accountInfo.email}</p>
            </div>
          </div>
          <div className="btn-group">
            <button className="cancel-btn" onClick={props.onCancel}>取消</button>
            <button className="confirm-btn" onClick={props.onSubmit}>保存</button>
          </div>
      </div>
    );
}