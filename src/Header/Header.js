import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export class Header extends Component {
  constructor() {
    super()
    this.state = {
      searchValue: ''
    }
  }

  handleTextInput = (event) => {
    this.setState({ searchValue: event.target.value }, () =>
      this.props.filterMovies(this.state.searchValue)
    )
  }

  render() {
    return (
      <header>
        <div className='logo-pair'>
          <h1 className='logo-title pair-item'>rancid tomatillos</h1>
          <Link to='/'>
            <button className='home-button pair-item' name='home'>
              home
            </button>
          </Link>
        </div>
        {this.props.location === '/' && (
          <input
            className='search'
            type='text'
            name='search'
            value={this.state.searchValue}
            placeholder='search for a movie title'
            onChange={this.handleTextInput}
          />
        )}
        <div className='logo-pair'>
          {this.props.isLoggedIn && (
            <Link to='profile'>
              <button className='log-button'>my profile</button>
            </Link>
          )}
          <Link to='/login'>
            <button className='log-button'>log in</button>
          </Link>
        </div>
      </header>
    )
  }
}

export default Header
