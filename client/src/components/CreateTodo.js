import React, { Component } from 'react';

const BASE_API_TODOS = "/api/v1/todos"

class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();

    return fetch(BASE_API_TODOS, {
      method: 'POST',
      body: JSON.stringify({title: e.target.elements.title.value}),
      headers: {'Content-Type': 'application/json'}
    }).then(window.location.reload())
  }

  render() {
    let content;

    content =
      <div className="row mt-2 mb-2">
      <form className="form-inline col-12 justify-content-center" onSubmit={this.handleSubmit}>
        <label className="sr-only">Title</label>
        <input type="text" className="form-control col-5 mr-2" name="title" id="title" placeholder="Get Groceries" />  
            <button type="submit" className="btn btn-primary col-1">Create Todo</button>
      </form>
      </div>
  
    return (content);
  }
  
};

export default CreateTodo;