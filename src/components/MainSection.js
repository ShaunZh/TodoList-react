/**
 * @Author: Hexon
 * @Date: 2017/8/19 16:08
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/19 16:08
 */

import React, { Component } from 'react';

import HeaderTitle from './HeaderTitle';
import AddTodo from './AddTodo';
import Todo from './Todo';
import FilterVisibleBtn from './FilterVisibleBtn';

const TODO_FILTERS = {
  [SHOW_ACTIVE]: todo => !(todo.isCompleted || todo.isDeleted) ,
  [SHOW_COMPLETED]: todo => todo.isCompleted && !todo.isDeleted,
  [SHOW_DELETED]: todo => todo.isDeleted,
  [SHOW_NO]: () => false
};

export default class MainSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: SHOW_NO
    }
  };

  render() {
    let {folder, todos, actions} = this.props;
    let activeTodos = todos.filter(TODO_FILTERS[SHOW_ACTIVE]);
    let filterTodos = todos.filter(TODO_FILTERS[this.state.filter]);

    return (
      <section className="main">
        <HeaderTile folderName={folder.name}/>

        <AddTodo onAddTodo={this.props.onAddTodo.bind(this)}/>

        <ul className="active-todo-list">
          { activeTodos.map((todo) => {
            <Todo key={todo.id} todo={todo} {...actions} />
          })}
        </ul>

        <div className="filterBtnWrap">
          <FilterVisibleBtn title={this.state.filter === 'SHOW_NO' ? '显示已完成任务' : '隐藏未完成任务'}
                            onClick={() => this.setState({filter: this.state.filter === 'SHOW_NO' ? 'SHOW_COMPLETED' : 'SHOW_NO' })}
          />
        </div>

        <ul className="filter-todo-list">
          { filterTodos.map((todo) => {
            <Todo key={todo.id} todo={todo} {...actions} />
          })}
        </ul>
      </section>
    )
  }

}

