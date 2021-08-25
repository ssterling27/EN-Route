const localStorage = window.localStorage
let currentTrip = (localStorage.getItem('currentTrip')) || ''
trips = JSON.parse(localStorage.getItem('trip')) || []
console.log(trips)
let i = 0
let showTime = 0
trips.forEach(trip => {
  i = 0
  tripTime = trip.length
  tripName = trip.name
  showTime = 0
  timeLeft = tripTime
  console.log(tripTime)
  let watchListElem = document.createElement('div')
  watchListElem.classList = 'tile'
  watchListElem.innerHTML = `
  <div class="tile is-parent">
      <article class="tile is-child notification is-warning">
        <header>
          <p class="title">${tripName}</p>
          <p>Length: ${tripTime}</p>
          <p id="showTime${i}">Show Time: ${showTime}</p>
          <p id="remaining${i}">Remaining Time: ${timeLeft}</p>
        </header>
          <div class="content" id="contentHere${i}">
            <!-- Content -->
          </div>
        </article>
      </div>
  `
  document.getElementById('watchListsHere').append(watchListElem)

  medias = trip.media
  console.log(medias)
  medias.forEach(media => {
    console.log(media)
    let mediaElem = document.createElement('div')
    mediaElem.classList = 'card movieResult'
    mediaElem.style = "width: 500px; border: 1px solid blue;"
    mediaElem.innerHTML = `
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
          <button class="button is-primary saveMovie">Add to List</button>
        </div>
        `
      document.getElementById(`contentHere${i}`).append(mediaElem)
      showTime = parseFloat(showTime) + parseFloat(media.runtime)
      timeLeft = timeLeft - media.runtime
  })
  showText = document.getElementById(`showTime${i}`).textContent
  remainingText = document.getElementById(`remaining${i}`).textContent
  console.log(showText)
  console.log(remainingText)
  document.getElementById(`showTime${i}`).textContent = `Show Time: ${showTime}`
  document.getElementById(`remaining${i}`).textContent = `Remaining Time: ${timeLeft}`
  i++
});