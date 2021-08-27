const localStorage = window.localStorage
const savedMovie = (localStorage.getItem('savedMovie')) || ''
const savedShow = (localStorage.getItem('savedShow')) || ''
const removeChilds = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};
let currentTrip = (localStorage.getItem('currentTrip')) || ''
console.log(currentTrip)
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
        <div class="card-image" id="${movieImage}">
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
          <button class="button is-primary saveMovie">Add to List</button>
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
        <div class="card-image" id="${showImage}">
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
          <button class="button is-primary saveShow" id="saveShow">Add to List</button>
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
  axios.get(`https://www.omdbapi.com/?apikey=trilogy&s=${movieSearch}&type=movie`)
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
  axios.get(`https://www.omdbapi.com/?apikey=trilogy&s=${movieSearch}&type=movie`)
    .then(res => {
      results = res.data.Search
      results.forEach(result => {
        movieSearch = result.Title
        searchForMovie()
      })
    })
})
let mediaInfo = ''
document.addEventListener('click', event => {
  if (event.target.classList.contains('saveMovie')) {
    // mediaStuff = event.target.parentNode.childNodes
    title = event.target.parentNode.childNodes[3].innerText
    // console.log(mediaStuff)
    poster = event.target.parentNode.childNodes[1].id
    poster.trim()
    runtime = event.target.parentNode.childNodes[5].innerText
    runtime = runtime.replace(/\D/g, '')
    // console.log(runtime)
    genre = event.target.parentNode.childNodes[7].innerText
    synopsis = event.target.parentNode.childNodes[9].innerText
    mediaInfo = {
      'type': 'Movie',
      'title': title,
      'poster': poster,
      'runtime': runtime,
      'genre': genre,
      'synopsis': synopsis
    }
    // console.log(mediaInfo)
    trip = JSON.parse(localStorage.getItem(`trip`))
    thisTrip = trip[`${currentTrip}`]
    thisTripMedia = thisTrip.media
    // console.log(thisTripMedia)
    thisTripMedia.push(mediaInfo)
    localStorage.setItem(`trip`, JSON.stringify(trip))
    event.target.parentNode.remove()
  }
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('saveShow')) {
    console.log(event.target.parentNode.childNodes)
    title = event.target.parentNode.childNodes[3].innerText
    poster = event.target.parentNode.childNodes[1].id
    runtime = event.target.parentNode.childNodes[5].innerText
    runtime = runtime.replace(/\D/g, '')
    genre = event.target.parentNode.childNodes[7].innerText
    synopsis = `${event.target.parentNode.childNodes[9].innerText} ${event.target.parentNode.childNodes[10].innerText}`
    mediaInfo = {
      'type': 'Show',
      'originalRuntime': runtime,
      'episodes': 1,
      'title': title,
      'poster': poster,
      'runtime': runtime,
      'genre': genre,
      'synopsis': synopsis
    }
    // console.log(mediaInfo)
    trip = JSON.parse(localStorage.getItem(`trip`))
    thisTrip = trip[`${currentTrip}`]
    thisTripMedia = thisTrip.media
    // console.log(thisTripMedia)
    thisTripMedia.push(mediaInfo)
    localStorage.setItem(`trip`, JSON.stringify(trip))
    event.target.parentNode.remove()
  }
})