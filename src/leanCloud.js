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
  getByUser(user, successFn, errorFn) {
    let foldersQuery = new AV.Query('TodoFolder');
    let todosQuery = new AV.Query('Todo');
    todosQuery.include('folderObj');
    todosQuery.find().then( (todos) => {
      let arr = [];
      todos.forEach((item, index) => {
        let obj = {};
        let folder = todos.get('folderObj').get('folderName');
        console.log(todos.get('folderObj'));
        obj[folder] = item;
        arr.push(obj);
      });
      foldersQuery.find().then( (folders) => {
        folders.forEach((folder, index)=> {
          for (var i = 0; i < arr.length; i++) {
            if (folder.get('folderName') in arr[i]) {
              break;
            }
          }
          if (i === arr.length) {
            arr.push(
              {
                folderName: folder.get('folderName'),
                todos: []
              }
            );
          }
        });
        console.log(arr);
        successFn.call(null, arr);
      });
    }, (error) => {
      errorFn && errorFn.call(null, error);
    })
  },

  createFolder(title, successFn, errorFn) {
    let TodoFolder = AV.Object.extend('TodoFolder');
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
  addTodo(folderId, {title, isFinished, isFlag}, successFn, errorFn) {
    let todoFolder = AV.Object.createWithoutData('TodoFolder', folderId);
    let Todo = AV.Object.extend('Todo');
    let todo = new Todo();
    todo.set('todoName', title);
    todo.set('isFinished', isFinished);
    todo.set('isFlag', isFlag);
    todo.set('folderObj', todoFolder);

    let acl = new AV.ACL();
    acl.setPublicReadAccess(false);
    acl.setWriteAccess(AV.User.current(), true);
    acl.setReadAccess(AV.User.current(), true);
    todo.setACL(acl);

    todo.save().then( (response) => {
      console.log('add todo ok');
      successFn.call(null, response.id);
    }, (error) => {
      console.log('add todo fail!!!');
      errorFn & errorFn.call(null, error);
    });
  },

  // 更新TodoFolder：主要是修改Folder name
  updateTodoFolder({folderId, title}, successFn, errorFn) {
    let todoFolder = AV.Object.createWithoutData('TodoFolder', folderId);
    title !== undefined && todoFolder.set('folderName', title);
    todoFolder.save().then( (response) => {
      successFn && successFn.call(null);
    }, (error) => {
      errorFn && errorFn.call(null, error);
    });
  },

  update({id, title, status, deleted}, successFn, errorFn) {

    console.log('进来了');
    console.log(id);
    console.log(title);
    console.log(status);
    console.log(deleted);
    let todo = AV.Object.createWithoutData('Todo', id);
    console.log(id);
    title !== undefined && todo.set('todoName', title);
    status !== undefined && todo.set('status', status);
    deleted !== undefined && todo.set('deleted', deleted);
    todo.save().then((response) => {
      successFn && successFn.call(null);
    }, (error) => errorFn && errorFn.call(null, error))
  },

  destroy(todoId, successFn, errorFn) {
    // let todo = AV.Object.createWithoutData('Todo', todoId);
    // todo.destroy().then(function(response) {
    //   successFn && successFn.call(null);
    // }, function(error) {
    //   errorFn && errorFn.call(null, error);
    // })
    TodoModel.update({id: todoId, deleted: true}, successFn, errorFn);
  },
  init(successFn, errorFn) {
    let folders = [];
    let foldersName = ['我的一天', '已加标记', 'Todo'];
    for (var i = 0; i < 3; i++ ) {
      let TodoFolder = AV.Object.extend('TodoFolder');
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
        return {id: item.id,  todos: [], ...item.attributes};
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

