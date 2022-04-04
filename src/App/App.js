import React, { Component } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'
import SingleView from '../SingleView/SingleView'
import Login from '../Login/Login'
import MyProfile from '../MyProfile/MyProfile'
import './App.css'
import './MediaQueries.css'
import { Route, Switch } from 'react-router-dom'
import { fetchDataGet, fetchDataDelete } from '../APICalls'

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
      errorMsg: '',
      userRatings: null
    }
  }

  componentDidMount() {
    fetchDataGet('movies')
      .then((res) => {
        if (!res.ok) {
          this.finishLoading()
          this.setState({
            isError: true,
            errorMsg: 'Server Error, try Rotten Tomatoes instead'
          })
        } else {
          return res.json()
        }
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

  fetchRatings = () => {
    fetchDataGet(`users/${this.state.userData.id}/ratings`)
      .then((res) => {
        if (!res.ok) {
          this.setState({ errorMsg: 'Something went wrong, try again later' })
        }
        return res.json()
      })
      .then((data) => {
        this.setState({ userRatings: data.ratings })
      })
  }

  deleteRating = (idToDelete) => {
    if (this.state.userRatings) {
      const ratedMovieRatingIDs = this.state.userRatings.map((rating) => rating.id)
      if (ratedMovieRatingIDs.includes(idToDelete)) {
        fetchDataDelete(`users/${this.state.userData.id}/ratings/${idToDelete}`)
          .then((res) => {
            if (!res.ok) {
              this.updateErrorMsg('Something went wrong, try again later')
            }
          })
          .then(() => {
            this.fetchRatings()
          })
      }
    }
  }

  updateErrorMsg = (newMsg) => {
    this.setState({ errorMsg: newMsg })
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path='/'
          render={({ location }) => {
            return (
              <div className='page-container'>
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
              <div className='page-container'>
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
                  fetchRatings={this.fetchRatings}
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
              <div className='page-container'>
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
                  errorMsg={this.state.errorMsg}
                  fetchRatings={this.fetchRatings}
                  finishLoading={this.finishLoading}
                  userData={this.state.userData}
                  movies={this.state.movies}
                  userRatings={this.state.userRatings}
                  deleteRating={this.deleteRating}
                />
              </div>
            )
          }}
        />
        <Route
          exact
          path='/:id'
          render={({ match, location }) => {
            return (
              <div className='page-container'>
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
                  updateErrorMsg={this.updateErrorMsg}
                  errorMsg={this.state.errorMsg}
                  isLoading={this.state.isLoading}
                  finishLoading={this.finishLoading}
                  currentMovieID={match.params}
                  userData={this.state.userData}
                  isLoggedIn={this.state.isLoggedIn}
                  userRatings={this.state.userRatings}
                  deleteRating={this.deleteRating}
                  fetchRatings={this.fetchRatings}
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
