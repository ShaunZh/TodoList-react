/* * @Author: Hexon
 * @Date: 2017/8/10 9:41
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/10 9:41
 */
import React, {Component} from 'react';
import $ from 'jquery';

import './EditDialog.css';
import DeleteDialog from './DeleteDialog';

export default class EditDialog extends Component{
  constructor(props) {
    super(props);
    this.state = {
      folderInfo: {
        folderName: '',
        isDelete: false,
        id: ''
      },
    }
  }

  componentWillMount() {

  }

  onChange(e) {
    let stateCopye = JSON.parse(JSON.stringify(this.state));
    stateCopye.folderInfo.folderName = e.target.value;
    this.setState(stateCopye);
  }

  onCancel(e) {
    this.props.onCancel(e);
  }


  onSubmit(e) {
    if (this.state.folderInfo.folderName.trim() !== '')  {

      this.props.onSubmit(this.state.folderInfo);
    }
  }

  // 按键提交修改回调函数
  keySubmit(e) {
    if (e.key === 'Enter') {
      if (e.target.value.trim() !== '') {
        this.props.onSubmit(this.state.folderInfo);
      }
    }
  }

  // 弹出删除对话框
  onDelete(e) {
    console.log('hhhh');
    let $editDialog = $('.editDialog').eq(0);
    let $deleteDialog = $('.editDialogWrap').find('.deleteDialog').eq(0);
    $editDialog.css({'display': 'none'});
    $deleteDialog.css({'display':'block'});
    $deleteDialog.animate({

      top: '25%'
    }, 100, () =>{

    })
  }


  // 删除对话框中的取消键回调函数
  onCancelDelete(e) {
    let $deleteDialog = $('.editDialogWrap').find('.deleteDialog').eq(0);
    let $fade = $('.fade').eq(0);
    $fade.removeClass('fade-active');
    $deleteDialog.css({
      'display': 'none'
    });
    this.setState(this.state);

  }

  // 删除对话框中的确认键回调函数
  onConfirmDelete(e) {
    let $deleteDialog = $('.editDialogWrap').find('.deleteDialog').eq(0);
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    $deleteDialog.css({'display': 'none'});
    stateCopy.folderInfo.isDelete = true;
    this.props.onSubmit(stateCopy.folderInfo);
    this.setState(stateCopy);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      let stateCopy = JSON.parse(JSON.stringify(this.state));
      stateCopy.folderInfo.folderName = nextProps.editFolder.folderName;
      stateCopy.folderInfo.isDelete = nextProps.editFolder.isDelete;
      stateCopy.folderInfo.id = nextProps.editFolder.id;
      this.setState(stateCopy);
    }
  }

  render() {
    return (
      <div className="editDialogWrap">
        <div className="editDialog">
          <h3>编辑清单</h3>
          <input type="text" value={this.state.folderInfo.folderName} placeholder="清单名称"
                 onChange={this.onChange.bind(this)}
                 onKeyPress={this.keySubmit.bind(this)}
          />
          <div className="accountInfoWrap">
            <span className="firstLetterUserName">{this.props.user.username.split('')[0]}</span>
            <div className="accountInfo">
              <p className="username">{this.props.user.username}</p>
              <p className="email">{this.props.user.email}</p>
            </div>
          </div>

          <div className="actions btn-group operation">
            <span className="action-icon action-icon-delete" onClick={this.onDelete.bind(this)}></span>
            <button className="cancel-btn" onClick={this.onCancel.bind(this)}>取消</button>
            <button className="confirm-btn" onClick={this.onSubmit.bind(this)}>保存</button>
          </div>
        </div>
        <DeleteDialog title={this.state.folderInfo.folderName}
                      onCancel={this.onCancelDelete.bind(this)}
                      onConfirm={this.onConfirmDelete.bind(this)}
        />
      </div>
    )
  }
}
