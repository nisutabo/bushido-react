import React, { Component } from 'react';
import { signUp } from './actions';
import { connect } from 'react-redux';

class Signup extends Component {

  state = {
    name: "",
    username: "",
    password: ""
  }

    handleChange = (event)=> {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    this.props.signUp(this.state.name, this.state.username, this.state.password, this.props.history)
  }

  render(){
    return (
      <div id='main' style={{textAlign: 'center', marginLeft: '-12%', marginTop: '5%'}}>
        <div className="pt-form-group">
          <label className="pt-label" style={{fontSize: '65%'}}>
          FULL NAME | 名
          </label>
          <div className="pt-form-content">
            <input  name='name' className="pt-input" style={{width: "15%", height: '40%' }}   dir="auto" onChange={this.handleChange}/>
          </div>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" style={{fontSize: '65%'}}>
          USERNAME | ユーザー名
          </label>
          <div className="pt-form-content">
            <input  name='username' className="pt-input" style={{width: "15%", height: '40%' }}   dir="auto" onChange={this.handleChange}/>
          </div>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" style={{fontSize: '65%'}}>
          PASSWORD | パスワード
          </label>
          <div className="pt-form-content">
            <input  name='password' className="pt-input" style={{width: "15%", height: '40%' }}  type='password' dir="auto" onChange={this.handleChange}/>
          </div>
        </div>

          <button style={{width: '5%', fontSize: '45%' }} type="button" className="pt-button pt-intent-success" onClick={this.handleSubmit}>
            <span style={{fontSize: '150%', textAlign: 'center'}}>ENTER</span>
          </button>

      </div>
    )
  }
}


export default connect(null, {signUp})(Signup)
