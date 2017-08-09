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

import {TodoModel} from './leanCloud';


// 显示反转
function dispToggle($ele) {
  if ($ele.css('display') === 'none') {
    $ele.css({'display': 'block'});
  } else {
    $ele.css({'display': 'none'});
  }
}

// 显示 addFolderDialog
function dispAddFolderDialog(){
  let $addFolderDialog = $('.createFolder').eq(0);
  let $fade = $('.fade').eq(0);
  dispToggle($addFolderDialog);

  console.log('打印');
  console.log($addFolderDialog);

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
  dispToggle($addFolderDialog);
}



export default class UserDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curSelectTodoFolder: {},
      isActiveAddFolderDialog: false,
      newFolder: {}
    };
  }

  componentWillMount() {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.curSelectTodoFolder = this.props.todoInfo[0];
    this.setState(stateCopy);
    console.log('hhhh');
  }

  onActiveAddFolder(isActive) {
    dispAddFolderDialog();
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

  onSubmitAddFolder(e) {
    let title = this.state.newFolder.title;
    TodoModel.createFolder(title, (id) => {
      let folder = {
        id: id,
        folderName: title
      };
      this.props.onSubmitAddFolder(folder);
    });
    console.log('创建成功');
    this.onCloseAddFolderDialog();
  }

  render() {
    console.log('todoInfo');
    console.log(this.props.todoInfo);
    return (
      <div className="userDialogWrap">
        <div className="fade"></div>
        <LeftAsideDialog user={this.props.user}
                         todoInfo={this.props.todoInfo}
                         onClickCurFolder={this.props.onClickFolder.bind(this)}
                         onActiveAddFolder={this.onActiveAddFolder.bind(this)}
        />

        <ContentDialog
          user={this.props.user}
          todoFolderInfo={this.props.todoInfo[this.props.curFolder]}
          newTodoTitle={this.props.newTodoTitle}
          onSubmitAddTodoList={this.props.onSubmitAddTodoList.bind(this)}
          onChangeNewTodo={this.props.onChangeNewTodo.bind(this)}
          onLoadIsDisFinishedTodoList={this.props.onLoadIsDisFinishedTodoList.bind(this)}
          onClickFinished={this.props.onClickFinished.bind(this)}
        />
         <CreateFolder user={this.props.user}
                       newFolder={this.state.newFolder}
                       onChange={this.onChangeAddFolder.bind(this)}
                       onSubmit={this.onSubmitAddFolder.bind(this)}
                       onCancel={this.onCloseAddFolderDialog.bind(this)}

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
