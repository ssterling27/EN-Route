let x = 0
let dataPart = ''
document.getElementById('searchMovie').addEventListener('click', event => {
  event.preventDefault()
  const movieSearch = document.getElementById('movieSearch').value

  axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${movieSearch}`)
    .then(res => {
      movie = res.data
      console.log(movie)
      document.getElementById('movieSearch').innerHTML = ''
        // movies.forEach(movie => {
        let movieImage = movie.Poster
        if (movieImage == null) {
          movieImage = 'https://bitsofco.de/content/images/2018/12/broken-1.png'
        } else {
          movieImage = movie.Poster
        }
        const movieElem = document.createElement('div')
        movieElem.classList = 'card'
        movieElem.style = "width: 500px; border: 1px solid blue;"
        movieElem.innerHTML = `
        <div class="card-image">
          <figure class="image center">
            <img style="width:300px;" src="${movieImage}" alt="${movie.Title} Image">
          </figure>
        </div>
        </div class="card-content">
          <header class="card-header">
            <p class="card-header-title center">${movie.Title}</p>
          </header>
          <p>Runtime: ${movie.Runtime}</p>
          <p>Genre: ${movie.Genre}</p>
          <p>Synopsis: ${movie.Plot}</p>
          <button class="button is-primary" id="saveMovie">Add to List</button>
        </div>
        `
        document.getElementById('showResults').append(movieElem)
      // })
      document.getElementById('movieSearch').value = ''
    })
    .catch(err => console.error(err))
})