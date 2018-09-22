import React, { Component } from 'react';

import CreateTodoItem from './CreateTodoItem'

const BASE_API_TODOS = "/api/v1/todos"

class ShowTodo extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      todo: {
        todoItems: []
      },
    }

    this.removeTodoItem = this.removeTodoItem.bind(this)
    this.base_api_current_todo_item = BASE_API_TODOS + "/" + this.props.match.params.id
  }

  componentDidMount() {
    fetch(this.base_api_current_todo_item)
      .then(res => res.json())
      .then(todo => this.setState({ todo }))
  }

  removeTodoItem(id) {
    let newTodo;

    newTodo = Object.assign({}, this.state.todo);
    newTodo.todoItems = this.state.todo.todoItems.filter(todoItem => todoItem.id !== id)

    return fetch(this.base_api_current_todo_item + "/items/" + id, { method: "delete" })
      .then(this.setState({ todo: newTodo }))
  }

  updateTodoItem(id, complete) {
    return fetch(this.base_api_current_todo_item + "/items/" + id, {
      headers: { "Content-Type": "application/json" },
      method: "put",
      body: JSON.stringify({ complete: complete }),
    }).then(window.location.reload())
  }

  render() {
    let content;
    let todoItemsBody;

    if (this.state.todo.todoItems.length === 0) {
      todoItemsBody = <tr><td colSpan="100%">No todo items created</td></tr>
    }
    else {
      todoItemsBody = this.state.todo.todoItems.map(todoItem =>
        <tr key={todoItem.id}>
          <td>{todoItem.content}</td>
          <td>{todoItem.complete.toString()}</td>
          <td>{todoItem.createdAt}</td>
          <td>{todoItem.updatedAt}</td>
          <td>
            <button type="button" className="close" aria-label="Delete" title="Delete" onClick={this.removeTodoItem.bind(this, todoItem.id)}>
              <span aria-hidden="true">&times;</span>
            </button>
            {!todoItem.complete ?
              <button type="button" className="btn btn-primary" aria-label="Complete" title="Complete" onClick={this.updateTodoItem.bind(this, todoItem.id, true)}>
                <span aria-hidden="true">Complete</span>
              </button>
              :
              <button type="button" className="btn btn-danger" aria-label="Undo" title="Undo" onClick={this.updateTodoItem.bind(this, todoItem.id, false)}>
                <span aria-hidden="true">Undo</span>
              </button>
            }
          </td>
        </tr>
      )
    }

    content =
      <div>
        <div className="row justify-content-center mt-2 mb-2">
          <h1>{this.state.todo.title}</h1>
        </div>
        <div className="row">
          <CreateTodoItem todoId = {this.props.match.params.id}/>
        </div>
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Content</th>
                <th scope="col">Complete</th>
                <th scope="col">Created At</th>
                <th scope="col">Updated At</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {todoItemsBody}
            </tbody>
          </table>
        </div>
      </div>

    return (content);
  }
}

export default ShowTodo;