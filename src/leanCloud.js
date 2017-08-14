/**
 * @Author: Hexon
 * @Date: 2017/8/7 18:52
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/7 18:52
 */
/*
 * @Author: Marte
 * @Date:   2017-07-31 17:33:07
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-08-02 16:44:50
 */

import AV from 'leancloud-storage';

var APP_ID = 'z4xch4Exr8u8GEfhGO2lndxC-gzGzoHsz';
var APP_KEY = 'BT2W1RyXotxlyoeOs6nwcBFv';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});


export default AV

export const TodoModel = {


  getFlagTodos(seccessFn, errorFn) {
    let todosQuery = new AV.Query('Todo2');
    todosQuery.include('folderObj');
    todosQuery.equalTo('isFlag', true);
    todosQuery.find().then( (todos) => {
      todos = todos.map( (todo) => {
        return {
          id: todo.id,
          ...todo.attributes
        };
      });
      seccessFn && seccessFn.call(null, todos);
    }, (error) => {
      error && errorFn.call(null);
    });
  },

  getByUser(user, successFn, errorFn) {
    let foldersQuery = new AV.Query('TodoFolder2')
    let todosQuery = new AV.Query('Todo2');
    todosQuery.include('folderObj');
    todosQuery.find().then( (todos) => {
      let arr = [];
      let obj = {};

      todos.forEach((item, index) => {
        let folder = item.get('folderObj').get('folderName');
        // todo的id、createTime和updateTime 并未手动存储于服务器上，而是从服务器上获取，然后输出
        item.attributes.id = item.id;
        item.attributes.createTime = item.createdAt;
        item.attributes.updateTime = item.updatedAt;
        if (!(folder in obj)) {
          obj[folder] = [];
        }
        obj[folder].push(item.attributes);
      });

      foldersQuery.find().then( (folders) => {
        folders.filter((folder) => {return !folder.get('isDelete')})
          .forEach((folder, index)=> {
            if (folder.get('folderName') in obj) {
              arr.push({
                id: folder.get('objectId'),
                folderName: folder.get('folderName'),
                todos: obj[folder.get('folderName')],
                isDisplayFinishedTodoList: false,
              });
            } else {
              arr.push(
                {
                  id: folder.get('objectId'),
                  folderName: folder.get('folderName'),
                  todos: [],
                  isDisplayFinishedTodoList: false,
                }
              );
            }
        });
        // this.getFlagTodos( (flagTodos) => {
        //   if (flagTodos.length) {
        //     arr.splice(2, 0, {
        //       rootFlag: true,
        //       id: '0',
        //       folderName: '已加标记',
        //       todos: flagTodos,
        //       isDisplayFinishedTodoList: false
        //     });
        //   }
        //   successFn.call(null, arr);
        // });
        successFn.call(null, arr);
      });
    }, (error) => {
      errorFn && errorFn.call(null, error);
    })
  },

  createFolder(title, successFn, errorFn) {
    let TodoFolder = AV.Object.extend('TodoFolder2');
    let todoFolder = new TodoFolder();

    todoFolder.set('folderName', title);

    let acl = new AV.ACL();
    acl.setPublicReadAccess(false);
    acl.setWriteAccess(AV.User.current(), true);
    acl.setReadAccess(AV.User.current(), true);
    todoFolder.setACL(acl);

    todoFolder.save().then(function (response) {
      console.log('ok');
      successFn && successFn.call(null, response.id);
    }, function(error) {
      console.log('error');
      errorFn && errorFn.call(null, error);
    });
  },

  // folderId 为要添加todo的folder 的 id
  addTodo( folderId, {todoName, isFinished, isFlag}, successFn, errorFn) {

    let todoFolder = AV.Object.createWithoutData('TodoFolder2', folderId);
    let Todo = AV.Object.extend('Todo2');
    let todo = new Todo();
    todo.set('todoName', todoName);
    todo.set('isFinished', isFinished);
    todo.set('isFlag', isFlag);
    todo.set('folderObj', todoFolder);

    let acl = new AV.ACL();
    acl.setPublicReadAccess(false);
    acl.setWriteAccess(AV.User.current(), true);
    acl.setReadAccess(AV.User.current(), true);
    todo.setACL(acl);

    todo.save().then( (response) => {
      successFn.call(this, {
         id: response.id,
         todoName: response.attributes.todoName,
         folderObj: response.attributes.folderObj,
         isFinished: response.attributes.isFinished,
         isFlag: response.attributes.isFlag,
         createTime: response.createdAt,
         updateTime: response.updatedAt
      });
    }, (error) => {
      console.log('add todo fail!!!');
      errorFn & errorFn.call(null, error);
    });
  },


  // deleteTodo({id, todoName}) {
  //   let todo = AV.Object.createWithoutData('Todo', todoId);
  //   todo.destroy().then(function(response) {
  //     successFn && successFn.call(null);
  //   }, function(error) {
  //     errorFn && errorFn.call(null, error);
  //   });
  // },

  deleteFolder(id, fodlerName) {
    let todosQuery = new AV.Query('Todo2');
    let todoFolder = AV.Object.createWithoutData('TodoFolder2', id);
    todosQuery.include('folderObj');
    todosQuery.equalTo('folderObj', todoFolder);
    todosQuery.find().then( (response) => {
      AV.Object.destroyAll(response);
    });
  },

  // 更新TodoFolder：主要是修改Folder name
  updateTodoFolder({id, folderName, isDelete}, successFn, errorFn) {
    let _this = this;
    let todoFolder = AV.Object.createWithoutData('TodoFolder2', id);

    if (isDelete === true) {
      // 删除todoFolder
      todoFolder.destroy().then(function() {
        _this.deleteFolder(id, folderName);
        successFn && successFn.call(null);
      }, function(error) {
        errorFn && errorFn.call(null, error);
      })
    } else {

      folderName !== undefined && todoFolder.set('folderName', folderName);
      todoFolder.save().then( () => {
        successFn && successFn.call(null);
      }, (error) => {
        errorFn && errorFn.call(null, error);
      });

    }
  },

  update({id, todoName,  isFinished, isFlag}, successFn, errorFn) {
    let todo = AV.Object.createWithoutData('Todo2', id);
    todoName !== undefined && todo.set('todoName', todoName);
    isFinished !== undefined && todo.set('isFinished', isFinished);
    isFlag !== undefined && todo.set('isFlag', isFlag);

    todo.save().then((response) => {
      successFn && successFn.call(this, response);
    }, (error) => errorFn && errorFn.call(this, error))
  },

  destroyTodo(todoId, successFn, errorFn) {
    let todo = AV.Object.createWithoutData('Todo2', todoId);
    todo.destroy().then(function(response) {
      successFn && successFn.call(null);
    }, function(error) {
      errorFn && errorFn.call(null, error);
    })
  },
  init(successFn, errorFn) {
    let folders = [];
    let foldersName = ['我的一天', 'Todo'];
    for (var i = 0; i < 2; i++ ) {
      let TodoFolder = AV.Object.extend('TodoFolder2');
      let todoFolder = new TodoFolder();
      todoFolder.set('folderName', foldersName[i]);

      let acl = new AV.ACL();
      acl.setPublicReadAccess(false);
      acl.setWriteAccess(AV.User.current(), true);
      acl.setReadAccess(AV.User.current(), true);
      todoFolder.setACL(acl);

      folders.push(todoFolder);
    }


    AV.Object.saveAll(folders).then( (response) => {
      let folders = response.map((item) => {
        return {id: item.id, isDisplayFinishedTodoList: false, isDelete: false, todos: [], ...item.attributes};
      });
      successFn & successFn.call(null, folders);
    }, (error) => {
      errorFn && errorFn.call(null, error);
    });
  }
}


export function signUp(email, username, password, successFn, errorFn) {
  // 新建 AVUser 对象实例
  let user = new AV.User();
  // 设置用户名
  user.setUsername(username);
  // 设置邮箱
  user.setEmail(email);
  // 设置密码
  user.setPassword(password);
  user.signUp().then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser);
    successFn.call(null, user);
  }, function(error) {
    errorFn.call(null, error);
  });

  return undefined;
}

export function signIn(username, password, successFn, errorFn) {
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser);
    successFn.call(null, user);
  }, function (error) {
    errorFn.call(null, error);
  })
}

export function getCurrentUser() {
  let user = AV.User.current();
  if (user) {
    return getUserFromAVUser(user);
  } else {
    return null;
  }
}

export function signOut() {
  AV.User.logOut();
  return undefined;
}

export function sendPasswordResetEmail(email, successFn, errorFn) {
  AV.User.requestPasswordReset(email).then(function (success) {
    successFn.call();
  }, function(error) {
    errorFn.call(null, error);
  })
}

function getUserFromAVUser(AVUser) {
  return {
    id: AVUser.id,
    // ES6语法，表示导出AVUser.attributes
    ...AVUser.attributes
  }
}

