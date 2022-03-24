import React, { Component } from 'react'
import Card from '../Card/Card'

export class SingleView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log(this.props)
    const { id, title, poster_path, backdrop_path, release_date, average_rating } = this.props.singleMovie
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
        </section>
      </section>
    )
  }
}

export default SingleView
