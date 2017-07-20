// API Endpoint

var youtube_search_url = 'https://www.googleapis.com/youtube/v3/search';

// Template

var resultTemplate = '<div><h4><a class="js-results-title" href="" target="_blank"></a></h4><img class="js-image" src=""></div>'


// API

function getDataFromYT(searchValue, callback) {
  var settings = {
    url: youtube_search_url,
    data: {
      part: 'snippet',
      key: 'AIzaSyBsawBLDjNZaRy_ZjYG9CCFIrGlohFTF2w',
      q: searchValue,
      type: 'video',
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}

// DOM

function renderResult(result) {
	var template = $(resultTemplate);
	template.find('.js-results-title').text(result.snippet.title).attr('href', 'https://www.youtube.com/watch?v=' + result.id.videoId);
	template.find('.js-image').attr('src', result.snippet.thumbnails.medium.url);
	return template;
}

function displayData(data) {
	var results = data.items.map(function(item, index) {
		return renderResult(item);
	});
	$('.js-search-results').html(results);
}

// Event Listener

$('#search-button').on('click', function(event){
	var searchInput = $('.search-input').val();
	getDataFromYT(searchInput, displayData);
});
