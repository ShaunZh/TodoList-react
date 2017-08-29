/**
 * @Author: Hexon
 * @Date: 2017/8/19 13:52
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/19 13:52
 */
import React, {Component} from 'react'
import TodoTextInput from './TodoTextInput'

export default class AddTodo extends Component {
  onAddTodo = (text) => {
    if (text.length > 0) {
      this.props.onAddTodo(text);
    }
  };

  render() {
    <div className="addTodo">
      <span className="icon icon-add"></span>
      <TodoTextInput newTodo
                     placeholder="添加任务"
                     onSave={() => this.props.onAddTodo}
      />
    </div>
  }



}
