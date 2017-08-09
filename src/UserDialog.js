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
      curSelectTodoFolder: {},

    };
  }

  componentWillMount() {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.curSelectTodoFolder = this.props.todoInfo[0];
    this.setState(stateCopy);
    console.log('hhhh');
  }


  cancelCreateFolder(e) {
    let $target = $(e.target);
    $target.parent().eq(0).siblings('input').value = '';
    console.log('取消')
  }


  render() {
    console.log('todoInfo');
    console.log(this.props.todoInfo);
    return (
      <div className="userDialogWrap">
        <LeftAsideDialog todoInfo={this.props.todoInfo} onClickCurFolder={this.props.onClickFolder.bind(this)}/>
        <ContentDialog todoFolderInfo={this.props.todoInfo[this.props.curFolder]}
                       newTodoTitle={this.props.newTodoTitle}
                       onSubmitAddTodoList={this.props.onSubmitAddTodoList.bind(this)}
                       onChangeNewTodo={this.props.onChangeNewTodo.bind(this)}
                       onLoadIsDisFinishedTodoList={this.props.onLoadIsDisFinishedTodoList.bind(this)}
                       onClickFinished={this.props.onClickFinished.bind(this)}
        />

        <CreateFolder accountInfo={this.props.appState.accountInfo} newFolderTitle={this.props.newFolderTitle}
        onChange={this.props.onChangeNewFolder.bind(this)}
        onSubmit={this.props.onSubmitNewFolder.bind(this)}
        onCancel={this.cancelCreateFolder.bind(this)}/>
      </div>
    )
  }
}