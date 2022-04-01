import React, { Component } from 'react'
import StarRatings from 'react-star-ratings/build/star-ratings'
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
    return (
      <div className='modal-view' onClick={this.props.toggleModal}>
        <div className='modal'>
          <button className='close-button'>{'\u2573'}</button>
          <h2>add your rating</h2>
          <p>out of 10</p>
          <input
            type='number'
            className='login-input'
            name='ratingValue'
            min='1'
            max='10'
            step='1'
            value={this.state.ratingValue}
            onChange={this.handleInput}
          />
          <div className='stars'>
            <StarRatings
              rating={this.state.ratingValue / 2}
              starDimension='3vw'
              starSpacing='0'
              starRatedColor='goldenrod'
            />
          </div>
          <button onClick={(e) => this.props.addRating(this.state.ratingValue)}>
            submit rating
          </button>
        </div>
      </div>
    )
  }
}

export default Modal
