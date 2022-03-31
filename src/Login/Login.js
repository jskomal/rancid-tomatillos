import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './Login.css'

export class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      statusMsg: '',
      hasError: false,
      isLoggedIn: false
    }
  }

  handleTextInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  validateInputs = () => {
    return this.state.email && this.state.password ? true : false
  }

  clearInputs = () => {
    this.setState({ email: '', password: '' })
  }

  submitLogIn = (e) => {
    e.preventDefault()
    if (this.validateInputs()) {
      fetch('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: this.state.email, password: this.state.password })
      })
        .then((res) => {
          if (res.status === 403) {
            this.clearInputs()
            this.setState({
              statusMsg: 'Incorrect email and password combination',
              hasError: true
            })
            throw new Error(res.status)
          } else if (!res.ok) {
            this.clearInputs()
            this.setState({
              statusMsg: 'Something went wrong, please try again later',
              hasError: true
            })
            throw new Error(res.status)
          } else {
            return res.json()
          }
        })
        .then((data) => {
          this.props.toggleLogInStatus(data.user)
          this.clearInputs()
          this.setState({
            hasError: false,
            statusMsg: 'Success, Routing you to the home page!'
          })
        })
        .then(() =>
          setTimeout(() => {
            this.setState({ isLoggedIn: true })
          }, 2000)
        )
    } else {
      this.setState({ statusMsg: 'You must provide an email and password to submit' })
    }
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
          value={this.state.email}
          onChange={this.handleTextInput}
        />
        <input
          className='login-input'
          type='password'
          name='password'
          placeholder='password'
          value={this.state.password}
          onChange={this.handleTextInput}
        />
        <button className='login-button' onClick={this.submitLogIn}>
          log in
        </button>
        <p className='status-msg' style={{ color: this.state.hasError ? 'red' : '#fff' }}>
          {this.state.statusMsg}
        </p>
        {this.state.isLoggedIn && <Redirect to='/' />}
      </div>
    )
  }
}

export default Login
