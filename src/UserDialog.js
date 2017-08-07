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

export default class UserDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountInfo: {
        username: '放风筝的小小马',
        email: '308826842@.com'
      },
      curSelectTodoFolder: {},
      newFolder: {},
      newList: {}

    };
  }

  componentWillMount() {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.curSelectTodoFolder = this.props.todoInfo[0];
    this.setState(stateCopy);
    console.log('hhhh');
  }

  // 点击清单回调函数
  curClickFolder(e) {
    let $target = $(e.target);

    if ($target.hasClass('todoFolderItem') ||
        ($target.parent().eq(0).hasClass('todoFolderItem')) && !$target.parent().eq(0).hasClass('todo-folder-icon-modify')) {

      let $folder = $target.hasClass('todoFolderItem') ? $target : $target.parent().eq(0);
      let key = $folder.parent().eq(0).children().index($folder);
      let stateCopy = JSON.parse(JSON.stringify(this.state));

      stateCopy.curSelectTodoFolder = this.props.todoInfo[key];
      this.setState(stateCopy);
    }
  }


  cancelCreateFolder(e) {
    let $target = $(e.target);
    $target.parent().eq(0).siblings('input').value = '';
    console.log('取消')
  }

  newFolderTitleChange(e) {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.newFolder.title = e.target.value;
    this.setState(stateCopy);
  }


  render() {
    console.log('todoInfo');
    console.log(this.props.todoInfo);
    return (
      <div className="userDialogWrap">
        <LeftAsideDialog todoInfo={this.props.todoInfo} onClickCurFolder={this.curClickFolder.bind(this)}/>
        <ContentDialog todoFolderInfo={this.state.curSelectTodoFolder} />
        <CreateFolder accountInfo={this.state.accountInfo} newFolder={this.state.newFolder}
        onChange={this.newFolderTitleChange.bind(this)}
        onSubmit={this.props.onSubmitNewFolder.bind(this)}
        onCancel={this.cancelCreateFolder.bind(this)}/>
      </div>
    )
  }
}