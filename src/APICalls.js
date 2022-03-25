const fetchData = (path) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/${path}`).then((res) => {
    return res.json()
  })
}

export { fetchData }
