import React, { Component } from 'react';

class IndexComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    }
  }

  componentDidMount() {
    fetch('/api/v1/todos')
      .then(res => res.json())
      .then(todos => this.setState({todos}))
  }

  render() {
    let content;
    let todosBody;

    if (this.state.todos.length === 0) {
      todosBody = <tr><td colspan="100%">No todos created</td></tr>
    }
    else {
      todosBody = this.state.todos.map(todo =>
        <tr key={todo.id}>
          <td>{todo.title}</td>
          <td>{todo.createdAt}</td>
          <td>{todo.updatedAt}</td>
        </tr>
      )
    }

    content = 
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

    return (
      content
    );
  }
}

export default IndexComponent;