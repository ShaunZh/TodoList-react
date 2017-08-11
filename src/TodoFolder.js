/**
 * @Author: Hexon
 * @Date: 2017/8/4 22:04
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/4 22:04
 */ 

import React , {Component} from 'react';
import $ from 'jquery';

export default class TodoFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.folderIcon = (() => {
      switch (this.props.todoFolderInfo.folderName) {
        case '我的一天': return 'todo-folder-icon-day';
        case '已加标记': return 'todo-folder-icon-flag';
        case 'Todo':    return 'todo-folder-icon-todo';
        default: return 'todo-folder-icon-default';
      }
    })();

    this.folderModifyIcon = (() => {
      switch (this.props.todoFolderInfo.folderName) {
        case '我的一天':
        case '已加标记':
        case 'Todo':    return '';
        default: return 'todo-folder-icon-modify';
      }
    })();
  }


  onClick(e) {
    let folders = $('.todoFolderItem');
    let modifyIcons = $('.todoFolderItem .todo-folder-icon-modify');
    modifyIcons.removeClass('modify-active');
    folders.removeClass('active');

    folders.eq(this.props.index).find('.todo-folder-icon-modify').addClass('modify-active');
    folders.eq(this.props.index).addClass('active');
    this.props.onClickFolder(this.props.index);
  }

  render() {
    return (
      <div className="todoFolderItem" onClick={this.onClick.bind(this)}>
        <span className={"todo-folder-icon " + this.folderIcon}></span>
        <span className="todoFolderName">{this.props.todoFolderInfo.folderName}</span>
        <span className="todoSum">{this.props.todoFolderInfo.todos.length}</span>
        <span className={"todo-folder-icon " + this.folderModifyIcon} onClick={this.props.onActiveEditFolder.bind(this)}></span>
      </div>
    )

  }
}
