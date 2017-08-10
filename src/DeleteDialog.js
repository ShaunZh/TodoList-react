/**
 * @Author: Hexon
 * @Date: 2017/8/10 10:53
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/10 10:53
 */

import './DeleteDialog.css';
import React from 'react';

export default function(props) {
  return (
    <div className="deleteDialog">
      <div className="main">
        <div className="left">
          我是一个图标
        </div>
        <div className="right">
          <h3>[ {props.title} ] 将被永久删除</h3>
          <p className="desp">你将无法撤销此操作。 </p>
        </div>
      </div>
      <div className="row actions">
          <div className="btn-group">
            <button className="confirm-btn" onClick={props.onConfirm.bind(this)}>删除</button>
            <button className="cancel-btn" onClick={props.onCancel.bind(this)}>取消</button>
          </div>
      </div>
    </div>
  );
}
