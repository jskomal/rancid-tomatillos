const fetchDataGet = (path) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/${path}`).catch(
    (error) => {
      throw new Error(error)
    }
  )
}
const fetchDataDelete = (path) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/${path}`, {
    method: 'DELETE'
  })
}

export { fetchDataGet, fetchDataDelete }

// ratingCards: data.ratings.map((review) => {
//   return (
//     <RatingCard
//       key={review.id}
//       id={review.id}
//       movie_id={review.movie_id}
//       rating={review.rating}
//       dateUpdated={review.updated_at}
//       movies={this.props.movies}
//       deleteRating={this.deleteRating}
//     />
//   )
// })
