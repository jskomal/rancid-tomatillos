import React, { Component } from 'react'
import Card from '../Card/Card'
import './SingleView.css'

export class SingleView extends Component {
  constructor(props) {
    super(props)
    this.state = { currentMovie: { id: props.currentMovieID.id } }
  }

  fetchData = (path) => {
    return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/${path}`).then((res) => {
      return res.json()
    })
  }

  componentDidMount() {
    this.props.toggleSingleView()
    this.fetchData(`movies/${this.state.currentMovie.id}`).then((data) => {
      this.setState({
        currentMovie: { ...data.movie }
      })
    })
  }

  render() {
    const {
      id,
      title,
      poster_path,
      backdrop_path,
      release_date,
      overview,
      average_rating,
      genres,
      budget,
      revenue,
      runtime,
      tagline
    } = this.state.currentMovie
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })

    return this.state.currentMovie.title ? (
      <section className='single-view'>
        <Card
          poster_path={poster_path}
          title={title}
          average_rating={average_rating}
          release_date={release_date}
          key={id}
        />

        <section className='single-movie-details'>
          {backdrop_path && (
            <img className='backdrop-img' src={backdrop_path} alt={`${title} backdrop`} />
          )}
          {tagline && <h3 className='movie-detail'>Tagline: {tagline}</h3>}
          {overview && <h3 className='movie-detail'>Overview: {overview}</h3>}
          {genres[0] && (
            <h3 className='movie-detail'>
              Genres: {genres.map((genre) => ` ${genre}`).toString()}
            </h3>
          )}
          {budget !== 0 && (
            <h3 className='movie-detail'>Budget: {formatter.format(budget)}</h3>
          )}
          {revenue !== 0 && (
            <h3 className='movie-detail'>Revenue: {formatter.format(revenue)}</h3>
          )}
          {runtime !== 0 && <h3 className='movie-detail'>Runtime: {runtime} minutes</h3>}
          {!tagline &&
          !overview &&
          !genres[0] &&
          !budget !== 0 &&
          !revenue !== 0 &&
          !runtime !== 0 ? (
            <h3
              className='movie-detail-error'
              style={{ marginBottom: '20vh', padding: '0 1rem' }}
            >
              No information is available for this movie
            </h3>
          ) : null}
        </section>
      </section>
    ) : (
      <h1 style={{ textAlign: 'center', marginTop: '5vh' }}>
        Loading... Grab some popcorn!
      </h1>
    )
  }
}

export default SingleView
