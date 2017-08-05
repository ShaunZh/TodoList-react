/**
 * @Author: Hexon
 * @Date: 2017/8/5 22:11
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/5 22:11
 */ 

import React from 'react';

function submit(props, e) {
  if (e.key === 'Enter') {
    if (e.target.value.trim() !== '') {
      props.onSubmit(e);
    }
  }
}

export default function(props) {
  return (
    <div className="addTodoWrap">
      <span className="todo-list-icon todo-list-icon-add"></span>
      <input type="text" placeholder="添加任务" value=''
      onChange=''
      onKeyPress={submit.bind(null, props)}/>
    </div>
  )
}

