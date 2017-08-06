/**
 * @Author: Hexon
 * @Date: 2017/8/5 10:01
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/5 10:01
 */ 
import React, {Component} from 'react';

import './CreateFolder.css';

export default function(props) {

    return (
      <div className="createFolder">
        <form onSubmit=''>
          <h3>创建新清单</h3>
          <input type="text" value="" placeholder="清单名称"
                 onChange=''/>
          <div className="accountInfoWrap">
            <span className="firstLetterUserName">{props.accountInfo.username.split('')[0]}</span>
            <div className="accountInfo">
              <p className="username">{props.accountInfo.username}</p>
              <p className="email">{props.accountInfo.email}</p>
            </div>
          </div>
          <div className="btn-group">
            <button className="cancel-btn">取消</button>
            <button className="confirm-btn">保存</button>
          </div>
        </form>
      </div>
    );
}