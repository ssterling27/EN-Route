let x = 0
let dataPart = ''
document.getElementById('searchShow').addEventListener('click', event => {
  event.preventDefault()
  const showSearch = document.getElementById('showSearch').value

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
})