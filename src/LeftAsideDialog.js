/**
 * @Author: Hexon
 * @Date: 2017/8/4
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/4
 */
import './LeftAsideDialog.css'


import React, {Component} from 'react';
import TopSearch from './TopSearch';
import Account from './Account';
import TodoFolder from './TodoFolder';
import CreateFolder from './CreateFolder';



export default class LeftAsideDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStr: '',
      accountInfo: {
        username: '大风筝的小小马'
      },
      todoFolders: [
        {name: '我的一天', todoListSum: 0, isDelete: false, iconClassName: 'todo-folder-icon-day'},
        {name: '已加标记', todoListSum: 0, isDelete: false, iconClassName: 'todo-folder-icon-flag'},
        {name: 'Todo', todoListSum: 0, isDelete: false, iconClassName: 'todo-folder-icon-todo'},
        {name: '前端学习', todoListSum:0 , isDelete: true, iconClassName: 'todo-folder-icon-default'}
      ]
    };
  };

  searchTodo(key, e) {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.searchStr = e.target.value;
    this.setState(stateCopy);
  };


  render() {

    let todoFolders = this.state.todoFolders.map((item, index) => {
      return (
        <TodoFolder key={index.toString()} info={item}
          />
      );
    });


    return (
      <div className="leftAsideWrap">
        <TopSearch searchStr={this.state.searchStr}
                   searchTodo={this.searchTodo.bind(this)}
        />

        <Account accountInfo={this.state.accountInfo}/>
        <div className="todoFolderItemWrap">
          {todoFolders}
        </div>
        <CreateFolder />
      </div>
    );
  }
}
