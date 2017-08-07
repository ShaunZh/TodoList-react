import React, {
  Component
} from 'react';

import 'normalize.css';
import './reset.css';
import './App.css';

import LoginDialog from './LoginDialog';
import UserDialog from './UserDialog';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'userDialog', // 或 loginDialog
      todoInfo: [
        {
          // 清单名称
          folderName: '我的一天',
          // 未完成的todos
          unfinishedTodos: [
            {todoName: '第一个任务', createTime: '2017/8/6', isFlag: false},
            {todoName: '第一个任务', createTime: '2017/8/6', isFlag: false},
            {todoName: '第一个任务', createTime: '2017/8/6', isFlag: false},
          ],
          // 已完成的todos
          finishedTodos: [
            {todoName: '第一个任务', username: 'hexon', finishedTime: '2017/8/7', createTime: '2017/8/6', isFlag: false},
            {todoName: '第一个任务', username: 'hexon', finishedTime: '2017/8/7', createTime: '2017/8/6', isFlag: false},
            {todoName: '第一个任务', username: 'hexon', finishedTime: '2017/8/7', createTime: '2017/8/6', isFlag: false},
          ]
        },
        {
          // 清单名称
          folderName: '已加标记',
          // 未完成的todos
          unfinishedTodos: [
          ],
          // 已完成的todos
          finishedTodos: [
          ]
        },
        {
          // 清单名称
          folderName: 'Todo',
          // 未完成的todos
          unfinishedTodos: [
          ],
          // 已完成的todos
          finishedTodos: [
          ]
        }
      ]
    };
  }

  render() {
    return (
      <div className="container">
        {this.state.currentTab === 'loginDialog' ?
          <LoginDialog /> :
          <UserDialog todoInfo={this.state.todoInfo}/>
        }
      </div>
    );
  }
}



var te = 1;

 export default App;