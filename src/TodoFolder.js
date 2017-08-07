/**
 * @Author: Hexon
 * @Date: 2017/8/4 22:04
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/4 22:04
 */ 

import React from 'react';

export default function (props) {
  let folderIcon = (() => {
    switch (props.todoFolderInfo.folderName) {
      case '我的一天': return 'todo-folder-icon-day';
      case '已加标记': return 'todo-folder-icon-flag';
      case 'Todo':    return 'todo-folder-icon-todo';
      default: return 'todo-folder-icon-default';
    }
  })();
  return (
    <div className="todoFolderItem" onClick={props.onClick}>
      <span className={"todo-folder-icon " + folderIcon}></span>
      <span className="todoFolderName">{props.todoFolderInfo.folderName}</span>
      <span className="todoSum">{props.todoFolderInfo.unfinishedTodos.length}</span>
      <span className="todo-folder-icon" onClick=''></span>
    </div>
  )
}
