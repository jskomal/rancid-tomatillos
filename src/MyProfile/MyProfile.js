import React, { Component } from 'react'
import './MyProfile.css'
import RatingCard from '../RatingCard/RatingCard'
import ToRate from '../ToRate/ToRate'
import { fetchDataGet, fetchDataDelete } from '../APICalls'

export class MyProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: props.userData,
      ratings: null,
      ratingCards: null,
      errorMsg: ''
    }
  }

  createRatingCards = () => {
    fetchDataGet(`/users/${this.state.userData.id}/ratings`)
      .then((res) => {
        if (!res.ok) {
          this.setState({ errorMsg: 'Something went wrong, try again later' })
        }
        return res.json()
      })
      .then((data) => {
        this.setState({ ratings: data.ratings })
      })
  }

  componentDidMount() {
    this.createRatingCards()
  }

  deleteRating = (idToDelete) => {
    fetchDataDelete(`/users/${this.state.userData.id}/ratings/${idToDelete}`)
    .then((res) => {
      if (!res.ok) {
        this.setState({ errorMsg: 'Something went wrong, try again later' })
      } else {
        this.createRatingCards()
      }
    })
  }

  render() {
    let ratingCards = []
    if (this.state.ratings) {
      ratingCards = this.state.ratings.map((review) => {
        return (
          <RatingCard
            key={review.id}
            id={review.id}
            movie_id={review.movie_id}
            rating={review.rating}
            dateUpdated={review.updated_at}
            movies={this.props.movies}
            deleteRating={this.deleteRating}
          />
        )
      })
    }

    return (
      <div className='profile-view'>
        <h1 className='status-msg'>{this.state.errorMsg}</h1>
        <div className='profile-title'>
          <h1>{`Welcome to ${this.state.userData.name}'s Rating Room!`}</h1>
          <h2 className='ratings-divider'>Movies left to rate</h2>
          {this.state.ratings && (
            <div className='movies-to-rate'>
              <ToRate ratings={this.state.ratings} movies={this.props.movies} />
            </div>
          )}
          <h1 className='ratings-divider'>Your Ratings</h1>
        </div>
        <div className='ratings-view'>{<>{ratingCards}</>}</div>
      </div>
    )
  }
}

export default MyProfile
