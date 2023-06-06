const resultsContainer = document.getElementById("results");
const modalsContainer = document.getElementById("modals");

document.getElementById("startBtn").addEventListener("click", function (event) {
  fetchMovieResults();
  saveStremaingPlatform();
});

//function for local storage
var platformBox = $('.platformBox')
function getInfo() {
  var selectedStreaming = JSON.parse(localStorage.getItem('platform'))
  platformBox.each(function () {
    // console.log(this.value)
    for (var i = 0; i < selectedStreaming.length; i++) {
      if (this.value == selectedStreaming[i]) {
        this.checked = true
      }
    }
  })

}
getInfo()
function saveStremaingPlatform() {
  var selectedStreaming = [];
  var checkedBoxes = $('input[type="checkbox"]:checked');
  for (var i = 0; i < checkedBoxes.length; i++) {
    var value = $(checkedBoxes[i]).val();
    selectedStreaming.push(value);
  }
  localStorage.setItem("platform", JSON.stringify(selectedStreaming));
}

function fetchMovieResults() {
  var selectedGenre = $("#genreSelect").val();
  var selectedStreaming = [];
  var keyword = $("#keywordInput").val();
  var checkedBoxes = $('input[type="checkbox"]:checked');

  for (var i = 0; i < checkedBoxes.length; i++) {
    var value = $(checkedBoxes[i]).val();
    selectedStreaming.push(value);
  }

  var streamingParam = selectedStreaming.join("%2C");
  var apiURL = `https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=${streamingParam}&output_language=en&show_type=movie&genre=${selectedGenre}&show_original_language=en&keyword=${keyword}`;
  const settings = {
    async: true,
    crossDomain: true,
    url: apiURL,
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3a0a39d101msh08a21993ce251cep1cd214jsn486a3c0404ce",
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    // console.log(response);
    resultsContainer.innerHTML = ''
    for (let i = 0; i < 5; i++) {
      const title = response.result[i].title;
      const releaseYear = response.result[i].year;
      const movieImg = response.result[i].backdropURLs.original;
      const poster = response.result[i].posterURLs.original;
      const overview = response.result[i].overview;
      const runtime = response.result[i].runtime; 
      const rating = response.result[i].imdbRating;
      const youtubeId = response.result[i].youtubeTrailerVideoId;

      // Create a movie item element
      const movieItem = document.createElement("div");
      movieItem.classList.add("results-item");

      // Populate the movie item with data
      movieItem.innerHTML =
        `<img class="movieImgThumbNail" src="${movieImg}">
          <h3>${title} - ${releaseYear}</h3>
          <button data-target="modal${i}" class="btn modal-trigger">More</button>`;

      const modalItem = document.createElement("div");
      modalItem.innerHTML =
        `<div id="modal${i}" class="modal">
        <div class="modal-content">
          <h4>${title}</h4>
          <img src="${poster}" class="poster">
          <p>${releaseYear} | Runtime: ${runtime} minutes | IMDb Score ${rating}/100</p>
          <p>${overview}</p>
          <div class="youtube-player" data-id="${youtubeId}"></div>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
      </div>`;

      // Append the movie item to the movie container
      resultsContainer.appendChild(movieItem);
      modalsContainer.appendChild(modalItem);
    }
    $('.modal').modal();
    loadYouTubePlayers();
  });
}

function loadYouTubePlayers() {
  const youtubePlayers = document.querySelectorAll('.youtube-player');

  youtubePlayers.forEach(function (playerElement) {
    const videoId = playerElement.getAttribute('data-id');
    const player = new YT.Player(playerElement, {
      width: 480,
      height: 270,
      videoId: videoId,
      events: {
        'onReady': onPlayerReady
      }
    });
  });
}

function onPlayerReady(event) {
  const closeButton = event.target.getIframe().closest('.modal').querySelector('.modal-close');

  closeButton.addEventListener('click', function () {
    event.target.stopVideo();
    event.target.getPlayerState = -1;
  });
}
