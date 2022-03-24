import React from 'react'
import './Card.css'

const Card = ({ poster_path, title, average_rating, release_date, toggleView }) => {
  return (
    <article className='poster-card' onClick={toggleView}>
      <img className='poster-img' src={poster_path} alt={`${title} poster`} />
      <h2 className='poster-title'>{title}</h2>
      <section className='poster-footer'>
        <div className='detail-pair'>
          <h3 className='footer-item-l label'>rating:</h3>
          <h3 className='footer-item-l'>{average_rating.toFixed(2)}</h3>
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
