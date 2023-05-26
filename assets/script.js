const settings = {
	async: true,
	crossDomain: true,
	url: 'https://ott-details.p.rapidapi.com/advancedsearch?start_year=1970&end_year=2020&min_imdb=6&max_imdb=7.8&genre=action&language=english&type=movie&sort=latest&page=1',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6f2a08350amsh0dfe802e51b9fecp1c6cc9jsn3b3c7ca4f841',
		'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
	}
};

function getApi() {

    var requestURL = 'https://ott-details.p.rapidapi.com/advancedsearch?start_year=1970&end_year=2020&min_imdb=6&max_imdb=7.8&genre=action&language=english&type=movie&sort=latest&page=1'

    fetch(requestURL)
    .then(function(response) {
        return response.json();
    })
}

$.ajax(settings).done(function (response) {
	console.log(response);
});

const movies = {
	async: true,
	crossDomain: true,
	url: 'https://streaming-availability.p.rapidapi.com/v2/services',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6f2a08350amsh0dfe802e51b9fecp1c6cc9jsn3b3c7ca4f841',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

$.ajax(movies).done(function (response) {
	console.log(response);
});