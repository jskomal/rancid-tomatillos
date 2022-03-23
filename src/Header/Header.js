import React, { Component } from 'react'

export class Header extends Component {
  render() {
    return (
      <header>
        <div className='logo-pair'>
          <h1 className='logo-title pair-item'>rancid tomatillos</h1>
          <button className='home-button pair-item'>home</button>
        </div>
        <input
          className='search'
          type='text'
          name='search'
          id='search'
          placeholder='search for a movie title'
        />
        <button className='log-button'>log in</button>
      </header>
    )
  }
}

export default Header
