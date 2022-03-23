import React, { Component } from 'react'

export class Header extends Component {
  render() {
    return (
      <header>
        <h1 className='logo-title'>rancid tomatillos</h1>
        <button className='home-button'>home</button>
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
