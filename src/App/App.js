import React, { Component } from 'react'
import movieData from '../movieData'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      movieData: movieData
    }
  }

  render() {
    return (
      <div>
        <Header movieData={movieData} />
      </div>
    )
  }
}

export default App
