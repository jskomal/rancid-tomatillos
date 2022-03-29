import React, { Component } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'
import SingleView from '../SingleView/SingleView'
import './App.css'
import { Route, Switch } from 'react-router-dom';

export class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: null,
      filteredMovies: null,
      singleMovie: null,
      isSingleView: false,
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
      .catch((error) => this.setState({ isError: true }))
  }

  filterMovies = (searchTerm) => {
    this.setState({
      filteredMovies: this.state.movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }

  toggleView = (event) => {
    event.preventDefault()
    if (this.state.isSingleView) {
      this.setState((prevState) => {
        return { isSingleView: !prevState.isSingleView }
      })
    } else if (!this.state.isSingleView && event.target.name !== 'home') {
      this.setState((prevState) => {
        this.fetchData(`movies/${event.target.id}`)
          .then((data) => {
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
      <Switch>
        <Route exact path='/' render={() => {
          return <div>
            <Header
            movies={this.state.movies}
            isSingleView={this.state.isSingleView}
            toggleView={this.toggleView}
            filterMovies={this.filterMovies}
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
              movies={this.state.filteredMovies}
              isSingleView={this.state.isSingleView}
              toggleView={this.toggleView}
            />
          )}
          </div>
        }} />
        <Route exact path='/:id' render={() => { (
          <div>
            <Header
            movies={this.state.movies}
            isSingleView={this.state.isSingleView}
            toggleView={this.toggleView}
            filterMovies={this.filterMovies}
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
            {this.state.isSingleView && (
              <SingleView
                singleMovie={this.state.singleMovie}
                isSingleView={this.state.isSingleView}
              />
            )}
          </div>)
        }} />)
      </Switch>
    )
  }
}

export default App
