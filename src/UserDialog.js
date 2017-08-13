/*
* @Author: Marte
* @Date:   2017-08-03 21:29:27
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-03 21:30:21
*/
import './UserDialog.css'
import React from 'react';
import LeftAsideDialog from './LeftAsideDialog';

import $ from 'jquery';
import ContentDialog from './ContentDialog';
import CreateFolder from './CreateFolder';
import EditDialog from './EditDialog';

import {TodoModel, signOut} from './leanCloud';
import IndexedDB from './IndexedDB';

// 显示 addFolderDialog
function dispAddFolderDialog(){
  let $addFolderDialog = $('.createFolder').eq(0);
  let $fade = $('.fade').eq(0);

  $addFolderDialog.css({'display': 'block'});
  $fade.addClass('fade-active');
  $addFolderDialog.animate({
    top: "25%",
  }, 100, () => {

  });
}

// 隐藏 addFolderDialog
function hideAddFolderDialog() {
  let $addFolderDialog = $('.createFolder').eq(0);
  let $fade = $('.fade').eq(0);

  $fade.removeClass('fade-active');
  $addFolderDialog.css({'display': 'none'});

}



// 显示 editFolderDialog
function dispEditFolderDialog() {
  let $editDialog = $('.editDialog').eq(0);
  let $fade = $('.fade').eq(0);

  $editDialog.css({'display': 'block'});
  $fade.addClass('fade-active');
  $editDialog.animate({
    top: "25%",
  }, 100, () => {
  });
}

// 隐藏 dispEditFolderDialog
function hideEditFolderDialog() {
  let $editDialog= $('.editDialog').eq(0);
  let $fade = $('.fade').eq(0);

  $fade.removeClass('fade-active');
  $editDialog.css({'display': 'none'});
}

// 隐藏 deleteTodoDialog
function hideDeleteTodoDialog() {
  let $editDialog= $('.editDialog').eq(0);
  let $fade = $('.fade').eq(0);

  $fade.removeClass('fade-active');
  $editDialog.css({'display': 'none'});
}

export default class UserDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curSelectTodoFolder: {},
      isActiveAddFolderDialog: false,
      newFolder: {}
    };
    IndexedDB.init(this.props.user.username, this.props.todoInfo[0].todos, (todos) => {
      console.log('indexedDB');
      console.log(todos);
    })
  }

  componentWillMount() {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.curSelectTodoFolder = this.props.todoInfo[0];
    this.setState(stateCopy);
  }


  onActiveAddFolder() {
    dispAddFolderDialog();
  }

  onActiveEditFolder() {
    dispEditFolderDialog();
  }

  onChangeAddFolder(e) {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.newFolder.title = e.target.value;
    this.setState(stateCopy);
  }

  onCloseAddFolderDialog(e) {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.newFolder.title = '';
    this.setState(stateCopy);
    hideAddFolderDialog();
  }

  onCloseEditFolderDialog(e) {
    hideEditFolderDialog();
  }

  onSubmitEditFolder(folderInfo, e) {
    let folder = {
      id: this.props.todoInfo[this.props.curFolder].id,
      folderName: folderInfo.folderName,
      isDelete: folderInfo.isDelete
    };

    TodoModel.updateTodoFolder(folder, () => {
      this.props.onSubmitEditFolder(folder);
    }, (error) => {
    });
    this.onCloseEditFolderDialog();
  }


  onSubmitAddFolder(e) {
    let title = this.state.newFolder.title;
    TodoModel.createFolder(title, (id) => {
      let folder = {
        id: id,
        folderName: title
      };
      this.props.onSubmitAddFolder(folder);
    });
    this.onCloseAddFolderDialog();
  }



  render() {
    if (!this.props.todoInfo.length) {
      return <div></div>;
    }
    return (
      <div className="userDialogWrap">
        <div className="fade"></div>
        <LeftAsideDialog user={this.props.user}
                         todoInfo={this.props.todoInfo}
                         onClickCurFolder={this.props.onClickFolder.bind(this)}
                         onActiveAddFolder={this.onActiveAddFolder.bind(this)}
                         onActiveEditFolder={this.onActiveEditFolder.bind(this)}
                         onLogout={this.props.onLogout.bind(this)}
        />

        <ContentDialog
          user={this.props.user}
          todoFolderInfo={this.props.todoInfo[this.props.curFolder]}
          newTodoTitle={this.props.newTodoTitle}
          onSubmitAddTodoList={this.props.onSubmitAddTodoList.bind(this)}
          onChangeNewTodo={this.props.onChangeNewTodo.bind(this)}
          onLoadIsDisFinishedTodoList={this.props.onLoadIsDisFinishedTodoList.bind(this)}
          onClickFinished={this.props.onClickFinished.bind(this)}
          onClickTodoFlag={this.props.onClickTodoFlag.bind(this)}
          onClickDeleteTodo={this.props.onClickDeleteTodo.bind(this)}
        />

         <CreateFolder user={this.props.user}
                       newFolder={this.state.newFolder}
                       onChange={this.onChangeAddFolder.bind(this)}
                       onSubmit={this.onSubmitAddFolder.bind(this)}
                       onCancel={this.onCloseAddFolderDialog.bind(this)}
        />


        <EditDialog user={this.props.user}
                    editFolder={this.props.todoInfo[this.props.curFolder]}
                    onSubmit={this.onSubmitEditFolder.bind(this)}
                    onCancel={this.onCloseEditFolderDialog.bind(this)}
        />


      </div>
    )
  }
}


// {/*onActiveAddFolder={this.onActiveAddFolder}*/}
//
// {/*<CreateFolder accountInfo={this.props.user} newFolderTitle={this.props.newFolderTitle}*/}
// {/*onChange={this.props.onChangeNewFolder.bind(this)}*/}
// {/*onSubmit={this.props.onSubmitNewFolder.bind(this)}*/}
// {/*onCancel={this.cancelCreateFolder.bind(this)}/>*/}
//
