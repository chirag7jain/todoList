import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import IndexTodo from './components/IndexTodo';
import ShowTodo from './components/ShowTodo';

const BASE_API_TODOS = "/api/v1/todos"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand">Todo App</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route exact path='/' component={IndexTodo} />
            <Route exact path='/:id' component={ShowTodo} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
