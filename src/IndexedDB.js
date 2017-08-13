/**
 * @Author: Hexon
 * @Date: 2017/8/13 14:30
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/13 14:30
 */






const IndexedDB = (function () {
    let indexedDB = window.indexedDB || window.msIndexedDB || window.mozIndexedDB || window.webkitIndexedDB;
    let IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"};
    let IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    let IDBCursor = window.IDBCursor || window.webkitIDBTransaction;
    let isSupportIndexedDB = true;
    let database;
    if (!window.indexedDB) {
       isSupportIndexedDB = false;
      window.alert('你的浏览器不支持IndexedDB数据库，所以将无法离线使用');
    } else {
    }


  // 判断数据库是否存在，
  // 如果不存在，则创建，并读取服务器端数据，然后返回数据库对象
  // 如果存在， 则根据更新时间来判断哪些本地数据需要上传到服务器，或者服务器数据需要同步到本地
  function init (username, todos, successFn, errorFn) {
    let request =  indexedDB.open('TodoList-Wanzi', 5);
    request.onerror = (event) => {
      window.alert('数据库打开失败');
    };

    request.onsuccess = (event) => {
      database = event.target.result;
        // 如果没有出现错误，说明该对象存储空间是第一次被创建，因此要存储数据到IndexedDB
         saveData(username, todos);
        successFn && successFn.call(null,  getData(username));
    };

    // 如果open() 方法打开数据库成功，则会触发onupgradeneeded事件
     request.onupgradeneeded = (event) => {
       database = event.target.result;
         // 创建一个对象存储空间： TodoList
         let store = database.createObjectStore(username, {keyPath: "todoId"});
         store.createIndex('todoName', 'todoName', {unique: false});
         store.createIndex('isFinished', 'isFinished', {unique: false});
         // 如果没有出现错误，说明该对象存储空间是第一次被创建，因此要存储数据到IndexedDB
      //
      //  request.onerror = (event) => {
      //   window.alert("数据库加载失败: " + event.target.errorCode);
      // };
      //  request.onsuccess = (event) => {
      //   window.alert("数据库初始化成功");
      // }
    };
  }


  function reload(username, successFn, errorFn) {
    let objectStore = database.transaction(username, 'readwrite').objectStore(username);
    // 查找指定用户的数据
    let keyRange =  IDBKeyRange.only(username);
    objectStore.openCursor(keyRange).onsuccess = (event) => {
      // 获得游标对象
      let cursor = event.target.result;
      // 判断对象是否存在
      if (cursor) {
        console.log("获得了IndexedDB数据: " + JSON.stringify(cursor.value));
        successFn && successFn.call(null, cursor.value);
      } else {
        console.log('没有获得游标对象')
      }
    }
  }

  function saveData(username, datas) {
    let transaction = database.transaction(username, 'readwrite');
    let store = transaction.objectStore(username);
    let request;
    datas.forEach((item) => {
      request = store.add(item);
      request.onerror = (error) => {

      };
      request.onsuccess = () => {

      };
    });

    transaction.onsuccess = () => {
      console.log('保存todo数据完成')
    };

    transaction.onerror = () => {
      console.log('保存todo数据失败')
    };
  }

  function getData(username) {
    let transaction = database.transaction(username, 'readonly');
    let store = transaction.objectStore(username);
    let request = store.openCursor();
    let todos = [] ;

    request.onsuccess = (event) => {
      // 获得游标对象
      let cursor = event.target.result;
      // 判断对象是否存在
      if (cursor) {
        todos.push(cursor.value);
        console.log("获得的todo数据: " + JSON.stringify(cursor.value));
        //移动到下一个
        cursor.continue();
      } else {
        if (todos.length > 0) {
          console.log('通过游标获取数据成功');
          return todos;
        }
      }
    };
    request.onerror = (error) => {
      console.log('获取游标对象失败');
    }
  }

  function addData(username, todo) {
    let transaction = database.transaction(username, 'readwrite');
    let store = transaction.objectStore(username);
    let request;
    request = store.add(todo);
    request.onerror = (error) => {

    };
    request.onsuccess = () => {

    };
  }

  function deleteData(username, todo) {
    let transaction = database.transaction(username, 'readwrite');
    let store = transaction.objectStore(username).delete(todo.todoId);
    console.log('删除成功')
  }

  function modifyData(username, todo) {
    let transaction = database.transaction(username, 'readwrite');
    let store = transaction.objectStore(username);
    let request;
    request = store.put(todo);
    request.onerror = (error) => {

    };
    request.onsuccess = () => {

    };
  }
  return {
    init: init,


  }
})();

export default IndexedDB;