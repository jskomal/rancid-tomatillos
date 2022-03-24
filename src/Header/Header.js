import React, { Component } from 'react'
import './Header.css'

export class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header>
        <div className='logo-pair'>
          <h1 className='logo-title pair-item'>rancid tomatillos</h1>
          <button className='home-button pair-item' name='home' onClick={this.props.toggleView}>home</button>
        </div>
        <input
          className='search'
          type='text'
          name='search'
          placeholder='search for a movie title'
        />
        <button className='log-button'>log in</button>
      </header>
    )
  }
}

export default Header
