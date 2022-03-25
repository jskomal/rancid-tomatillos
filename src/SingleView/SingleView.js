import React, { Component } from 'react'
import Card from '../Card/Card'
import './SingleView.css'

export class SingleView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { id, title, poster_path, backdrop_path, release_date, overview, average_rating, genres, budget, revenue, runtime, tagline } = this.props.singleMovie
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })

    return (
      <section className="single-view">
        <Card
          poster_path={poster_path}
          title={title}
          average_rating={average_rating}
          release_date={release_date}
          key={id}
        />
        <section className="single-movie-details">
          <img className="backdrop-img" src={backdrop_path} alt={`${title} backdrop`} />
          <h3 className="movie-detail">Tagline: {tagline}</h3>
          <h3 className="movie-detail">Overview: {overview}</h3>
          <h3 className="movie-detail">Genres: {genres}</h3>
          <h3 className="movie-detail">Budget: {formatter.format(budget)}</h3>
          <h3 className="movie-detail">Revenue: {formatter.format(revenue)}</h3>
          <h3 className="movie-detail">Runtime: {runtime} minutes</h3>
        </section>
      </section>
    )
  }
}

export default SingleView
