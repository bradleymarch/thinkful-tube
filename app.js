
$(function() {

  var YOUTUBE_API_KEY = "AIzaSyCHDi1IknCEmH1GrkuTFCa5bfufAw0Buic";
  var YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" + YOUTUBE_API_KEY + "&q=";
  //JSON method to use
  function getYouTubeResults(searchQuery, callback) {
    var queryUrl = YOUTUBE_API_URL + searchQuery;
    
    $.getJSON(queryUrl, function(data) {
      items = data.items //array of results

      if (callback) {
        callback(items);
      }
    });
  }

  //now we are getting the images for thumbnails
  function getYouTubeThumbnails(searchQuery, callback) {
    getYouTubeResults(searchQuery, function(results) {
      var thumbnails = results.map(function(result) {
        return result.snippet.thumbnails.medium.url;
      });
      
      if (callback) {
        callback(thumbnails);
      }
    });
  }
  
  //this is the rendering of the thumbnails we have retrieved
  function renderThumbnail(imageUrl) {
    return '<div class="thumbnail"><img class="thumbnail-image" src="' + imageUrl + '" /></div>';
  }

  //submit handler right here..
  $(".js-search-form").on("submit", function(event) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var $searchInput = $form.find(".js-search-input");
    var valueOfSearchInput = $searchInput.val();
    
    getYouTubeThumbnails(valueOfSearchInput, function(thumbnails) {
      var renderedThumbnails = thumbnails.map(renderThumbnail);
      var thumbnailsMarkup = renderedThumbnails.join('');

      $('.thumbnails-grid').html(thumbnailsMarkup);
    });
  });
});

