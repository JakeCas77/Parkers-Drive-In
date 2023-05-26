document.getElementById('startBtn').addEventListener('click', function (event) {

    var selectedGenre = $("#genreSelect").val()
    var selectedStreaming = [];
    // $('input[type="checkbox"]:checked').forEach


    var checkedBoxes =  $('input[type="checkbox"]:checked');
    console.log('checked boxes: ');
    console.log(checkedBoxes);

    for (var i = 0; i < checkedBoxes.length; i++) {
        var value = $(checkedBoxes[i]).val();
        selectedStreaming.push(value);
    }
    console.log(selectedStreaming);
    var streamingParam = selectedStreaming.join('%2C');
    console.log(streamingParam);
    var apiURL =  `https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=${streamingParam}&output_language=en&show_type=movie&genre=${selectedGenre}&show_original_language=en&keyword=zombie`
    
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
    });
});
