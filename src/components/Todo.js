/**
 * @Author: Hexon
 * @Date: 2017/8/19 13:53
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/19 13:53
 */
import React, { Component } from 'react'
import PropTypes from 'prop-typs'
import classnames from 'classnames'

export default class Todo extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    userName: PropTypes.string.isRequired,
    onToggleTodo: PropTypes.func.isRequired,
    onDeleteTodo: PropTypes.func.isRequired
  };

  render() {
    const {todo, onToggleTodo, onDeleteTodo, userName} = this.props;

    let todoInfo;
    if (todo.isCompleted) {
      todoInfo = (
        <div className="todoInfo">
          <span className="name">{todo.name}</span>
          <span>由 {userName} 完成</span>
        </div>
      )
    } else {
      todoInfo = <span className="todoInfo">{todo.name}</span>
    }

    let element = (
      <div className="view">
        <input className="toggle"
               type="checkbox"
               checked={todo.isCompleted}
               onChange={() => onToggleTodo(todo.id)} />
        <span>{todo.updateTime}</span>
        {todoInfo}
        <span className="icon delete-icon"
              onClick={() => onDeleteTodo(todo.id)}></span>
      </div>
    );

    return (
      <li className={classnames({
        'todoItem',
        {completed: todo.isCompleted}
      })}>
        {element}
      </li>
    )
  }
}
