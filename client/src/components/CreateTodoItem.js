import React, { Component } from 'react';

const BASE_API_TODOS = "/api/v1/todos"

class CreateTodoItem extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this)
    this.base_api_current_todo_items = BASE_API_TODOS + "/" + this.props.todoId + "/items"
  }

  handleSubmit(e) {
    e.preventDefault();

    return fetch(this.base_api_current_todo_items, {
      method: 'POST',
      body: JSON.stringify({content: e.target.elements.content.value}),
      headers: {'Content-Type': 'application/json'}
    }).then(window.location.reload())
  }

  render() {
    let content;

    content =
      <form className="form-inline col-12 mb-2 justify-content-center" onSubmit={this.handleSubmit}>
        <label className="sr-only">Content</label>
        <input type="text" className="form-control col-5 mr-2" name="content" id="content" placeholder="Get Groceries" />  
            <button type="submit" className="btn btn-primary col-1">Create Todo Item</button>
      </form>
  
    return (content);
  }
  
};

export default CreateTodoItem;