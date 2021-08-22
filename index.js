const localStorage = window.localStorage
const savedMovieSearch = localStorage.getItem('savedMovie') || ''
const savedShowSearch = localStorage.getItem('savedShow') || ''




document.getElementById('searchShow').addEventListener('click', event => {
  // event.preventDefault()
  const showSearchHome = document.getElementById('showSearch').value
  // savedShowSearch.push(showSearchHome)
  localStorage.setItem('savedShow', showSearchHome)
  // window.location.replace('./search.html')
  document.getElementById('showSearch').value = ''
})

document.getElementById('searchMovie').addEventListener('click', event => {
  event.preventDefault()
  const movieSearchHome = document.getElementById('movieSearch').value
  // savedMovieSearch.push(movieSearchHome)
  localStorage.setItem('savedMovie', movieSearchHome)
  // window.location.replace('./search.html')
  document.getElementById('movieSearch').value = ''
})
