import React from 'react'
import StarRatings from 'react-star-ratings/build/star-ratings'
import './Card.css'

const Card = ({ poster_path, title, average_rating, release_date, toggleView, id }) => {
  return (
    <article id={id} className='poster-card' onClick={toggleView}>
      <img id={id} className='poster-img' src={poster_path} alt={`${title} poster`} />
      <h2 id={id} className='poster-title'>
        {title}
      </h2>
      <section id={id} className='poster-footer'>
        <div id={id} className='detail-pair'>
          <h3 id={id} className='footer-item-l label'>
            rating:
          </h3>
          <StarRatings
            rating={parseFloat((average_rating / 2).toFixed(2))}
            starDimension='1vw'
            starSpacing='0'
            starRatedColor='goldenrod'
          />
        </div>
        <div id={id} className='detail-pair'>
          <h3 id={id} className='footer-r label'>
            released in:
          </h3>
          <h3 id={id} className='footer-r'>
            {release_date.substring(0, 4)}
          </h3>
        </div>
      </section>
    </article>
  )
}

export default Card
