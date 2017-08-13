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

import {TodoModel, signOut, getCurrentUser, sendPasswordResetEmail} from './leanCloud';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFolderIndex: 0,
      isActiveAddFolderDialog: false,
      currentTab: 'userDialog', // 或 loginDialog
      user: {},
      accountInfo: getCurrentUser() || {
        // username: '张111',
        // id: '1111',
        // email: '308826842@.com'
      },
      dispAllFinieshedTodoList: false,
      todoInfo: [
        {
          // 清单名称
          folderName: '我的一天',
          todos: [],
          isDispFinishedTodos: false

        },
        {
          // 清单名称
          folderName: 'Todo',
          todos: [],
          isDispFinishedTodos: false
        }
      ],
      newFolder: {},
      newTodo : {
        // title: '', creater: '', time: ''
      },
    };
    if (this.state.accountInfo) {
      this.reloadTodoInfo(this.state.accountInfo);
    }

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
      todo.updateTime = response.updatedAt;
      this.setState(this.state);
    }, (error) => {
      todo.isFinished = oldStatus;
      this.setState(this.state);
    });
  }

  createFlagInfo(todoInfo) {
    let flagTodos = [];
    for (let folder = 0; folder < todoInfo.length; folder++) {
      for (let i = 0; i < todoInfo[folder].todos.length; i++) {
        if (todoInfo[folder].todos[i].isFlag === true) {
          flagTodos.push(todoInfo[folder].todos[i]);
        }
      }
    }
    return flagTodos;
  }
  reloadTodoInfo(user) {

    if (user) {
      let _this = this;
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(_this.state));
        if (todos.length > 0) {
          // 对服务器中获取的数据 与 本地数据进行比较， 并将最终数据输出给todoInfo
          stateCopy.todoInfo = todos;
        }
        stateCopy.accountInfo = user;
        this.setState(stateCopy);
      });
    }
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
    // 说明当前选中的 folder被删除，需要重新设置当前指定的fodler
    if (isDelete === true) {
      stateCopy.todoInfo.splice(stateCopy.currentFolderIndex, 1);
      if (stateCopy.currentFolderIndex === stateCopy.todoInfo.length) {
        stateCopy.currentFolderIndex--;
      }
    }
    this.setState(stateCopy);
  }

  onClickTodoFlag(todo, e) {
  }


  onClickDeleteTodo(index, e) {
    let todo = this.state.todoInfo[this.state.currentFolderIndex].todos[index];
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    let _this = this;
    TodoModel.destroyTodo(todo.id, (response) => {
      stateCopy.todoInfo[stateCopy.currentFolderIndex].todos.splice(index, 1);
      _this.setState(stateCopy);
    }, (error) => {})
  }


  onLogout() {
    signOut();
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.accountInfo = {};
    this.setState(stateCopy);
  }


  render() {
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
                      onClickTodoFlag={this.onClickTodoFlag.bind(this)}
                      onClickDeleteTodo={this.onClickDeleteTodo.bind(this)}
                      onLogout={this.onLogout.bind(this)}
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