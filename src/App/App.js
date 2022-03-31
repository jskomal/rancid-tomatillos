import React, { Component } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'
import SingleView from '../SingleView/SingleView'
import Login from '../Login/Login'
import MyProfile from '../MyProfile/MyProfile'
import './App.css'
import { Route, Switch } from 'react-router-dom'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: null,
      filteredMovies: null,
      isLoading: true,
      isError: false,
      userData: null,
      isLoggedIn: false
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
      .catch((error) => {
        this.setState({ isError: true })
        throw new Error(error)
      })
  }

  filterMovies = (searchTerm) => {
    this.setState(() => {
      if (searchTerm === '') {
        return { filteredMovies: this.state.movies }
      }
      return {
        filteredMovies: this.state.movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
    })
  }

  toggleLogInStatus = (userData) => {
    this.setState({ isLoggedIn: true, userData: userData })
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
                  isLoggedIn={this.state.isLoggedIn}
                />
                {this.state.isError && (
                  <h1 className='status-msg'>
                    Server Error, try Rotten Tomatoes instead
                  </h1>
                )}
                {this.state.isLoading && !this.state.isError && (
                  <h1 className='status-msg'>Loading... Grab some popcorn!</h1>
                )}
                {!this.state.isLoading && !this.state.isError && (
                  <Main movies={this.state.filteredMovies} toggleView={this.toggleView} />
                )}
              </div>
            )
          }}
        />
        <Route
          exact
          path='/login'
          render={({ location }) => {
            return (
              <div>
                <Header
                  movies={this.state.movies}
                  filterMovies={this.filterMovies}
                  location={location.pathname}
                  isLoggedIn={this.state.isLoggedIn}
                />
                <Login toggleLogInStatus={this.toggleLogInStatus} />
              </div>
            )
          }}
        />
        <Route
          exact
          path='/my-profile'
          render={({ location }) => {
            return (
              <>
                <Header
                  movies={this.state.movies}
                  filterMovies={this.filterMovies}
                  location={location.pathname}
                  isLoggedIn={this.state.isLoggedIn}
                />
                <MyProfile userData={this.state.userData} movies={this.state.movies} />
              </>
            )
          }}
        />
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
                  isLoggedIn={this.state.isLoggedIn}
                />
                {this.state.isError && (
                  <h1 className='status-msg'>
                    Server Error, try Rotten Tomatoes instead
                  </h1>
                )}
                <SingleView currentMovieID={match.params} />
              </div>
            )
          }}
        />
      </Switch>
    )
  }
}

export default App
