
const mapboxgl = require('mapbox-gl');
const PubSub = require('../helpers/pub_sub.js');

const MapView = function(target) {
    this.target = target;	

};


MapView.prototype.bindEvents = function () {
    this.addMap([0, 0], 0.4)
  PubSub.subscribe('Countries:selected-country-ready', (evt) => {
    console.log('event details' ,evt.detail);
    country = evt.detail;

    const center = country.latlng.reverse();
    const area = country.area;
    const zoom = this.zoomRatio(area);
    console.log('center', center);
    // const zoom = 4;
    this.addMap(center, zoom);

    // this.center = evt.detail.lat
  });
};

MapView.prototype.zoomRatio = function(area) {
    console.log('area', area)
    
    if (area <= 83871) {zoom = 6;} else {zoom = 1;}
    console.log('zoom', zoom)
    return zoom;

};
// look at function fly to / center to the map / find in

// MapView.prototype.moveto = function(element, center, zoom) {
// mapboxgl.accessToken = 'pk.eyJ1IjoibXJtZWxpYW5pIiwiYSI6ImNqb3cyZDhiMzFuOGQzd3BoYmFyZ2Nqa2MifQ.wwWlx7P0BnCnxbGvp-RkRA';
// const map = new mapboxgl.Map({
//     container: this.target,
//     // center: this.center
//     // zoom: this.zoom,
//     style: 'mapbox://styles/mapbox/streets-v9'
 
// });
// this.markers = []


// };

// get zoom area ratio // map function
// get a zoom ratio helper function 
// I will do this with conditional login
// if area size is between this and this - zoom should equal this 

MapView.prototype.addMap = function(center, zoom) {
mapboxgl.accessToken = 'pk.eyJ1IjoibXJtZWxpYW5pIiwiYSI6ImNqb3cyZDhiMzFuOGQzd3BoYmFyZ2Nqa2MifQ.wwWlx7P0BnCnxbGvp-RkRA';
const map = new mapboxgl.Map({
    container: this.target,
    center: center,
    zoom: zoom,
    style: 'mapbox://styles/mapbox/streets-v9'
 
});
this.markers = []


};

// var map = new mapboxgl.Map({
//     container: this.target, // container id
//     style: 'mapbox://styles/mapbox/satellite-streets-v9',
//     center: [103.921812, 1.279844], // starting position
//     zoom: 4 // starting zoom
//   });

module.exports = MapView;