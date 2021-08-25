const localStorage = window.localStorage
let currentTrip = (localStorage.getItem('currentTrip')) || ''
trips = JSON.parse(localStorage.getItem('trip')) || []
console.log(trips)

trips.forEach(trip => {
  tripTime = trip.length
  tripName = trip.name
  movieTime = 0
  timeLeft = tripTime
  console.log(tripTime)
  
});