var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 13
  });
  

//   // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  function markerSize(mag) {
    return mag
  }

var earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(earthquake_url).then(function(data){
  console.log(data)
    // createFeatures(data.features)
    for (var i = 0; i < data.features.length; i++) {
      var info = data.features[i]
      var location = info.geometry
      // var mag = info.properties.mag
      // console.log(location.coordinates[0])
      
        // console.log([location.coordinates[0], location.coordinates[1]])
        L.circle([location.coordinates[1], location.coordinates[0]], {
          fillOpacity: 0.7,
          weight: 0.5,
          radius: markerSize(info.properties.mag * 9000)
        }).addTo(myMap);
      
      

      // console.log(info.properties.mag)
      // console.log(location.coordinates[0])

    //   L.circle(data.features.properties[i].location, {
    //     fillOpacity: 0.75,
    //     color: "white",
    //     fillColor: "purple",
    //     // Setting our circle's radius equal to the output of our markerSize function
    //     // This will make our marker's size proportionate to its population
    //     radius: markerSize(cities[i].population)
    //   }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
    
    // console.log(data.features[0].geometry.coordinates[0])
    // console.log(data)
    }
})


function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  // function onEachFeature(feature, layer) {
  //   layer.bindPopup("<h3>" + feature.properties.place +
  //     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  // }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    // onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}




function createMap(earthquakes) {

  // var myMap = L.map("map", {
  //   center: [
  //     37.09, -95.71
  //   ],
  //   zoom: 5,
  //   layers: [streetmap, earthquakes]
  // });

  // Define streetmap and darkmap layers


  // var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  //   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  //   tileSize: 512,
  //   maxZoom: 18,
  //   zoomOffset: -1,
  //   id: "mapbox/streets-v11",
  //   accessToken: API_KEY
  // });

  // var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //   maxZoom: 18,
  //   id: "dark-v10",
  //   accessToken: API_KEY
  // });

  // Define a baseMaps object to hold our base layers
  // var baseMaps = {
  //   "Street Map": streetmap,
  //   "Dark Map": darkmap
  // };

  // Create overlay object to hold our overlay layer
  // var overlayMaps = {
  //   Earthquakes: earthquakes
  // };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  // var myMap = L.map("map", {
  //   center: [
  //     37.09, -95.71
  //   ],
  //   zoom: 5,
  //   layers: [streetmap, earthquakes]
  // });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  // L.control.layers(baseMaps, overlayMaps, {
  //   collapsed: false
  // }).addTo(myMap);
}


  