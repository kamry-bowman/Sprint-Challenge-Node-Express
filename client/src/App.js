import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';




// Project component
class Project extends Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.url = 'http://localhost:8000/api';
    this.state = {
      actions: [],
      name: 'Pending',
      description: 'Pending',
    }
  }

  fetchActions = async () => {
    try {
      const { id } = this.props.match.params;
      const response1 = await axios.get(`${this.url}/projects/${id}`);
      const { name, description } = response1.data;
      this.setState(
        { name, description }
      );
      const response2 = await axios.get(`${this.url}/projects/${id}/actions`);
      this.setState({actions: response2.data});
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.fetchActions();
  }

  componentDidUpdate(prevProps) {
    const prevId = prevProps.match.params.id;
    if (prevId !== this.id) {
      this.fetchActions();
    }
  }
  

  render() {
    const actions = this.state.actions.map(action => (
      <div key={action.id}>
        <h3>{action.description}</h3>
        <p>{action.notes}</p>
      </div>
    ));
    return (
      <div>
        <h2>{ this.state.name }</h2>
        <p>{ this.state.description }</p>
        { actions }
      </div>
    )
  }
}









// APP Component
class App extends Component {
  constructor(props) {
    super(props);
    this.url = 'http://localhost:8000/api';
    this.state = { projects: [] };
  }

  fetchPosts = async () => {
    try {
      const response = await axios.get(`${this.url}/projects`);
      this.setState(
        {projects: response.data }
      );
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.fetchPosts(); 
  }
  
  render() {
    const projects = this.state.projects.map(project => <li key={ project.id }><Link to={ `/${ project.id }`}>{ project.name }</Link></li>);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ul>
          {projects}
        </ul>
        <Route path="/:id" render={routeProps => <Project {...routeProps } />} />
      </div>
    );
  }
}

export default App;
