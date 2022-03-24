import React, { Component } from 'react'

export class SingleView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log(this.props)
    const { title, poster_path, backdrop_path, release_date, average_rating } = this.props.singleMovie
    return (
      <section className="single-view">
        <article className="single-view-card">
          <img className='poster-img' src={poster_path} alt={`${title} poster`} />
          <h2 className='poster-title'>{title}</h2>
          <section className='poster-footer'>
            <div className='detail-pair'>
              <h3 className='footer-item-l label'>rating:</h3>
              <h3 className='footer-item-l'>{average_rating}</h3>
            </div>
            <div className='detail-pair'>
              <h3 className='footer-r label'>released in:</h3>
              <h3 className='footer-r'>{release_date}</h3>
            </div>
          </section>
        </article>
        <section className="single-movie-details">
        </section>
      </section>
    )
  }
}

export default SingleView
