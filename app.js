var directionsDisplay, directionsService;
var map;
var Delhi = {
    lat: 28.7041,
    lng: 77.1025
}
var submitBtn = $(".btn");

function initialize() {

    var mapOptions = {
        center: Delhi,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);

    var from = document.getElementById("from");
    var to = document.getElementById("to");
    var options = {
        types: ['(cities)']
    }
    var autocomplete1 = new google.maps.places.Autocomplete(from, options);
    var autocomplete2 = new google.maps.places.Autocomplete(to, options);
}


submitBtn.on('click', function () {
    calcRoute();
    createPhotoMarker();
})


function calcRoute() {
    var selectedMode = document.getElementById('mode').value;
    var request = {
        origin: document.getElementById('from').value,
        destination: document.getElementById('to').value,
        travelMode:google.maps.TravelMode[selectedMode],
        transitOptions: {
          departureTime: new Date(),
             modes: ['TRAIN','BUS'],
         routingPreference: 'FEWER_TRANSFERS'
  },
        unitSystem: google.maps.UnitSystem.METRIC
    }
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            $(".info").html("<div class='alert alert-success'><strong>From:</strong>  " + document.getElementById('from').value + ".<br/><strong>To:</strong>  " + document.getElementById('to').value + ".<br/><strong>Driving distance:</strong>  " + result.routes[0].legs[0].distance.text + ".<br/><strong>Duration:</strong>  " + result.routes[0].legs[0].duration.text + "</div>");

            directionsDisplay.setDirections(result);
        } else {
            directionsDisplay.setDirections({
                routes: []
            });
            map.setCenter(Delhi);
            $(".info").html("<div class='alert alert-warning'><strong>Could not retrieve driving distance.</strong></div>");
        }

    });

}
function createPhotoMarker() {
var place=document.getElementById('to').value;
var photos =  place.photos;
if (!photos) {
    $(".photo").html("<div class='alert alert-warning'><strong>Could not retrieve driving Photos.</strong></div>");

}


var marker = new google.maps.Marker({
map: map,
position: place.geometry.location,
title: place.name,
icon: photos[0].getUrl({maxWidth: 35, maxHeight: 35})
});
console.log("imh");
console.log(photos[0].getUrl());
$(".photo").html("<div class='alert alert-warning'><img src="+photos[0].getUrl({maxWidth: 35, maxHeight: 35})+"alt="+images+"></div>");
}
