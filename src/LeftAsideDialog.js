/**
 * @Author: Hexon
 * @Date: 2017/8/4
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/4
 */
import './LeftAsideDialog.css'


import React, {Component} from 'react';
import TopSearch from './TopSearch';
import Account from './Account';
import TodoFolder from './TodoFolder';



export default class LeftAsideDialog extends Component {


  onAddFolder(e) {
    this.props.onActiveAddFolder(true);
  }

  render() {

    let todoFolders = this.props.todoInfo.map((item, index) => {
      return (
        <TodoFolder key={index.toString()} todoFolderInfo={item} onClickFolder={this.props.onClickCurFolder.bind(null) }
                    index={index} onActiveEditFolder={this.props.onActiveEditFolder}
          />
      );
    });

    return (
      <div className="leftAsideWrap">
        <TopSearch
        />

        <Account user={this.props.user}/>
        <div className="todoFolderItemWrap">
          {todoFolders}
        </div>

        <div className="createFolderAction" onClick={this.onAddFolder.bind(this)}>
          <sapn className="todo-folder-icon todo-folder-icon-add"></sapn>
          <span className="todoFolderName">创建清单</span>
        </div>
      </div>
    );
  }
}
