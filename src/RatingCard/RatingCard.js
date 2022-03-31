import React from 'react'

const RatingCard = ({ movie_id, rating, dateRated, dateUpdated }) => {
  return (
    <div>
      <h5>{movie_id}</h5>
      <p>{rating}</p>
      <p>{dateRated}</p>
      <p>{dateUpdated}</p>
    </div>
  )
}

export default RatingCard
