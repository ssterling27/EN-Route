
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