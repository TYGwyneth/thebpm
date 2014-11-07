$(document).ready(function() {

	// For using ENTER-key

	$("#searchArtist").keyup(function(event){
	    if(event.keyCode == 13){
	        $("#search").click();
	    }
	});

	$("#searchTrack").keyup(function(event){
	    if(event.keyCode == 13){
	        $("#search").click();
	    }
	});

	// Search function & API-call
	
	$("#search").click(function() {
		var artist = $("#searchArtist");
		var title = $("#searchTrack");

		var songSearch = "http://developer.echonest.com/api/v4/song/search?api_key=NWIUHQLOCVMPECBJA&format=json&results=1&artist="+artist.val()+"&title="+title.val()+"&bucket=audio_summary&bucket=artist_location";
		$.getJSON( songSearch, function(json) {
			
			if (json.response.songs[0] != null) {
				console.log(json);
				var bpm = json.response.songs[0].audio_summary.tempo;
				var artist =  json.response.songs[0].artist_name;
				var title = json.response.songs[0].title;
				
				$("#bpm").html("");
				$("#bpm").append("<p>"+artist+" - "+title+"</p>")
				$("#bpm").append("<h1>"+bpm+"</h1>");

				var longLat = [json.response.songs[0].artist_location.latitude, json.response.songs[0].artist_location.longitude];
				initialize(longLat);
			} else {
				$("#bpm").html("");
				$("#bpm").append("<h1>"+"No Result"+"</h1>");
			};
		});
	});



	// Map Thingy

	function initialize(longLat) {

		var position = longLat;

		var styles = [
			{
			    stylers: [
			      { hue: "#0AC2FF" },
			      { saturation: -0 }
			    ]
			},	
			{
				featureType: "all",
				elementType: "labels",
				stylers: [
			    	{ visibility: "off" }
			    ]
			}
		];

		// Create a new StyledMapType object, passing it the array of styles,
		// as well as the name to be displayed on the map type control.
		var styledMap = new google.maps.StyledMapType(styles,
			{name: "Styled Map"});

        var mapOptions = {
          center: { lat: position[0], lng: position[1] }, // { lat: -34.397, lng: 150.644},
          zoom: 8,
          disableDefaultUI: true,
          // mapTypeId: google.maps.MapTypeId.SATELLITE
          mapTypeControlOptions: {
      	  	mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    	  }
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        map.mapTypes.set('map_style', styledMap);
  		map.setMapTypeId('map_style');
        map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});
      }
    
    var longLat = [-34.397,150.644];
    google.maps.event.addDomListener(window, 'load', initialize(longLat));


});