import React, { Component } from 'react'
import './Header.css'

export class Header extends Component {
  constructor() {
    super()
    this.state = {
      searchValue: ''
    }
  }

  handleTextInput = (event) => {
    this.setState({ searchValue: event.target.value })
    this.props.filterMovies(this.state.searchValue)
  }

  render() {
    return (
      <header>
        <div className='logo-pair'>
          <h1 className='logo-title pair-item'>rancid tomatillos</h1>
          <button
            className='home-button pair-item'
            name='home'
            onClick={this.props.toggleView}
          >
            home
          </button>
        </div>
        <input
          className='search'
          type='text'
          name='search'
          value={this.state.searchValue}
          placeholder='search for a movie title'
          onChange={this.handleTextInput}
        />
        <button className='log-button'>log in</button>
      </header>
    )
  }
}

export default Header
