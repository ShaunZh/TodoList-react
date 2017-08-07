import React, {
  Component
} from 'react';

import 'normalize.css';
import './reset.css';
import './App.css';


import $ from 'jquery';

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
      ],
      newFolder: {},
    };
  }


  // 创建清单
  onSubmitNewFolder(e) {
    let $target = $(e.target);
    let title = '';
    if ($target.get(0).tagName.toLowerCase() === 'input') {
      title = $target.val('');
    } else if ($target.get(0).tagName.toLowerCase() === 'button') {
      title = $target.parent().eq(0).siblings('input').val();
      $target.parent().eq(0).siblings('input').val('');
    }
    if (title !== '') {
      let newFolder = {
        // 清单名称
        folderName: title,
          // 未完成的todos
        unfinishedTodos: [
        ],
        // 已完成的todos
         finishedTodos: [
        ]
      };

      let stateCopy = JSON.parse(JSON.stringify(this.state));
      stateCopy.todoInfo.push(newFolder);
      this.setState(stateCopy);
    }
  }



  render() {
    console.log('更新');
    return (
      <div className="container">
        {this.state.currentTab === 'loginDialog' ?
          <LoginDialog /> :
          <UserDialog todoInfo={this.state.todoInfo}
          onSubmitNewFolder={this.onSubmitNewFolder.bind(this)}/>
        }
      </div>
    );
  }
}



var te = 1;

 export default App;