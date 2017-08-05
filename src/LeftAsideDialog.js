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
      accountInfo: {
        username: '放风筝的小小马'
      },
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


  render() {

    let defaultTodoFolders = this.state.defaultTodoFolder.map((item, index) => {
      return (
        <TodoFolder info={item} />
      );
    });
    let userTodoFolders = this.state.userTodoFolder.map((item, index) => {
      return (
        <TodoFolder info={item} />
      );
    });

    return (
      <div className="leftAsideWrap">
        <TopSearch/>
        <Account accountInfo={this.state.accountInfo}/>
        <div className="todoFolderItemWrap">
          {defaultTodoFolders}
          {userTodoFolders}
        </div>
        <CreateFolder />
      </div>
    );
  }
}
