import React from 'react'
import './MyProfile.css'
import RatingCard from '../RatingCard/RatingCard'
import ToRate from '../ToRate/ToRate'

export const MyProfile = ({
  userRatings,
  userData,
  movies,
  deleteRating,
  errorMsg,
  fetchRatings
}) => {
  let ratingCards = []
  if (userRatings) {
    ratingCards = userRatings.map((review) => {
      return (
        <RatingCard
          key={review.id}
          id={review.id}
          movie_id={review.movie_id}
          rating={review.rating}
          dateUpdated={review.updated_at}
          movies={movies}
          deleteRating={deleteRating}
          fetchRatings={fetchRatings}
        />
      )
    })
  }
  return (
    <div className='profile-view'>
      <h1 className='status-msg'>{errorMsg}</h1>
      <div className='profile-title'>
        <h1>{`Welcome to ${userData.name}'s Rating Room!`}</h1>
        <h2 className='ratings-divider'>Movies left to rate</h2>
        {userRatings && (
          <div className='movies-to-rate'>
            <ToRate ratings={userRatings} movies={movies} />
          </div>
        )}
        <h1 className='ratings-divider'>Your Ratings</h1>
      </div>
      <div className='ratings-view'>{<>{ratingCards}</>}</div>
    </div>
  )
}

export default MyProfile
