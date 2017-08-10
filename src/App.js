import React, {
  Component
} from 'react';

import 'normalize.css';
import './reset.css';
import './App.css';


import $ from 'jquery';
import moment from 'moment';

import LoginDialog from './LoginDialog';
import UserDialog from './UserDialog';

import {TodoModel} from './leanCloud';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFolderIndex: 0,
      isActiveAddFolderDialog: false,
      currentTab: 'userDialog', // 或 loginDialog
      user: {},
      accountInfo: {
        // username: '张111',
        // id: '1111',
        // email: '308826842@.com'
      },
      dispAllFinieshedTodoList: false,
      todoInfo: [
        // {
        //   // 清单名称
        //   folderName: '我的一天',
        //   todos: [],
        //   // 未完成的todos
        //   // unfinishedTodos: [
        //   //   // {todoName: '第一个任务', createTime: '2017/8/6', isFlag: false},
        //   // ],
        //   // // 已完成的todos
        //   // finishedTodos: [
        //   //   // {todoName: '第一个任务', username: 'hexon', finishedTime: '2017/8/7', createTime: '2017/8/6', isFlag: false},
        //   // ],
        //   isDispFinishedTodos: false
        //
        // },
        // {
        //   // 清单名称
        //   folderName: '已加标记',
        //   todos: [],
        //   // // 未完成的todos
        //   // unfinishedTodos: [
        //   // ],
        //   // // 已完成的todos
        //   // finishedTodos: [
        //   // ],
        //   isDispFinishedTodos: false
        // },
        // {
        //   // 清单名称
        //   folderName: 'Todo',
        //   todos: [],
        //   // // 未完成的todos
        //   // unfinishedTodos: [
        //   // ],
        //   // // 已完成的todos
        //   // finishedTodos: [
        //   // ],
        //   isDispFinishedTodos: false
        // }
      ],
      newFolder: {},
      newTodo : {
        // title: '', creater: '', time: ''
      },
    };
  }


  onChangeNewTodo(e) {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.newTodo.title = e.target.value;
    this.setState(stateCopy);
  }


  onChangeNewFolder(e) {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.newFolder.title = e.target.value;
    this.setState(stateCopy);
    console.log(e.target.value);
  }


  // 创建清单
  onSubmitAddFolder(folder) {
      let newFolder = {
        id: folder.id,
        // 清单名称
        folderName: folder.folderName,
        // todos
        todos: [
        ],
      };

      console.log('创建清单成功');
      let stateCopy = JSON.parse(JSON.stringify(this.state));
      stateCopy.todoInfo.push(newFolder);
      stateCopy.newFolder.title = '';
      this.setState(stateCopy);
  }

  // 创建todolist
  onSubmitAddTodoList(e) {
    let todoList = {
      todoName: e.target.value,
      isFinished: false,
      isFlag: false
    };

    TodoModel.addTodo.bind(this)( this.state.todoInfo[this.state.currentFolderIndex].id, todoList, (todo) => {
      let stateCopy = JSON.parse(JSON.stringify(this.state));
      stateCopy.todoInfo[stateCopy.currentFolderIndex].todos.unshift(todo);
      stateCopy.newTodo.title = '';
      this.setState(stateCopy);
    });
  }

  // 点击清单回调函数
  curClickFolder(index, e) {
      let stateCopy = JSON.parse(JSON.stringify(this.state));
      stateCopy.currentFolderIndex = index;
      this.setState(stateCopy);
  }

  onLoadIsDisFinishedTodoList(todoFolder, e) {
    let isDisp = todoFolder.isDisplayFinishedTodoList;  //this.state.todoInfo[todoFolder.folderName].isDisplayFinishedTodoList;
    // let stateCopy = JSON.parse(JSON.stringify(this.state));
    isDisp = (isDisp === false) ? true : false;
    todoFolder.isDisplayFinishedTodoList = isDisp;

   // stateCopy.todoInfo[todoFolder.folderName].isDisplayFinishedTodoList= isDisp;
    this.setState(this.state);
  }


  onClickFinished(todo, e) {
    let oldStatus = todo.isFinished;
    todo.isFinished = todo.isFinished === false ? true : false;

    TodoModel.update.bind(this)(todo, (response) => {
      console.log(todo.updateTime);
      todo.updateTime = response.updatedAt;
      this.setState(this.state);
    }, (error) => {
      todo.isFinished = oldStatus;
      this.setState(this.state);
    });
  }

  //   let stateCopy = JSON.parse(JSON.stringify(this.state));
  //   let idx = stateCopy.currentFolderIndex;
  //   console.log(stateCopy.todoInfo[idx][todoWrapName]);
  //   let todoList= stateCopy.todoInfo[idx][todoWrapName].splice(index, 1)[0];
  //
  //   console.log('todo');
  //   console.log(todo);
  //
  //
  //   let time = moment().format('YYYY/MM/DD');
  //
  //   if (todoWrapName === 'unfinishedTodos') {
  //     todoList.username = stateCopy.accountInfo.username;
  //     todoList.finishedTime = time;
  //     stateCopy.todoInfo[stateCopy.currentFolderIndex].finishedTodos.unshift(todoList);
  //   } else {
  //     delete todoList.finishedTime;
  //     todoList.createTime = time;
  //     stateCopy.todoInfo[stateCopy.currentFolderIndex].unfinishedTodos.unshift(todoList);
  //   }
  //   this.setState(stateCopy);
  // }

  reloadTodoInfo(user) {

    if (user) {
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.todoInfo = todos;
        stateCopy.accountInfo = user;
        this.setState(stateCopy);

        console.log('todos');
        console.log(todos);

      });
    }
  }

  initNewUserFolders() {

  }


  onSignInOrSignUp(type, user) {
    if (type === 'signUp') {
      TodoModel.init( (folders) => {
        this.state.todoInfo = folders;
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        // 获取到了用户 user 账号信息
        stateCopy.accountInfo= user;
        this.setState(stateCopy);

      }, (error) => {
      })
    } else if (type === 'signIn') {
      this.reloadTodoInfo(user);
    }
  }

  onSubmitEditFolder({folderName, isDelete, id}) {
    let stateCopy = JSON.parse(JSON.stringify(this.state)) ;
    stateCopy.todoInfo[stateCopy.currentFolderIndex].folderName = folderName;
    stateCopy.todoInfo[stateCopy.currentFolderIndex].isDelete = isDelete;
    this.setState(stateCopy);
  }


  render() {
    console.log('更新');
    console.log(this.state.accountInfo.id);
    return (
      <div className="container">
        {this.state.accountInfo.id
          ?
          <UserDialog user={this.state.accountInfo}
                      todoInfo={this.state.todoInfo}
                      onClickFolder={this.curClickFolder.bind(this)}

                      curFolder={this.state.currentFolderIndex}
                      newTodoTitle={this.state.newTodo.title}
                      newFolderTitle={this.state.newFolder.title}
                      onSubmitAddFolder={this.onSubmitAddFolder.bind(this)}
                      onSubmitAddTodoList={this.onSubmitAddTodoList.bind(this)}
                      onChangeNewTodo={this.onChangeNewTodo.bind(this)}
                      onChangeNewFolder={this.onChangeNewFolder.bind(this)}
                      onLoadIsDisFinishedTodoList={this.onLoadIsDisFinishedTodoList.bind(this)}
                      onClickFinished={this.onClickFinished.bind(this)}
                      onSubmitEditFolder={this.onSubmitEditFolder.bind(this)}
         />
          :
          <LoginDialog onSignIn={this.onSignInOrSignUp.bind(this)}
                       onSignUp={this.onSignInOrSignUp.bind(this)}
          />
        }

      </div>
    );
  }
}



var te = 1;

 export default App;