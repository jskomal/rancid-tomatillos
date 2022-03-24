import React from 'react'
import './Card.css'

const Card = ({ poster_path, title, average_rating, release_date }) => {
  return (
    <article className='poster-card'>
      <img className='poster-img' src={poster_path} alt={`${title} poster`} />
      <h2 className='poster-title'>{title}</h2>
      <section className='poster-footer'>
        <h3 className='footer-item'>{`rating: ${average_rating.toFixed(2)}`}</h3>
        <h3 className='footer-item'>{`released in ${release_date.substring(0, 4)}`}</h3>
      </section>
    </article>
  )
}

export default Card
