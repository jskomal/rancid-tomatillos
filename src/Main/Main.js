import React from 'react'
import './Main.css'
import Card from '../Card/Card'

const Main = ({ movies, toggleView }) => {
  const cards = movies.map((movie) => (
    <Card
      poster_path={movie.poster_path}
      title={movie.title}
      average_rating={movie.average_rating}
      release_date={movie.release_date}
      key={movie.id}
      toggleView={toggleView}
    />
  ))

  return <main className='main-view'>{cards}</main>
}

export default Main
