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
    id: "mapbox/satellite-v9",
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

      var colors = [
        // geen
        '#80ff00', 
        // gre_yell
        '#bfff00',
        // yellow
        '#ffff00',
        // orange
        '#ffbf00',
        // or_red
        '#ff8000',
        // red
        '#ff4000'
      ];
      

      var markerOptions = {
        fillOpacity: 0.2,
          weight: 1,
          color: 'black',
          radius: markerSize(info.properties.mag * 9000)
          
      }
      switch(true) {
        case (location.coordinates[2]<10):
          markerOptions.color = colors[0];
          break;
        case (location.coordinates[2]<30):
          markerOptions.color = colors[1];
          break;
        case (location.coordinates[2]<50):
          markerOptions.color = colors[2];
          break;
        case (location.coordinates[2]<70):
          markerOptions.color = colors[3];
          break;
        case (location.coordinates[2]<90):
          markerOptions.color = colors[4];
          break;
        default:
          markerOptions.color = colors[5];
          break;
      }
        L.circle([location.coordinates[1], location.coordinates[0]], markerOptions).addTo(myMap);

      //   var legend = L.control({position: 'bottomright'});
      // legend.onAdd = function (map) {

      //   var div = L.DomUtil.create('div', 'info legend');
      //   labels = ['<strong>Categories</strong>'],
      //   categories = ['-10-10','10-30','30-50','50-70','70-90', '90+'];

      //   for (var i = 0; i < colors.length; i++) {
          
      //           div.innerHTML += 
                
      //             labels.push(
      //                 '<i class="circle" style="background:' + Object.keys(colors[i]) + '"></i> ' +
      //             (categories[i] ? categories[i] : '+'));
          

      //   }
      //       div.innerHTML = labels.join('<br>');
      //   return div;
      // };
      // legend.addTo(map);

      
      
    }

    // var overlays = {
    //   "-10-10": colors.green,
    //   "10-30": colors.gre_yell,
    //   "30-50": colors.yellow,
    //   "50-70": colors.orange,
    //   "70-90": colors.or_red,
    //   "90+": colors.red
    // };
    
    // Create a control for our layers, add our overlay layers to it
    // L.control.layers(null, overlays).addTo(myMap);
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {

      function legendColor(depth) {
        if (depth > 90) {
          return colors[5]
        }
        else if (depth > 70){
          return colors[4]
        }
        else if (depth > 50){
          return colors[3]
        }
        else if (depth > 30){
          return colors[2]
        }
        else if (depth > 10){
          return colors[1]
        }
        else {
          return colors[0]
        }
      }

    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Categories</strong>'],
    categories = [-10, 10, 30, 50, 70, 90];
    var colors = [
      // geen
      '#80ff00', 
      // gre_yell
      '#bfff00',
      // yellow
      '#ffff00',
      // orange
      '#ffbf00',
      // or_red
      '#ff8000',
      // red
      '#ff4000'
    ];

    for (var i = 0; i < categories.length; i++) {
      // class="circle"
            // div.innerHTML += 
            labels.push(
                '<i style="background:' + colors[i] + '"></i> ' +
            (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
    return div;
    };
    legend.addTo(myMap);
    // Create a legend to display information about our map
    // var info = L.control({
    //   position: "bottomright"
    // });
    
    // // When the layer control is added, insert a div with the class of "legend"
    // info.onAdd = function() {
    //   var div = L.DomUtil.create("div", "legend");
    //   return div;
    // };
    // // Add the info legend to the map
    // info.addTo(myMap);
    
    // d3.select(".legend").append("text")
    //   .html("<p>This is a legend</p><br><p>Second Line<p>")
    //   // .append("text")
    //   // .text("more text")
})



// function createFeatures(earthquakeData) {

//   // Define a function we want to run once for each feature in the features array
//   // Give each feature a popup describing the place and time of the earthquake
//   // function onEachFeature(feature, layer) {
//   //   layer.bindPopup("<h3>" + feature.properties.place +
//   //     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
//   // }

//   // Create a GeoJSON layer containing the features array on the earthquakeData object
//   // Run the onEachFeature function once for each piece of data in the array
//   var earthquakes = L.geoJSON(earthquakeData, {
//     // onEachFeature: onEachFeature
//   });

//   // Sending our earthquakes layer to the createMap function
//   createMap(earthquakes);
// }

// function createMap(earthquakes) {

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



  