import React, { Component } from 'react'
import movieData from '../movieData'
import Header from '../Header/Header'
import Main from '../Main/Main'
import './App.css'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: movieData.movies
    }
  }

  render() {
    return (
      <div>
        <Header movies={this.state.movies} />
        <Main movies={this.state.movies} />
      </div>
    )
  }
}

export default App
