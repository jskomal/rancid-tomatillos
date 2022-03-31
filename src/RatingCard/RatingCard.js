import React from 'react'
import './RatingCard.css'

const RatingCard = ({ movie_id, rating, dateRated, dateUpdated }) => {
  return (
    <section className='rating-card'>
      <h5>{movie_id}</h5>
      <p>{rating}</p>
      <p>{dateRated}</p>
      <p>{dateUpdated}</p>
    </section>
  )
}

export default RatingCard
