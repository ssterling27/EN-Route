let minutes = ''
let routeTime = ''
let route = 'route'

const getMinutes = () => {
  var a = routeTime.split(':')
  minutes = (+a[0]) * 60 + (+a[1])
}

document.getElementById('calculateRoute').addEventListener('click', event => {
  event.preventDefault()

  const startLocation = document.getElementById('startLocation').value
  const endLocation = document.getElementById('endLocation').value

  axios.get(`http://www.mapquestapi.com/directions/v2/route?key=AuAAUW4MFK4rMJMK3n9ulgMAPUlelbS7&from=${startLocation}&to=${endLocation}`)
    .then(res => {
      const trip = res.data

      document.getElementById('startLocation').innerHTML = ''
      document.getElementById('endLocation').innerHTML = ''

      routeTime = trip.route.formattedTime
      getMinutes()

      //  console.log(trip)

      document.getElementById('timeInput').value = `${minutes}`
    })
    document.getElementById('startLocation').value = ''
    document.getElementById('endLocation').value = ''
})



// travelTime >= watchTime











// document.getElementById('search').addEventListener('click', event => {
//   event.preventDefault()

//   const location = document.getElementById('route').value

//   const from = document.getElementById('from').value

//   const to = document.getElementById('to').value

//   axios.get(`http://www.mapquestapi.com/directions/v2/route?key=AuAAUW4MFK4rMJMK3n9ulgMAPUlelbS7&from=${from}&to=${to}`)
//     .then(res => {
//       const route = res.data

//       console.log(res)
//         .catch(err => console.error(err))
//     })

//   })

