import React, { Component } from 'react'
import './Login.css'

export class Login extends Component {
  render() {
    return (
      <div className='login-view'>
        <h3 className='login-title'>Log In</h3>
        <input
          className='login-input'
          type='text'
          name='email'
          placeholder='email address'
          value={ this.state.email }
          // add on change
        />
        <input
          className='login-input'
          type='password'
          name='password'
          placeholder='password'
          value={ this.state.password }
          // add on change
        />
        <button className='login-button'>log in</button>
        <p className='status-msg' style={{ color: this.state.hasError ? 'red' : '#fff'}}
      </div>
    )
  }
}

export default Login