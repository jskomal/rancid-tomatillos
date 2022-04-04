import React from 'react'
import './Main.css'
import Card from '../Card/Card'
import { Link } from 'react-router-dom'

const Main = ({ movies, toggleView }) => {
  let cards = []
  if (movies) {
    cards = movies.map((movie) => (
      <Link className='card-link' to={`/${movie.id}`} key={movie.id}>
        <Card
          id={movie.id}
          poster_path={movie.poster_path}
          title={movie.title}
          average_rating={movie.average_rating}
          release_date={movie.release_date}
          key={movie.id}
          toggleView={toggleView}
        />
      </Link>
    ))
  }
  return <main className='main-view'>{cards}</main>
}

export default Main
