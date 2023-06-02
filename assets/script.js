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
      const resultsContainer = document.getElementById("results");
      const title = response.result[i].title;
      const releaseYear = response.result[i].year;
      const movieImg = response.result[i].backdropURLs.original;

      // Create a movie item element
      const movieItem = document.createElement("div");
      movieItem.classList.add("results-item");

      // Populate the movie item with data
      movieItem.innerHTML = `
            <img class="movieImgThumbNail" src="${movieImg}">
            <h2>${title} - ${releaseYear}</h2>
          
            `;
      // movieItem.onabort("click", function(event) {
      //     event.preventDefault(i)

      // })
      movieItem.addEventListener("click", function () {
        movieItem.innerHTML = `
    <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
    <p class="image is-4by3">
    <img src="${movieImg}" alt="">
    </p>
    <h1>${title} - ${releaseYear}</h1>
    </div>
   <button class="modal-close is-large" aria-label="close">Close</button>
   </div>
                `;
      });

      // Append the movie item to the movie container
      resultsContainer.appendChild(movieItem);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) {
      // Escape key
      closeAllModals();
    }
  });
});
