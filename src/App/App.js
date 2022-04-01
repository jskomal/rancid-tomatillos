import React, { Component } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'
import SingleView from '../SingleView/SingleView'
import Login from '../Login/Login'
import MyProfile from '../MyProfile/MyProfile'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import { fetchDataGet } from '../APICalls'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: null,
      filteredMovies: null,
      isLoading: true,
      isError: false,
      userData: null,
      isLoggedIn: false,
      errorMsg: ''
    }
  }

  componentDidMount() {
    fetchDataGet('movies')
      .then((res) => {
        if (!res.ok) {
          this.setState(
            {
              isError: true,
              errorMsg: 'Server Error, try Rotten Tomatoes instead'
            },
            () => {
              throw new Error(res.status)
            }
          )
        }
        return res.json()
      })
      .then((data) => {
        this.setState({
          isLoading: false,
          movies: data.movies,
          filteredMovies: data.movies
        })
      })
  }

  finishLoading = () => {
    this.setState({ isLoading: false })
  }

  filterMovies = (searchTerm) => {
    this.setState(() => {
      if (searchTerm === '') {
        return { filteredMovies: this.state.movies }
      } else {
        return {
          filteredMovies: this.state.movies.filter((movie) =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }
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
                  <h1 className='status-msg'>{this.state.errorMsg}</h1>
                )}
                {this.state.isLoading && !this.state.isError && (
                  <h1 className='status-msg'>Loading... Grab some popcorn!</h1>
                )}
                {!this.state.isLoading && !this.state.isError && (
                  <Main movies={this.state.filteredMovies} />
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
                {this.state.isError && (
                  <h1 className='status-msg'>{this.state.errorMsg}</h1>
                )}
                <Login
                  finishLoading={this.finishLoading}
                  toggleLogInStatus={this.toggleLogInStatus}
                />
              </div>
            )
          }}
        />
        <Route
          exact
          path='/profile'
          render={({ location }) => {
            return (
              <>
                <Header
                  movies={this.state.movies}
                  filterMovies={this.filterMovies}
                  location={location.pathname}
                  isLoggedIn={this.state.isLoggedIn}
                />
                {this.state.isError && (
                  <h1 className='status-msg'>{this.state.errorMsg}</h1>
                )}
                <MyProfile
                  finishLoading={this.finishLoading}
                  userData={this.state.userData}
                  movies={this.state.movies}
                />
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
                  <h1 className='status-msg'>{this.state.errorMsg}</h1>
                )}
                <SingleView
                  finishLoading={this.finishLoading}
                  currentMovieID={match.params}
                  userData={this.state.userData}
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
