const localStorage = window.localStorage
let currentTrip = (localStorage.getItem('currentTrip')) || ''
trips = JSON.parse(localStorage.getItem('trip')) || []
let x = localStorage.getItem('x') || 0
console.log(trips)
let i = 0
let showTime = 0
let status = ''
trips.forEach(trip => {
  tripTime = trip.length
  tripName = trip.name
  showTime = 0
  timeLeft = tripTime
  console.log(tripTime)
  let watchListElem = document.createElement('div')
  watchListElem.classList = 'tile'
  if (i == currentTrip) {
    status = 'currentList'
    selectButton = ''
  } else {
    status = 'notCurrentList'
    selectButton = '<button class="button is-info selectTrip">Select Trip</button>'
  }
  watchListElem.innerHTML = `
  <div class="tile is-parent">
      <article class="tile is-child notification ${status}" id="${i}">
        <header class="head">
          <p class="title">${tripName}</p>
          <p>Length: ${tripTime}</p>
          <p id="showTime${i}">Show Time: ${showTime}</p>
          <p id="remaining${i}">Remaining Time: ${timeLeft}</p>
          ${selectButton}
          <button class="button is-danger deleteTrip">Delete Trip</button>
        </header>
          <div class="tile is-ancestor wrap" id="contentHere${i}">
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
          <button class="button is-primary addEpisode">Add Episode</button>
          <button class="button is-warning removeEpisode">Remove Episode</button>
          <button class="button is-danger remove">Delete</button>
        </div>
      </section
      `
      document.getElementById(`contentHere${i}`).append(mediaElem)
      showTime = parseFloat(showTime) + parseFloat(runtime)
      timeLeft = timeLeft - runtime
    } else {
    let mediaElem = document.createElement('div')
    mediaElem.classList = 'tile is-4 is-parent results'
    mediaElem.innerHTML = `
      <section class="tile is-child box" style="border: 1px solid blue;">
        <div class="card-image" id="${media.poster}">
          <figure class="image center">
            <img style="width:50px;" src="${media.poster}" alt="${media.title} Image">
          </figure>
        </div>
        </div class="card-content has-text-centered">
          <header class="card-header">
            <p class="card-header-title center">${media.title}</p>
          </header>
          <p>${media.type}</p>
          <p>Runtime: ${media.runtime} minutes</p>
          <p>${media.genre}</p>
          <p>${media.synopsis}</p>
          <button class="button is-danger remove">Delete</button>
        </div>
      </section>
      `
      document.getElementById(`contentHere${i}`).append(mediaElem)
      showTime = parseFloat(showTime) + parseFloat(media.runtime)
      timeLeft = timeLeft - media.runtime
    }
    
  })
  showText = document.getElementById(`showTime${i}`).textContent
  remainingText = document.getElementById(`remaining${i}`).textContent
  console.log(showText)
  console.log(remainingText)
  document.getElementById(`showTime${i}`).textContent = `Show Time: ${showTime}`
  document.getElementById(`remaining${i}`).textContent = `Remaining Time: ${timeLeft}`
  i++
});

document.addEventListener('click', event => {
  if (event.target.classList.contains('addEpisode')) {
    thisTitle = event.target.parentNode.childNodes[3].innerText
    thisTrip = trips[event.target.parentNode.parentNode.parentNode.parentNode.id]
    medias = thisTrip.media
    thisTripEpisodes = thisTrip.media.episodes
    medias.forEach(media => {
      if (media.title == thisTitle) {
        newEpisodes = media.episodes + 1
        console.log(newEpisodes)
        media.episodes = newEpisodes
        localStorage.setItem(`trip`, JSON.stringify(trips))
        window.location.reload(false)
      }
    })
  }
  else if (event.target.classList.contains('remove')) {
    thisTitle = event.target.parentNode.childNodes[3].innerText
    thisTrip = trips[event.target.parentNode.parentNode.parentNode.parentNode.id]
    medias = thisTrip.media
    medias.forEach(media => {
      if (media.title == thisTitle) {
        thisLoc = medias.indexOf(media)
        medias.splice(thisLoc, 1)
        console.log(medias)
        localStorage.setItem(`trip`, JSON.stringify(trips))
        window.location.reload(false)
      }
    })
  }
  else if (event.target.classList.contains('removeEpisode')) {
    thisTitle = event.target.parentNode.childNodes[3].innerText
    thisTrip = trips[event.target.parentNode.parentNode.parentNode.parentNode.id]
    medias = thisTrip.media
    thisTripEpisodes = thisTrip.media.episodes
    medias.forEach(media => {
      if (media.title == thisTitle) {
        newEpisodes = media.episodes - 1
        console.log(newEpisodes)
        media.episodes = newEpisodes
        localStorage.setItem(`trip`, JSON.stringify(trips))
        window.location.reload(false)
     }
    })
  }
  else if (event.target.classList.contains('selectTrip')) {
    localStorage.setItem('currentTrip', event.target.parentNode.parentNode.id)
    window.location.reload(false)
  }
  else if (event.target.classList.contains('deleteTrip')) {
    trips.splice(event.target.parentNode.parentNode.id, 1)
    currentTrip = 0
    x--
    localStorage.setItem('trip', JSON.stringify(trips))
    localStorage.setItem('currentTrip', currentTrip)
    localStorage.setItem('x', x)
    window.location.reload(false)
  }
})