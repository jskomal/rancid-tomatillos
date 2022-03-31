import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../Card/Card'
import './ToRate.css'

const ToRate = ({ movies, ratings }) => {
  const ratedIDs = ratings.map((rating) => rating.movie_id)
  const filteredMoviesToRate = movies.filter((movie) => !ratedIDs.includes(movie.id))
  const moviesToRate = filteredMoviesToRate.map((movie) => (
    <Link className='card-link' to={`/${movie.id}`} key={movie.id}>
      <Card
        id={movie.id}
        poster_path={movie.poster_path}
        title={movie.title}
        average_rating={movie.average_rating}
        release_date={movie.release_date}
        key={movie.id}
      />
    </Link>
  ))
  return <div className='movies-to-rate-view'>{moviesToRate}</div>
}

export default ToRate
