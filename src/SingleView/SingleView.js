import React, { Component } from 'react'
import Card from '../Card/Card'

export class SingleView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log(this.props)
    const { id, title, poster_path, backdrop_path, release_date, overview, average_rating, genres, budget, revenue, runtime, tagline } = this.props.singleMovie
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
          <h3 className="movie-detail">{tagline}</h3>
          <h3 className="movie-detail">{overview}</h3>
          <h3 className="movie-detail">{genres}</h3>
          <h3 className="movie-detail">{budget}</h3>
          <h3 className="movie-detail">{revenue}</h3>
          <h3 className="movie-detail">{runtime}</h3>
        </section>
      </section>
    )
  }
}

export default SingleView
