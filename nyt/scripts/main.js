apiKey = 'p7qxACKrkRzaWoswy2mvAGBGQ0faP7oW';

let weatherRequest = new XMLHttpRequest();
let urlAPI = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=p7qxACKrkRzaWoswy2mvAGBGQ0faP7oW';

window.onload = function() {
	getTopStories();
};

function getTopStories() {
	let urlApi = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=' + apiKey;
	fetch(urlAPI)
		.then(function(resp) {
			return resp.json();
		}) // Convert data to json
		.then(function(data) {
			//console.log(data);
			appendData(data);
		})
		.catch(function() {
			// catch any errors
		});
}

function appendData(data) {
	console.log('append');
	console.log(data);
	console.log(data.results.length);
	let parent = document.getElementById('topStories');
	for (var i = 0; i < data.results.length; i++) {
		var article = document.createElement('article');
		article.className = 'story';
		article.innerHTML =
			'<h2>' +
			data.results[i].title +
			'</h2><img src="' +
			data.results[i].media[0]['media-metadata'][2]['url'] +
			'"><ul><li>' +
			data.results[i].abstract +
			'</li></ul>';
		document.getElementById('topStories').appendChild(article);
	}
}
