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
      <h3>{props.title}</h3>
      <div className="actions">
        <div className="btn-group">
          <button className="cancel-btn" onClick={props.onCancel.bind(this)}>取消</button>
          <button className="confirm-btn" onClick={props.onConfirm.bind(this)}>删除</button>
        </div>
      </div>
    </div>
  );
}
