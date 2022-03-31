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
  }).catch((error) => {
    throw new Error(error)
  })
}

const fetchDataPost = (path, body) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/${path}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }).catch((error) => {
    throw new Error(error)
  })
}

export { fetchDataGet, fetchDataDelete, fetchDataPost }
