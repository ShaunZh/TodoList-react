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


function getFocus(e) {
  let input = document.querySelector('.addTodoWrap #addTodo');
  input.focus();
  // input.set
}
export default function(props) {
  return (
    <div className="addTodoWrap" title="点击添加任务">
      <span className="todo-list-icon todo-list-icon-add" onClick={getFocus}></span>
      <input id="addTodo" type="text" placeholder="添加任务" value={props.newTodoTitle}
      onChange={props.onChange}
      onKeyPress={submit.bind(null, props)}/>
    </div>
  )
}

