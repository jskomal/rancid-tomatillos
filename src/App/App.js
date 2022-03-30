import React, { Component } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'
import SingleView from '../SingleView/SingleView'
import Login from '../Login/Login'
import './App.css'
import { Route, Switch } from 'react-router-dom'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: null,
      filteredMovies: null,
      isLoading: true,
      isError: false
    }
  }

  fetchData = (path) => {
    return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/${path}`).then((res) => {
      this.setState({ isLoading: true })
      return res.json()
    })
  }

  componentDidMount() {
    this.fetchData('movies')
      .then((data) => {
        this.setState({
          movies: data.movies,
          filteredMovies: data.movies,
          isLoading: false
        })
      })
      .catch((error) => { this.setState({ isError: true })
        throw new Error(error) })
  }

  filterMovies = (searchTerm) => {
    this.setState({
      filteredMovies: this.state.movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path='/'
          render={({ location }) => {
            return (
              <div>
                <Header
                  movies={this.state.movies}
                  filterMovies={this.filterMovies}
                  location={location.pathname}
                />
                {this.state.isError && (
                  <h1 className='status-msg'>
                    Server Error, try Rotten Tomatoes instead
                  </h1>
                )}
                {this.state.isLoading && !this.state.isError && (
                  <h1 className='status-msg'>
                    Loading... Grab some popcorn!
                  </h1>
                )}
                {!this.state.isLoading && !this.state.isError && (
                  <Main
                    movies={this.state.filteredMovies}
                    toggleView={this.toggleView}
                  />
                )}
              </div>
            )
          }}
        />
        <Route
          exact
          path='/login'
          render={( { location }) => {
            return (
              <div>
                <Header
                  movies={this.state.movies}
                  filterMovies={this.filterMovies}
                  location={location.pathname}
                />
                <Login />
              </div>
            )
          }}
        <Route
          exact
          path='/:id'
          render={({ match, location }) => {
            return (
              <div>
                <Header
                  movies={this.state.movies}
                  filterMovies={this.filterMovies}
                  location={location.pathname}
                />
                {this.state.isError && (
                  <h1 className='status-msg'>
                    Server Error, try Rotten Tomatoes instead
                  </h1>
                )}
                <SingleView
                  currentMovieID={match.params}
                />
              </div>
            )
          }}
        />
      </Switch>
    )
  }
}

export default App
