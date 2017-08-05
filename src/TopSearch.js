/**
 * @Author: Hexon
 * @Date: 2017/8/4 21:41
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/4 21:41
 */

import React from 'react';

export default function(props) {
  return (
    <div className="topSearchWrap">
      <form>
      <span className="user-dialog-icon user-dialog-icon-category"></span>
      <input type="text" className="search" value={props.searchStr}
        onChange={props.searchTodo.bind(null, 'search')}/>

      <span className="user-dialog-icon user-dialog-icon-search" ></span>  {/*onClick=''*/}
      </form>

    </div>
  );
}
