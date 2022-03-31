import React, { Component } from 'react'
import './MyProfile.css'
import RatingCard from '../RatingCard/RatingCard'
import ToRate from '../ToRate/ToRate'

export class MyProfile extends Component {
  constructor(props) {
    super(props)
    this.state = { userData: props.userData, ratings: null }
  }

  fetchData = (path) => {
    return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/${path}`)
      .then((res) => {
        if (!res.ok) {
          this.setState({ errorMsg: 'Something went wrong, try again later' })
        }
        return res.json()
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  componentDidMount() {
    this.fetchData(`/users/${this.state.userData.id}/ratings`).then((data) => {
      this.setState({
        ratings: data.ratings,
        ratingCards: data.ratings.map((review) => {
          return (
            <RatingCard
              key={review.id}
              movie_id={review.movie_id}
              rating={review.rating}
              dateRated={review.created_at}
              dateUpdated={review.updated_at}
              movies={this.props.movies}
            />
          )
        })
      })
    })
  }

  render() {
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
        <div className='ratings-view'>
          {this.state.ratings && <>{this.state.ratingCards}</>}
        </div>
      </div>
    )
  }
}

export default MyProfile
