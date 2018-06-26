import React, { Component } from 'react';
import './index.css';
import './check.css';
import TopBar from './TopBar.js';
import { connect } from 'react-redux';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import About from './About';
import { getUser } from './actions';
import { Route, withRouter } from 'react-router-dom';

class App extends Component {

  componentDidMount(){
  let jwt = localStorage.getItem('token')

  if (jwt && !this.props.currentUser){
    this.props.getUser(jwt, this.props.history)
  }
}


  render() {

    return (
      <div>
        <TopBar />
        <Route exact path='/' component={About} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/home' component={Home} />
        <footer className="row">
          <ul className='column column-12' style={{marginLeft: '-8%'}}>
            <li>
              C R E D O
            </li>
            <li>
            日常生活のすべての側面において、勤勉で、意図的で、まともで進歩的な行動をとること。
            </li>
            <br></br>
            <li>
              " To behave in a manner that is purposeful, decent and progressive in all dimensions of daily life. "
            </li>
          </ul>
        </footer>
      </div>
    );
  }
}


function mapStateToProps(state){
  return {
    entries: state.entries
  }
}

export default withRouter(connect(mapStateToProps, { getUser })(App));
