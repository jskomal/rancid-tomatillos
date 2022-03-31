import React, { Component } from 'react'
import Card from '../Card/Card'
import Modal from '../Modal/Modal'
import './SingleView.css'
import { fetchDataGet } from '../APICalls'

export class SingleView extends Component {
  constructor(props) {
    super(props)
    this.state = { currentMovie: { id: props.currentMovieID.id }, errorMsg: '', isModalOpen: false }
  }

  componentDidMount() {
    fetchDataGet(`movies/${this.state.currentMovie.id}`)
      .then((res) => {
        if (!res.ok) {
          this.setState({ errorMsg: 'Something went wrong, try again later' })
        }
        return res.json()
      })
      .then((data) => {
        this.props.finishLoading()
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
        <h1 className='status-msg'>{this.state.errorMsg}</h1>
        <Modal
        />
        <div>
          <Card
            poster_path={poster_path}
            title={title}
            average_rating={average_rating}
            release_date={release_date}
            key={id}
          />
        <section className='review-view'>
          <h3>your rating is: </h3>
          {/* add star rating here */}
          <button>rate this movie</button>
        </section>
        </div>

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
            <h3 className='movie-detail-error'>
              No information is available for this movie
            </h3>
          ) : null}
        </section>
      </section>
    ) : (
      <h1 className='status-msg'>Loading... Grab some popcorn!</h1>
    )
  }
}

export default SingleView
