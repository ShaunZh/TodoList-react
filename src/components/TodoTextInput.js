/**
 * @Author: Hexon
 * @Date: 2017/8/19 14:51
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/19 14:51
 */ 
import React, { Component } from 'react'

export default class TodoTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text || ''
    };
  }

  onChange = (e) => {
    this.setState({text: e.target.value});
  };

  onSubmit = (e) => {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({text: ''});
      }
    }
  };

  render() {
    <input type="text"
           autoFocus="true"
           value={this.state.text}
           placeholder={this.props.placeholder}
           onChange={this.onChange}
           onKeyDown={this.onSubmit}
    />
  }
}