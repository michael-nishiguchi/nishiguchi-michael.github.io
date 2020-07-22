apiKey = 'p7qxACKrkRzaWoswy2mvAGBGQ0faP7oW';

let weatherRequest = new XMLHttpRequest();
let urlAPI = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=p7qxACKrkRzaWoswy2mvAGBGQ0faP7oW';

let searchURL =
	'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=murder&api-key=p7qxACKrkRzaWoswy2mvAGBGQ0faP7oW';

window.onload = function() {
	//getTopStories();
};

function getTopStories() {
	let urlApi = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=' + apiKey;

	fetch(urlApi)
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
	let parent = document.getElementById('topStories');
	for (var i = 0; i < data.results.length; i++) {
		var article = document.createElement('article');
		article.className = 'story';
		article.innerHTML =
			'<img src="' +
			data.results[i].media[0]['media-metadata'][2]['url'] +
			'"><h2>' +
			data.results[i].title +
			'</h2><ul><li>' +
			data.results[i].abstract +
			'</li></ul>';
		document.getElementById('topStories').appendChild(article);
	}
}

function customFilter() {
	var wordList = [];

	for (var i = 1; i < 6; i++) {
		var id = 'filter' + i;

		var filterValue = document.getElementById(id).value;
		if (filterValue != '') {
			wordList.push(filterValue);
			var capitalized = filterValue.charAt(0).toUpperCase() + filterValue.slice(1);
			wordList.push(capitalized);
		}
	}

	let urlApi = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=' + apiKey;

	let testUrl = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=';

	fetch(urlApi)
		.then(function(resp) {
			return resp.json();
		}) // Convert data to json
		.then(function(data) {
			for (var i = 0; i < data.results.length; i++) {
				for (var j = 0; j < wordList.length; j++) {
					//search titles
					if (
						data.results[i]['adx_keywords'].includes(wordList[j]) ||
						data.results[i].abstract.includes(wordList[j])
					) {
						console.log('This is the article: ' + data.results[i].title);
					}
					//console.log(wordList[j] + ' comparing with ' + data.results[i]['adx_keywords']);
				}
			}
		})
		.catch(function() {
			// catch any errors
		});
}

function customSearch() {
	// test url https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=p7qxACKrkRzaWoswy2mvAGBGQ0faP7oW

	let search1 = document.getElementById('search1').value;
	if (search1 != '') {
		let url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + search1 + '&api-key=' + apiKey;
		fetch(url)
			.then(function(resp) {
				return resp.json();
			}) // Convert data to json
			.then(function(data) {
				//console.log(data);
				console.log('search success');
				console.log('clearing page');
				clearStories();

				appendSearch(data);
			})
			.catch(function() {
				// catch any errors
			});
	}
	else {
		var note = document.getElementById('note');
		var content = 'No search word was added';
		note.appendChild(content);
	}
}

function clearStories() {
	var stories = document.getElementById('topStories');
	stories.innerHTML = '';
}

function appendSearch(data) {
	let parent = document.getElementById('topStories');
	console.log('array length: ' + data.response.docs.length);

	if (data.response.docs.length == 0) {
		/*
		var article = document.createElement('article');
		article.className = 'story';
		var h2 = document.createElement('h2');
		h2.innerHTML = 'Sorry, there are no articles from your search';
		article.appendChild(h2);
		*/
		var article = document.createElement('article');
		article.className = 'story';
		var h2 = document.createElement('h2');
		h2.innerHTML("Sorry, there aren't articles from your search");

		article.appendChild(h2);
		document.getElementById('topStories').appendChild(article);
		console.log('nothing');
	}

	for (var i = 0; i < data.response.docs.length; i++) {
		console.log(data.response.docs[i].headline.main);

		var article = document.createElement('article');
		article.className = 'story';
		var img = document.createElement('img');
		var h2 = document.createElement('a');
		var ul = document.createElement('ul');

		img.src = 'http://www.nytimes.com/' + data.response.docs[i]['multimedia'][0].url;
		h2.href = data.response.docs[i]['web_url'];
		h2.innerHTML = '<h2>' + data.response.docs[i].headline.main + '</h2>';
		//h2.innerHTML ='<a href="' + data.response.docs[i]['web_url'] + '">' + data.response.docs[i].headline.main + '>';
		ul.innerHTML = '<li>' + data.response.docs[i].snippet + '</li>';

		article.appendChild(img);
		article.appendChild(h2);
		article.appendChild(ul);

		document.getElementById('topStories').appendChild(article);
	}
}
