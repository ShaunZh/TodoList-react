/**
 * @Author: Hexon
 * @Date: 2017/8/4
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/4
 */ 
import React, {Component} from 'react';
import TopSearch from './TopSearch';
import Account from './Account';
import TodoFolder from './TodoFolder';
import CreateFolder from './CreateFolder';

export default class LeftAsideDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      defaultTodoFolder: [
        {name: '我的一天', todoListSum: 0},
        {name: '已加标记', todoListSum: 0},
        {name: 'Todo', todoListSum: 0},
      ],
      userTodoFolder: [
        {name: '前端学习', todoListSum:0 }
      ]
    };
  };

  dispTodoFolderItem() {
    this.state.defaultTodoFolder.forEach((item) => {
      <TodoFolder info={item} />
    });

    this.state.userTodoFolder.forEach((item) => {
      <TodoFolder info={item} />
    });
  };

  render() {
    return (
      <div className="leftAsideWrap">
        <TopSearch/>
        <Account />
        <div className="todoFolderItemWrap">
          {this.dispTodoFolderItem()}
        </div>
        <CreateFolder />
      </div>
    );
  }
}
