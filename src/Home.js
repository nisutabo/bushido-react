import React, { Component } from 'react';
import './index.css';
import './check.css';
import Sidebar from './Sidebar.js'
import Calendar from './calendar.js';
import { connect } from 'react-redux';
import { fetchEntries } from './actions';

class Home extends Component {



  render() {
    return (
      <div>
        <div id='main' className='row'>
          <div id='aside' className='column column-2'>
              <Sidebar />
          </div>
          <div style={{marginLeft: '5%'}}>
            <Calendar />
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state){
  return {
    entries: state.entries,
    user: state.currentUser
  }
}

export default connect(mapStateToProps, { fetchEntries })(Home);
