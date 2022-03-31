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
    fetch(
      `https://rancid-tomatillos.herokuapp.com/api/v2/users/${this.state.userData.id}/ratings/${idToDelete}`,
      {
        method: 'DELETE'
      }
    )
      .then((res) => {
        console.log(res)
        this.createRatingCards()
      })
      .catch((error) => {
        throw new Error(error)
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
        <div className='profile-title'>
          <h3>{`${this.state.userData.name}'s Profile`}</h3>
          <h4>Movies left to rate</h4>
          {this.state.ratings && (
            <div className='movies-to-rate'>
              <ToRate ratings={this.state.ratings} movies={this.props.movies} />
            </div>
          )}
          <h4>Your Ratings</h4>
        </div>
        <div className='ratings-view'>{<>{ratingCards}</>}</div>
      </div>
    )
  }
}

export default MyProfile
