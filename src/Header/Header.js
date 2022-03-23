import React, { Component } from 'react'

export class Header extends Component {
  render() {
    return (
      <div>
        <h1>rancid tomatillos</h1>
        <button>home</button>
        <input
          type='text'
          name='search'
          id='search'
          placeholder='search for a movie title'
        />
        <button>log in</button>
      </div>
    )
  }
}

export default Header
