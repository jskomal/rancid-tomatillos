import React, { Component } from 'react'
import './Modal.css'

export class Modal extends Component {
  constructor() {
    super()
    this.state = { ratingValue: '5' }
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return(
    <div className='modal-view' onClick={ this.props.toggleModal }>
      <div className='modal'>
        <h2>add your rating</h2>
        <p>out of 10</p>
        <input type='number' name='ratingValue' min='1' max='10' step='1' value={ this.state.ratingValue } onChange={ this.handleInput }/>
        <button onClick={ e => this.props.addRating(this.state.ratingValue) }>submit rating</button>
      </div>
    </div>
  )}
}

export default Modal
