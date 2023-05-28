document.getElementById('startBtn').addEventListener('click', function (event) {
    fetchMovieResults();
})

function fetchMovieResults() {
    var selectedGenre = $("#genreSelect").val();
    var selectedStreaming = [];
    var keyword = $("#keywordInput").val();

    var checkedBoxes = $('input[type="checkbox"]:checked');

    for (var i = 0; i < checkedBoxes.length; i++) {
        var value = $(checkedBoxes[i]).val();
        selectedStreaming.push(value);
    }

    var streamingParam = selectedStreaming.join('%2C');
    var apiURL = `https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=${streamingParam}&output_language=en&show_type=movie&genre=${selectedGenre}&show_original_language=en&keyword=${keyword}`;

    const settings = {
        async: true,
        crossDomain: true,
        url: apiURL,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3a0a39d101msh08a21993ce251cep1cd214jsn486a3c0404ce',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        for (let i = 0; i < 8; i++) {

            const resultsContainer = document.getElementById("results");
            const title = response.result[i].title;
            const releaseYear = response.result[i].year;
            const movieImg = response.result[i].backdropURLs.original;

            // Create a movie item element
            const movieItem = document.createElement('div');
            movieItem.classList.add('results-item');

            // Populate the movie item with data
            movieItem.innerHTML = `
                <img src="${movieImg}">
                <h3>${title}</h3>
                <p>${releaseYear}</p>
            `;

            // Append the movie item to the movie container
            resultsContainer.appendChild(movieItem);
        }
    });
}
