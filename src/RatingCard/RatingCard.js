import React from 'react'
import StarRatings from 'react-star-ratings/build/star-ratings'
import dayjs from 'dayjs'
import './RatingCard.css'

const RatingCard = ({ movie_id, rating, dateUpdated, movies }) => {
  const currentMovie = movies.find((movie) => movie_id === movie.id)

  return (
    <section className='rating-card'>
      <img src={currentMovie.poster_path} alt={`${currentMovie.title} Poster`} />
      <h3>{currentMovie.title}</h3>
      <div>
        <StarRatings
          rating={rating / 2}
          starDimension='1vw'
          starSpacing='0'
          starRatedColor='goldenrod'
        />
      </div>
      <p>Rating last Updated: {dayjs(dateUpdated).format('MMMM D, YYYY')}</p>
      <button className='ratings-button'>delete rating</button>
    </section>
  )
}

export default RatingCard
