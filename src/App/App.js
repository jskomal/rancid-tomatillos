import React, { Component } from 'react'
import {movieData, singleMovieData} from '../movieData'
import Header from '../Header/Header'
import Main from '../Main/Main'
import SingleView from '../SingleView/SingleView'
import './App.css'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: movieData.movies,
      singleMovie: singleMovieData.movie,
      isSingleView: true
    }
  }

  render() {
    return (
      <div>
        <Header movies={this.state.movies} isSingleView={this.state.isSingleView} />
        {!this.state.isSingleView && <Main movies={this.state.movies} isSingleView={this.state.isSingleView} />}
        {this.state.isSingleView && <SingleView singleMovie={this.state.singleMovie} isSingleView={this.state.isSingleView} />}
      </div>
    )
  }
}

export default App
