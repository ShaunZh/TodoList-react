/**
 * @Author: Hexon
 * @Date: 2017/8/4 22:04
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/4 22:04
 */ 

import React from 'react';

export default function (props) {
  return (
    <div className="todoFolderItem" onClick=''>
      <span className="todo-folder-icon todo-folder-icon-day"></span>
      <span className="todoFolderName">{props.info.name}</span>
      <span className="todoSum">{props.info.todoListSum}</span>
      <span className="todo-folder-icon todo-folder-icon-modify" onClick=''></span>
    </div>
  )
}
