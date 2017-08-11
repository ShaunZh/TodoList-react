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

import {TodoModel, signOut, getCurrentUser} from './leanCloud';



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
        stateCopy .todoInfo = todos;
        // let flagTodos = [];
        // for (let folder = 0; folder < _this.state.todoInfo.length; folder++) {
        //   for (let i = 0; i < _this.state.todoInfo[folder].todos.length; i++) {
        //     if (_this.state.todoInfo[folder].todos[i].isFlag === true) {
        //       flagTodos.push(_this.state.todoInfo[folder].todos[i]);
        //     }
        //   }
        // }
        // if (flagTodos.length > 0) {
        //    _this.state.todoInfo.splice(2, 0, {
        //      rootFlag: true,
        //      id: '0',
        //      folderName: '已加标记',
        //      todos: flagTodos,
        //      isDisplayFinishedTodoList: false
        //    });
        // }
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
    console.log('flag');
//    let oldFlag= todo.flag;
//    // let todoIndex =
//
//    todo.isFlag = todo.isFlag === false ? true : false;
//    TodoModel.update.bind(this)(todo, (response) => {
//      let stateCopy = JSON.parse(JSON.stringify(this.state));
//      let todoIndex = stateCopy.todoInfo[this.state.currentFolderIndex].todos.indexOf(todo);
//      stateCopy.todoInfo[stateCopy.currentFolderIndex].todos[todoIndex].isFlag = todo.isFlag;
//      stateCopy.todoInfo[stateCopy.currentFolderIndex].todos[todoIndex].updateTime = response.updatedAt;
//
//      // if (todo.isFlag === true) {
//      //   if (this.state.todoInfo.length >= 3 && 'rootFlag' in this.state.todoInfo[2]) {
//      //     this.state.todoInfo[2].todos.push(todo);
//      //   } else {
//      //     // 创建 已加标记 清单
//      //     this.state.todoInfo.splice(2, 0, {
//      //       rootFlag: true,
//      //       id: '0',
//      //       folderName: '已加标记',
//      //       todos: [],
//      //       isDisplayFinishedTodoList: false
//      //     });
//      //     this.state.todoInfo[2].todos.push(todo);
//      //   }
//      // } else {
//      //   this.state.todoInfo[2].todos = this.state.todoInfo[2].todos.filter((item) => {
//      //     return item.isFlag;
//      //   })
//      //   if (this.state.todoInfo[2].todos.length <= 0) {
//      //     this.state.todoInfo.splice(2, 1);
//      //   }
//      // }
//      // this.setState(this.state);
//
//      // 设置标志
//      if (todo.isFlag === true) {
//        // 说明已加标记清单存在&
//            if (stateCopy .todoInfo.length >= 3 & 'rootFlag' in stateCopy.todoInfo[2]) {
//          stateCopy.todoInfo[2].todos.push(todo);
//        } else {
//          // 创建 已加标记 清单
//          stateCopy.todoInfo.splice(2, 0, {
//            rootFlag: true,
//            id: '0',
//            folderName: '已加标记',
//            todos: [],
//            isDisplayFinishedTodoList: false
//          });
//          stateCopy.todoInfo[2].todos.push(todo);
//        }
//      } else {
//        // 如果是清除 todo的flag标志
//        if (stateCopy.todoInfo[2].todos.length <= 1) {
//          // 如果已加标记清单中只有一个todo，此时清除该todo的flag标志后，标记清单中没有了todo ，因此将标记清单清除
//          stateCopy.todoInfo.splice(2, 1);
//        } else {
//          // 这一步清除 flag 时 要分为两种情况进行处理：在非 已加标志 清单中清除标志，在已加标志 清单中清除标志
//          //
//          if (stateCopy.currentFolderIndex !== 2) {
//            stateCopy.todoInfo[2].todos = stateCopy.todoInfo[2].todos.filter((item) => {
//              // 根据id 来判断当前清除的是哪个todo的标志
//              return (todo.id !== item.id);
//            })
//          }
//        }
//      }
//      this.setState(stateCopy);
//    }, (error) => {
//       todo.isFlag = oldFlag;
//       this.setState(this.state);
//     });
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
    stateCopy.currentFolderIndex = 0;
    stateCopy.accountInfo.id = '';
    stateCopy.todoInfo = [];
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