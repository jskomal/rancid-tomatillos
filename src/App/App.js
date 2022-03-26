import React, { Component } from 'react'
import { fetchData } from '../APICalls'
import Header from '../Header/Header'
import Main from '../Main/Main'
import SingleView from '../SingleView/SingleView'
import './App.css'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: null,
      singleMovie: null,
      isSingleView: false,
      isLoading: true,
      isError: false
    }
  }

  componentDidMount() {
    fetchData('movies')
      .then((data) => {
        this.setState({ movies: data.movies, isLoading: false })
      })
      .catch((error) => this.setState({ isError: true }))
  }

  toggleView = (event) => {
    event.preventDefault()
    if (this.state.isSingleView) {
      this.setState((prevState) => {
        return { isSingleView: !prevState.isSingleView }
      })
    } else if (!this.state.isSingleView && event.target.name !== 'home') {
      this.setState((prevState) => {
        fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${event.target.id}`)
          .then((res) => {
            this.setState({ isLoading: true })
            return res.json()
          })
          .then((data) => {
            console.log(event.target)
            console.log(data)
            this.setState({
              singleMovie: data.movie,
              isLoading: false,
              isSingleView: !prevState.isSingleView
            })
          })
          .catch((error) => this.setState({ isError: true }))
      })
    }
  }

  render() {
    return (
      <div>
        <Header
          movies={this.state.movies}
          isSingleView={this.state.isSingleView}
          toggleView={this.toggleView}
        />
        {this.state.isError && (
          <h1 style={{ textAlign: 'center', marginTop: '5vh' }}>
            Server Error, try Rotten Tomatoes instead
          </h1>
        )}
        {this.state.isLoading && !this.state.isError && (
          <h1 style={{ textAlign: 'center', marginTop: '5vh' }}>
            Loading... Grab some popcorn!
          </h1>
        )}
        {!this.state.isSingleView && !this.state.isLoading && !this.state.isError && (
          <Main
            movies={this.state.movies}
            isSingleView={this.state.isSingleView}
            toggleView={this.toggleView}
          />
        )}
        {this.state.isSingleView && (
          <SingleView
            singleMovie={this.state.singleMovie}
            isSingleView={this.state.isSingleView}
          />
        )}
      </div>
    )
  }
}

export default App
