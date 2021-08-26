
// navbar
document.addEventListener('DOMContentLoaded', () => {

  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  if ($navbarBurgers.length > 0) {

    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        const target = el.dataset.target;
        const $target = document.getElementById(target);

        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});

const localStorage = window.localStorage
const savedMovieSearch = localStorage.getItem('savedMovie') || ''
const savedShowSearch = localStorage.getItem('savedShow') || ''
let x = localStorage.getItem('x') || 0
let currentTrip = localStorage.getItem('currentTrip') || ''
let savedTrips = JSON.parse(localStorage.getItem('trip')) || []
if (savedTrips == '') {
  localStorage.setItem('trip', JSON.stringify([]))
} else {
  console.log('nothin')
}


document.getElementById('searchShow').addEventListener('click', event => {
  // event.preventDefault()
  const showSearchHome = document.getElementById('showSearch').value
  // savedShowSearch.push(showSearchHome)
  localStorage.setItem('savedShow', showSearchHome)
  // window.location.replace('./search.html')
  document.getElementById('showSearch').value = ''
  location.href = "./search.html"
})

document.getElementById('searchMovie').addEventListener('click', event => {
  event.preventDefault()
  const movieSearchHome = document.getElementById('movieSearch').value
  // savedMovieSearch.push(movieSearchHome)
  localStorage.setItem('savedMovie', movieSearchHome)
  // window.location.replace('./search.html')
  document.getElementById('movieSearch').value = ''
  location.href = "./search.html"
})

let trip = 'trip'

document.getElementById('createFromTimeInput').addEventListener('click', event => {
  event.preventDefault()
  // localStorage.setItem(thisTrip, [])
  const travelTime = document.getElementById('timeInput').value
  const tripName = document.getElementById('tripNameInput').value
  const tripData = {
    'name': `${tripName}`,
    'length': `${travelTime}`,
    'media': []
  }
  savedTrips.push(tripData)
  localStorage.setItem('trip', JSON.stringify(savedTrips))
  document.getElementById('timeInput').value = ''
  document.getElementById('tripNameInput').value = ''
  localStorage.setItem(`currentTrip`, `${x}`)
  x++
  localStorage.setItem('x', `${x}`)
})

if (currentTrip == '') {

} else {
  trip = (savedTrips)[currentTrip]
  tripTime = trip.length
  tripName = trip.name
  showTime = 0
  timeLeft = tripTime
  console.log(tripTime)
  let watchListElem = document.createElement('div')
  watchListElem.classList = 'tile'
  status = 'currentList'
  selectButton = ''
  watchListElem.innerHTML = `
  <div class="tile is-parent">
      <article class="tile is-child notification ${status}" id="${currentTrip}">
        <header class="head">
          <p class="title">${tripName}</p>
          <p class="headText column">Length: ${tripTime} minutes</p>
          <p class="headText column" id="showTime${currentTrip}">Show Time: ${showTime} minutes</p>
          <p class="headText column" id="remaining${currentTrip}">Remaining Time: ${timeLeft} minutes</p>
          ${selectButton}
          <button class="floater button is-danger deleteTrip">Delete Trip</button>
        </header>
          <div class="tile is-ancestor wrap" id="contentHere${currentTrip}">
            <!-- Content -->
          </div>
        </article>
      </div>
  `
  document.getElementById('watchListPreview').append(watchListElem)

  medias = trip.media
  console.log(medias)
  let i = 0
  medias.forEach(media => {
   if (i < 3) {
    console.log(media)
    if (media.type == 'Show') {
      let mediaElem = document.createElement('div')
      runtime = media.episodes * media.runtime
      mediaElem.classList = 'tile is-4 is-parent results'
      mediaElem.innerHTML = `
      <section class="tile is-child box" style="border: 1px solid blue;">
        <div class="card-image" id="${media.poster}">
          <figure class="image center">
            <img style="width:300px;" src="${media.poster}" alt="${media.title} Image">
          </figure>
        </div>
        </div class="card-content">
          <header class="card-header">
            <p class="card-header-title center">${media.title}</p>
          </header>
          <p>${media.type}</p>
          <p>${media.episodes} Episode(s)</p>
          <p>Runtime: ${runtime} minutes</p>
          <p>${media.genre}</p>
          <p>${media.synopsis}</p>
          
        </div>
      </section
      `
      document.getElementById(`contentHere${currentTrip}`).append(mediaElem)
      showTime = parseFloat(showTime) + parseFloat(runtime)
      timeLeft = timeLeft - runtime
    } else {
      let mediaElem = document.createElement('div')
      mediaElem.classList = 'tile is-4 is-parent results'
      mediaElem.innerHTML = `
      <section class="tile is-child box" style="border: 1px solid blue;">
        <div class="card-image" id="${media.poster}">
          <figure class="image center">
            <img style="width:300px;" src="${media.poster}" alt="${media.title} Image">
          </figure>
        </div>
        </div class="card-content">
          <header class="card-header">
            <p class="card-header-title center">${media.title}</p>
          </header>
          <p>${media.type}</p>
          <p>Runtime: ${media.runtime} minutes</p>
          <p>${media.genre}</p>
          <p>${media.synopsis}</p>
          
        </div>
      </section>
      `
      document.getElementById(`contentHere${currentTrip}`).append(mediaElem)
      showTime = parseFloat(showTime) + parseFloat(media.runtime)
      timeLeft = timeLeft - media.runtime
      
    }
    i++ }
    else {
     if (media.type == 'Show') {
       runtime = media.episodes * media.runtime
       showTime = parseFloat(showTime) + parseFloat(runtime)
       timeLeft = timeLeft - runtime
     } else {
       showTime = parseFloat(showTime) + parseFloat(media.runtime)
       timeLeft = timeLeft - media.runtime
    }
  }
})
  showText = document.getElementById(`showTime${currentTrip}`).textContent
  remainingText = document.getElementById(`remaining${currentTrip}`).textContent
  console.log(showText)
  console.log(remainingText)
  document.getElementById(`showTime${currentTrip}`).textContent = `Show Time: ${showTime} minutes`
  document.getElementById(`remaining${currentTrip}`).textContent = `Remaining Time: ${timeLeft} minutes`
}

document.addEventListener('click', event => {
  if (event.target.classList.contains('deleteTrip')) {
    savedTrips.splice(event.target.parentNode.parentNode.id, 1)
    currentTrip = 0
    x--
    localStorage.setItem('trip', JSON.stringify(savedTrips))
    localStorage.setItem('currentTrip', currentTrip)
    localStorage.setItem('x', x)
    window.location.reload(false)
  }
})