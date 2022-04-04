import React, { Component } from 'react'
import Card from '../Card/Card'
import Modal from '../Modal/Modal'
import StarRatings from 'react-star-ratings/build/star-ratings'
import './SingleView.css'
import { fetchDataGet, fetchDataPost, fetchDataDelete } from '../APICalls'

export class SingleView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMovie: { id: props.currentMovieID.id },
      isModalOpen: false,
      ratingInput: null,
      modalErrMsg: ''
    }
  }

  componentDidMount() {
    fetchDataGet(`movies/${this.state.currentMovie.id}`)
      .then((res) => {
        if (!res.ok) {
          this.props.finishLoading()
          this.props.updateErrorMsg('Something went wrong, try again later')
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

  validateRating = () => {
    return this.state.ratingInput >= 1 && this.state.ratingInput <= 10 ? true : false
  }

  addRating = (newRating) => {
    const reviewID = this.props.userRatings.find(
      (rating) => rating.movie_id === this.state.currentMovie.id
    )
    if (reviewID) {
      this.props.deleteRating(reviewID.id)
    }
    this.setState({ ratingInput: newRating }, () => {
      if (this.validateRating()) {
        const dataToSend = {
          movie_id: parseInt(this.state.currentMovie.id),
          rating: parseInt(this.state.ratingInput)
        }
        fetchDataPost(`users/${this.props.userData.id}/ratings`, dataToSend)
          .then((res) => {
            if (!res.ok) {
              this.props.updateErrorMsg('Something went wrong, try again later')
              this.setState({
                isModalOpen: false
              })
            }
            this.setState({ isModalOpen: false })
            return res.json()
          })
          .then(() => {
            this.props.fetchRatings()
          })
      } else {
        this.setState({ modalErrMsg: 'Please choose a whole number betweeen 1 and 10' })
      }
    })
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
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

    let currentMovieRating
    if (this.props.userRatings) {
      currentMovieRating = this.props.userRatings.find((rating) => {
        return parseInt(id) === parseInt(rating.movie_id)
      })
    }

    return (
      <>
        {this.props.isLoading && (
          <p className='status-msg'>Loading... Grab some popcorn!</p>
        )}
        <h1 className='status-msg'>{this.props.errorMsg}</h1>
        {this.state.currentMovie.title && (
          <section className='single-view'>
            {this.state.isModalOpen && (
              <Modal
                addRating={this.addRating}
                toggleModal={this.toggleModal}
                modalErrMsg={this.state.modalErrMsg}
              />
            )}
            <div className='single-view-left'>
              <Card
                poster_path={poster_path}
                title={title}
                average_rating={average_rating}
                release_date={release_date}
                key={id}
              />
              {this.props.isLoggedIn && (
                <section className='review-view'>
                  <h3>your rating is: </h3>
                  <StarRatings
                    rating={currentMovieRating ? currentMovieRating.rating / 2 : 0}
                    starDimension='3vw'
                    starSpacing='0'
                    starRatedColor='goldenrod'
                  />
                  <button onClick={this.toggleModal}>rate this movie</button>
                </section>
              )}
            </div>

            <section className='single-movie-details'>
              {backdrop_path && (
                <img
                  className='backdrop-img'
                  src={backdrop_path}
                  alt={`${title} backdrop`}
                />
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
              {runtime !== 0 && (
                <h3 className='movie-detail'>Runtime: {runtime} minutes</h3>
              )}
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
        )}
      </>
    )
  }
}

export default SingleView
