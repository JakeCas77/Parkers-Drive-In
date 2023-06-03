const resultsContainer = document.getElementById("results");
const modalsContainer = document.getElementById("modals");
document.getElementById("startBtn").addEventListener("click", function (event) {
  fetchMovieResults();
  saveStremaingPlatform();
});
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
    console.log(response);
    for (let i = 0; i < 8; i++) {
      const title = response.result[i].title;
      const releaseYear = response.result[i].year;
      const movieImg = response.result[i].backdropURLs.original;
      const overview = response.result[i].overview;
      const runtime = response.result[i].runtime; 
      const rating = response.result[i].imdbRating;
      const YoutubeLink = response.result[i].youtubeTrailerVideoLink; 
      // Create a movie item element
      const movieItem = document.createElement("div");
      movieItem.classList.add("results-item");
      // Populate the movie item with data
      // <button class="button open-button">More Info</button>
      movieItem.innerHTML =
        `<img class="movieImgThumbNail" src="${movieImg}">
          <h3>${title} - ${releaseYear}</h3>
          <button data-target="modal${i}" class="btn modal-trigger">More Info</button>`;

      const modalItem = document.createElement("div");
      modalItem.innerHTML =
        `<div id="modal${i}" class="modal">
        <div class="modal-content">
          <h4>${title}</h4>
          <p>${releaseYear}</p>
          <p>${overview}</p>
          <p>Runtime Minutes: ${runtime}</p>
          <p>IMDb Rating Score: ${rating}</p>
          <p>${YoutubeLink}</p>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
      </div>`;

      // Append the movie item to the movie container
      resultsContainer.appendChild(movieItem);
      modalsContainer.appendChild(modalItem);
    }
    // $(document).ready(function(){
      $('.modal').modal();
    // });
  });

}

