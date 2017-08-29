/**
 * @Author: Hexon
 * @Date: 2017/8/19 17:23
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/19 17:23
 */ 

import classnames from 'classnames';

export default function(props) {

  let folderIcon = 'icon ' + props.iconWord ? props.iconWord : 'icon-folder-default' ;
  return (
    <li className="folder">
      <span className={folderIcon}></span>
      <span className="name">{props.folder.name}</span>
      <span className="todosNum">{props.folder.todos.length}</span>
      <span className={props.iconWord ? '' : 'icon icon-modify'}></span>
    </li>
  )
}