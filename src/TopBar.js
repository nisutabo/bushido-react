import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from './actions';


class TopBar extends Component {


  render(){
    return(
      <div className='row' style={{borderBottom: 'solid', borderWidth: '1px', borderColor: 'lightgrey'}}>
        <div className='column column-6' style={{fontSize: '30px', fontFamily: 'Helvetica-Light', marginRight: '1.6%', marginLeft: '1%', marginTop: '1.5%'}}>
          <NavLink to='/' style={{color: 'black', textDecoration: 'none'}}>
            BUSHIDŌ
            <span> 武士道</span>
          </NavLink>
        </div>
        {this.props.loggedIn ?
        <div>
          <div className='column column-1' style={{marginTop: '2.6%', fontSize: '15px', fontFamily: 'Helvetica-Light'}}>
              <NavLink to='/home' style={{color: 'black', textDecoration: 'none'}}>
                HOME
              </NavLink>
            </div>
            <div className='column column-1' style={{marginTop: '2.6%', fontSize: '15px', fontFamily: 'Helvetica-Light'}}>
              <NavLink to='/' style={{color: 'black', textDecoration: 'none'}} onClick={this.props.logOut}>
                LOGOUT
              </NavLink>
            </div>
        </div>
        :
        <div>
          <div className='column column-1' style={{marginTop: '2.6%', fontSize: '15px', fontFamily: 'Helvetica-Light'}}>
            <NavLink to='/login' style={{color: 'black', textDecoration: 'none'}}>
              LOGIN
            </NavLink>
          </div>
          <div className='column column-1' style={{marginTop: '2.6%', fontSize: '15px', fontFamily: 'Helvetica-Light'}}>
            <NavLink to='/signup' style={{color: 'black', textDecoration: 'none'}}>
              SIGNUP
            </NavLink>
          </div>
        </div>
      }
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps, {logOut})(TopBar)
