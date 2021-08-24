const localStorage = window.localStorage
const savedMovie = (localStorage.getItem('savedMovie')) || ''
const savedShow = (localStorage.getItem('savedShow')) || ''
const removeChilds = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};
const searchForMovie = () => {

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
      movieElem.classList = 'card movieResult'
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
      document.getElementById('movieResults').append(movieElem)
      // })
      document.getElementById('movieSearch').value = ''
    })
    .catch(err => console.error(err))
}

const searchForShow = () => {

  axios.get(`https://api.tvmaze.com/search/shows?q=${showSearch}`)
    .then(res => {
      shows = res.data
      console.log(shows)
      document.getElementById('showSearch').innerHTML = ''
      shows.forEach(show => {
        let showImage = show.show.image
        if (showImage == null) {
          showImage = 'https://bitsofco.de/content/images/2018/12/broken-1.png'
        } else {
          showImage = show.show.image.original
        }
        const showElem = document.createElement('div')
        showElem.classList = 'card'
        showElem.style = "width: 500px; border: 1px solid blue;"
        showElem.innerHTML = `
        <div class="card-image">
          <figure class="image center">
            <img style="width:300px;" src="${showImage}" alt="${show.show.name} Image">
          </figure>
        </div>
        </div class="card-content">
          <header class="card-header">
            <p class="card-header-title center">${show.show.name}</p>
          </header>
          <p>Runtime: ${show.show.averageRuntime} minutes</p>
          <p>Genre: ${show.show.genres}</p>
          <p>Synopsis: ${show.show.summary}</p>
          <button class="button is-primary" id="saveShow">Add to List</button>
        </div>
        `
        document.getElementById('showResults').append(showElem)
      })
      document.getElementById('showSearch').value = ''
    })
    .catch(err => console.error(err))
}
let movieSearch = ''
let showSearch = ''

if (savedMovie == '') {
  console.log('nothing here')
} else {
  movieSearch = savedMovie
  axios.get(`http://www.omdbapi.com/?apikey=trilogy&s=${movieSearch}&type=movie`)
    .then(res => {
      results = res.data.Search
      results.forEach(result => {
        movieSearch = result.Title
        searchForMovie()
      })
    })
  searchForMovie()
  localStorage.setItem('savedMovie', '')
}

if (savedShow == '') {
  console.log('nothing here')
} else {
  showSearch = savedShow
  searchForShow()
  localStorage.setItem('savedShow', '')
}

document.getElementById('searchShow').addEventListener('click', event => {
  event.preventDefault()
  removeChilds(showResults)
  showSearch = document.getElementById('showSearch').value
  searchForShow()
})

document.getElementById('searchMovie').addEventListener('click', event => {
  event.preventDefault()
  removeChilds(movieResults)
  movieSearch = document.getElementById('movieSearch').value
  axios.get(`http://www.omdbapi.com/?apikey=trilogy&s=${movieSearch}&type=movie`)
    .then(res => {
      results = res.data.Search
      results.forEach(result => {
        movieSearch = result.Title
        searchForMovie()
      })
    })
})

