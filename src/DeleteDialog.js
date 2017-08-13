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
          <img src="./icon.jpg" alt="我是一个图䯮"/>
        </div>
        <div className="right">
          <h3>主人，您真的要将 "{props.title}" 抛下吗？</h3>
          <p className="desp">一转身，就是一辈子呀！主人请三思 </p>
        </div>
      </div>
      <div className="row actions">
          <div className="btn-group">
            <button className="confirm-btn" onClick={props.onConfirm.bind(this)}>来世再见</button>
            <button className="cancel-btn" onClick={props.onCancel.bind(this)}>到我怀里</button>
          </div>
      </div>
    </div>
  );
}
