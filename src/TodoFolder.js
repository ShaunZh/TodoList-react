/**
 * @Author: Hexon
 * @Date: 2017/8/4 22:04
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/4 22:04
 */ 

import React from 'react';
import $ from 'jquery';

export default function (props) {
  let folderIcon = (() => {
    switch (props.todoFolderInfo.folderName) {
      case '我的一天': return 'todo-folder-icon-day';
      case '已加标记': return 'todo-folder-icon-flag';
      case 'Todo':    return 'todo-folder-icon-todo';
      default: return 'todo-folder-icon-default';
    }
  })();

  function onClick(e) {
    let folders = $('.todoFolderItem');
    let modifyIcons = $('.todoFolderItem .todo-folder-icon-modify');
    modifyIcons.removeClass('modify-active');
    folders.removeClass('active');

    folders.eq(props.index).find('.todo-folder-icon-modify').addClass('modify-active');
    folders.eq(props.index).addClass('active');
    props.onClickFolder(props.index);

  }

  return (
    <div className="todoFolderItem" onClick={onClick}>
      <span className={"todo-folder-icon " + folderIcon}></span>
      <span className="todoFolderName">{props.todoFolderInfo.folderName}</span>
      <span className="todoSum">{props.todoFolderInfo.todos.length}</span>
      <span className="todo-folder-icon todo-folder-icon-modify" onClick={props.onActiveEditFolder.bind(this)}></span>
    </div>
  )
}
