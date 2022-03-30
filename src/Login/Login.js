import React, { Component } from 'react'
import './Login.css'

export class Login extends Component {
  constructor() {
    super()
    this.state = { email:'', password:'', statusMsg:'', hasError: false }
  }

  handleTextInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  validateInputs = () => {
    return this.state.email && this.state.password ? true : false
  }

  clearInputs = () => {
    this.setState({ email : '', password: ''})
  }

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
          onChange={ this.handleTextInput }
        />
        <input
          className='login-input'
          type='password'
          name='password'
          placeholder='password'
          value={ this.state.password }
          onChange={ this.handleTextInput }
        />
        <button className='login-button' onClick={ this.submitLogIn }>log in</button>
        <p className='status-msg' style={{ color: this.state.hasError ? 'red' : '#fff'}}>{ this.state.statusMsg }</p>
      </div>
    )
  }
}

export default Login
