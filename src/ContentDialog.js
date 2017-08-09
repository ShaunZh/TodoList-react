/**
 * @Author: Hexon
 * @Date: 2017/8/4
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/4
 */
import React, {Component} from 'react';

import './ContentDialog.css';
import AddTodo from './AddTodo';
import $ from 'jquery';

export default class ContentDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDispFinishedTodolist: 'false'
      // todoFolderInfo: {
      //   // 当前选中folder的名字
      //   folderName: '我的Todo',
      //   // 未完成的todos
      //   unfinishedTodos: [
      //     {todoName: '第一个任务', createTime: '2017/8/6', isFlag: false},
      //     {todoName: '第一个任务', createTime: '2017/8/6', isFlag: false},
      //     {todoName: '第一个任务', createTime: '2017/8/6', isFlag: false},
      //     {todoName: '第一个任务', createTime: '2017/8/6', isFlag: false}
      //   ],
      //   // 已完成的todos
      //   finishedTodos: [
      //     {todoName: '第一个任务', username: 'hexon', finishedTime: '2017/8/7', createTime: '2017/8/6', isFlag: false},
      //     {todoName: '第一个任务', username: 'hexon', finishedTime: '2017/8/7', createTime: '2017/8/6', isFlag: false},
      //     {todoName: '第一个任务', username: 'hexon', finishedTime: '2017/8/7', createTime: '2017/8/6', isFlag: false},
      //     {todoName: '第一个任务', username: 'hexon', finishedTime: '2017/8/7', createTime: '2017/8/6', isFlag: false},
      //   ]
      // }

    };
  };

  getBeforeTime(inputTime) {
    let time = '3小时之前';
    return time;
  }


  onClickFinished(todoWrapName ,e) {
    let $todo = $(e.target).parent().eq(0);
    let $todos = $todo.parent().eq(0).children();
    let index =$todos.index($todo);
    if (index >= 0) {
      this.props.onClickFinished(todoWrapName, index);
    }
  }


  render() {
    console.log('content');
    let unfinishedTodos = this.props.todoFolderInfo.unfinishedTodos.map((item, index) => {
      return (
        <li key={index.toString()} className="todoItem">
          <span className="todo-list-icon todo-list-icon-select" onClick={this.onClickFinished.bind(this, 'unfinishedTodos')}></span>
          <span className="todoName">{item.todoName}</span>
          <span className="todoTime">{item.createTime}</span>
          <span className={"todo-list-icon todo-list-icon-flag-"+item.isFlag}></span>
        </li>
      )
    });

    let finishedTodos = this.props.todoFolderInfo.finishedTodos.map((item, index) => {
      return (
        <li key={index.toString()} className="todoItem">
          <span className="todo-list-icon todo-list-icon-selected" onClick={this.onClickFinished.bind(this, 'finishedTodos')}></span>
          <div className="finishedInfoWrap">
            <div className="todoName">{item.todoName}</div>
            <div className="finishedInfo">
              <span className="finishedTime">{this.getBeforeTime(item.finishedTime)}</span>
              <span className="username">{'由 ' + item.username +' 完成 '}</span>
            </div>
          </div>
          <span className="createTime">{item.createTime}</span>
          <span className={"todo-list-icon todo-list-icon-flag-"+item.isFlag}></span>
        </li>
      );
    });

    return (
      <div className="contentWrap">
        <div className="folder-title-wrap">
          <h3>{this.props.todoFolderInfo.folderName}</h3>
        </div>
        <AddTodo newTodoTitle={this.props.newTodoTitle}
                 onChange={this.props.onChangeNewTodo.bind(this)}
                 onSubmit={this.props.onSubmitAddTodoList.bind(this)}
         />

        <ul className="unfinishedTodoItemsWrap">
          {unfinishedTodos}
        </ul>
        <div className="loadFinishedTodos">
          <button onClick={this.props.onLoadIsDisFinishedTodoList.bind(this)}>显示已完成任务</button>
        </div>
        <ul className="finishedTodoItemsWrap">
          {finishedTodos}
        </ul>
      </div>
    )
  }

}