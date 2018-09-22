import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CreateTodo from './CreateTodo'
const BASE_API_TODOS = "/api/v1/todos"

class IndexTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    }

    this.removeTodo = this.removeTodo.bind(this)
  }

  componentDidMount() {
    fetch(BASE_API_TODOS)
      .then(res => res.json())
      .then(todos => this.setState({ todos }))
  }

  removeTodo(id) {
    return fetch(BASE_API_TODOS + "/" + id, { method: "delete" })
      .then(this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) }))
  }

  render() {
    let content;
    let todosBody;

    if (this.state.todos.length === 0) {
      todosBody = <tr><td colSpan="100%">No todos created</td></tr>
    }
    else {
      todosBody = this.state.todos.map(todo =>
        <tr key={todo.id}>
          <td>{todo.title}</td>
          <td>{todo.createdAt}</td>
          <td>{todo.updatedAt}</td>
          <td>
          <Link to={`${BASE_API_TODOS}/${todo.id}`}>SHOW</Link>

            <button type="button" className="close" aria-label="Delete" title="Delete" onClick={this.removeTodo.bind(this, todo.id)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </td>
        </tr>
      )
    }

    content =
      <div>
        <CreateTodo />

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {todosBody}
          </tbody>
        </table>
      </div>

    return (content);
  }
}

export default IndexTodo;