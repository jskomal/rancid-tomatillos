import React from 'react'
import StarRatings from 'react-star-ratings/build/star-ratings'
import dayjs from 'dayjs'
import './RatingCard.css'

const RatingCard = ({ movie_id, rating, dateRated, dateUpdated, movies }) => {
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
      <p>Rated on: {dayjs(dateRated).format('MMM D, YY')}</p>
      <p>Last Updated: {dayjs(dateUpdated).format('MMM D, YY')}</p>
      <div className='ratings-buttons'>
        <button>edit rating</button>
        <button>delete rating</button>
      </div>
    </section>
  )
}

export default RatingCard
