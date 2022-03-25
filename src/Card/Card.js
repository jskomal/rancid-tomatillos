import React from 'react'
import StarRatings from 'react-star-ratings/build/star-ratings'
import './Card.css'

const Card = ({ poster_path, title, average_rating, release_date, toggleView }) => {
  return (
    <article className='poster-card' onClick={toggleView}>
      <img className='poster-img' src={poster_path} alt={`${title} poster`} />
      <h2 className='poster-title'>{title}</h2>
      <section className='poster-footer'>
        <div className='detail-pair'>
          <h3 className='footer-item-l label'>rating:</h3>
          <StarRatings
            rating={parseFloat((average_rating / 2).toFixed(2))}
            starDimension='1vw'
            starSpacing='0'
            starRatedColor='goldenrod'
          />
        </div>
        <div className='detail-pair'>
          <h3 className='footer-r label'>released in:</h3>
          <h3 className='footer-r'>{release_date.substring(0, 4)}</h3>
        </div>
      </section>
    </article>
  )
}

export default Card
