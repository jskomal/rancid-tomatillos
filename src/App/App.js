import React, { Component } from 'react'
import {movieData, singleMovieData} from '../movieData'
import Header from '../Header/Header'
import Main from '../Main/Main'
import './App.css'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: movieData.movies,
      singleMovie: singleMovieData.movie,
      isSingleView: false
    }
  }

  render() {
    return (
      <div>
        <Header movies={this.state.movies} />
        <Main movies={this.state.movies} isSingleView={this.state.isSingleView} />
        <SingleView singleMovie={this.state.singleMovie} />
      </div>
    )
  }
}

export default App
