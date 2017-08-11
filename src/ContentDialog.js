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
import moment from 'moment';
import DeleteDialog from './DeleteDialog';

export default class ContentDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDispFinishedTodolist: 'false',
      selectTodo: {},
      selectTodoIndex: 0,

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


  // 弹出删除对话框
  onDelete(item, e) {
    let $deleteDialog = $('.contentWrap').find('.deleteDialog').eq(0);
    let $fade = $('.fade').eq(0);
    $fade.addClass('fade-active');

    $deleteDialog.css({'display':'block'});
    $deleteDialog.animate({
      top: '25%'
    }, 100, () =>{

    });
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.selectTodo = item;
    stateCopy.selectTodoIndex = this.props.todoFolderInfo.todos.indexOf(item);
    this.setState(stateCopy);
  }

  // 删除对话框中的取消键回调函数
  onCancelDelete(e) {
    let $deleteDialog = $('.contentWrap').find('.deleteDialog').eq(0);
    let $fade = $('.fade').eq(0);
    $fade.removeClass('fade-active');
    $deleteDialog.css({
      'display': 'none'
    });
    this.setState(this.state);
  }

  // 删除对话框中的确认键回调函数
  onConfirmDelete(e) {
    let $deleteDialog = $('.contentWrap').find('.deleteDialog').eq(0);
    let $fade = $('.fade').eq(0);
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    $deleteDialog.css({'display': 'none'});
    $fade.removeClass('fade-active');

    this.props.onClickDeleteTodo(this.state.selectTodoIndex);
  }

  render() {
    // let todos = this.props.todoFolderInfo.todos.map((item, index) => {
    //   return (
    //     <li key={index.toString()} className="todoItem">
    //       <span className="todo-list-icon todo-list-icon-select" onClick={this.onClickFinished.bind(this, 'unfinishedTodos')}></span>
    //       <span className="todoName">{item.title}</span>
    //       <span className="todoTime">{item.createTime}</span>
    //       <span className={"todo-list-icon todo-list-icon-flag-"+item.isFlag}></span>
    //     </li>
    //   )
    // });
    let unfinishedTodos, finishedTodos;
    if (this.props.todoFolderInfo && this.props.todoFolderInfo.todos.length) {
       unfinishedTodos = this.props.todoFolderInfo.todos
        .filter( (item) => {return (item.isFinished === false);})
        .map( (item, index) => {
          return (
            <li key={index.toString()} className="todoItem">
              <span className="todo-list-icon todo-list-icon-select" onClick={this.props.onClickFinished.bind(this, item)} title="点击完成任务"></span>
              <span className="todoName">{item.todoName}</span>
              <span className="todoTime">{moment(item.updateTime).format('YYYY/MM/DD HH:mm')}</span>
              <span className={"todo-list-icon todo-list-icon-flag-delete"} onClick={this.onDelete.bind(this, item)} title="点击删除任务"></span>
            </li>
          );
        });

      finishedTodos = this.props.todoFolderInfo.todos
        .filter( (item) => {return (item.isFinished === true); })
        .map((item, index) => {
          return (
            <li key={index.toString()} className="todoItem">
              <span className="todo-list-icon todo-list-icon-selected" onClick={this.props.onClickFinished.bind(this, item)}></span>
              <div className="finishedInfoWrap">
                <div className="todoName">{item.todoName}</div>
                <div className="finishedInfo">
                  <span className="finishedTime">{}</span>
                  <span className="username">{'由 ' + this.props.user.username +' 完成 '}</span>
                </div>
              </div>
              <span className="createTime">{moment(item.updateTime).format('YYYY/MM/DD HH:mm')}</span>
              <span className={"todo-list-icon todo-list-icon-flag-delete"} onClick={this.onDelete.bind(this, item)} title="点击删除任务"></span>
            </li>
          );
        });

    }
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
          {/*{this.props.todoFolderInfo.isDelete ? null : unfinishedTodos}*/}
          {unfinishedTodos ? unfinishedTodos : null}
        </ul>
        <div className="loadFinishedTodos">
          <button onClick={this.props.onLoadIsDisFinishedTodoList.bind(null, this.props.todoFolderInfo)}>显示已完成任务</button>
        </div>
        <ul className="finishedTodoItemsWrap">
          {/*{(this.props.todoFolderInfo.isDisplayFinishedTodoList || this.props.todoFolderInfo.isDelete )? null : finishedTodos}*/}
          {finishedTodos && this.props.todoFolderInfo.isDisplayFinishedTodoList  ? null : finishedTodos}
        </ul>
        <DeleteDialog title={this.state.selectTodo.todoName}
                      onCancel={this.onCancelDelete.bind(this)}
                      onConfirm={this.onConfirmDelete.bind(this)}
        />
      </div>
    )
  }

}
