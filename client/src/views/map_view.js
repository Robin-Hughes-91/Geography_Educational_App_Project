
const mapboxgl = require('mapbox-gl');
const PubSub = require('../helpers/pub_sub.js');

const MapView = function(target) {
    this.target = target;

};


MapView.prototype.bindEvents = function () {
    this.addMap([0.5, 0.2], 0.4)
  PubSub.subscribe('Countries:selected-country-ready', (evt) => {
    // console.log('event details' ,evt.detail);
    country = evt.detail;

    const center = country.latlng.reverse();
    const area = country.area;
    const name = country.name;
    console.log('nativeName', country.name)
    const zoom = this.zoomRatio(area);
    // console.log('center', center);
    // const zoom = 4;

    this.addMap(center, zoom, name);
    
   

    // this.center = evt.detail.lat
  });
};


MapView.prototype.addMap = function(center, zoom, name) {
console.log('nativeName', name)
this.target.innerHTML = '';
mapboxgl.accessToken = 'pk.eyJ1IjoibXJtZWxpYW5pIiwiYSI6ImNqb3cyZDhiMzFuOGQzd3BoYmFyZ2Nqa2MifQ.wwWlx7P0BnCnxbGvp-RkRA';
const map = new mapboxgl.Map({
    container: this.target,
    center: center,
    zoom: zoom,

    // style: 'mapbox://styles/mapbox/streets-v9'
    // style: 'mapbox://styles/mrmeliani/cjoytjdqu9o9d2sme9xrvxz3t'
    // style: 'mapbox://styles/mrmeliani/cjoytswru62js2snv5bmone4u'
    style: 'mapbox://styles/mrmeliani/cjoytvguy9nu92rozxiph2dzk'

});

// this.markers = [];

const marker = new mapboxgl.Marker({
   draggable: true 
})
  .setLngLat(center)
  .addTo(map);


const popup = new mapboxgl.Popup({closeOnClick: false})
    .setLngLat(center)
    .setHTML('<h1>Mazel מזל טוב!</h1>')
    .addTo(map);
    console.log('nativeName', name)
    const newUtterance = new SpeechSynthesisUtterance(`${name}`);
    console.log('newUtterance', newUtterance.text)
    if(newUtterance.text !== 'undefined'){
    newUtterance.rate = 0.8
    speechSynthesis.speak(newUtterance)
    }
    




function onDragEnd() {

    
    const mapContainer = document.querySelector('#mapid');
    const markerContainer = document.createElement('div');
    console.log('mapContainer', mapContainer)
    let coordinates = document.querySelector('#coordinates-para');

    if (coordinates) {
        coordinates.innerHTML = '';
    } else {
        coordinates = document.createElement('p');
        coordinates.id = 'coordinates-para'
        coordinates.classList.add('marker')
    }

    const lngLat = marker.getLngLat();
    coordinates.style.display = 'block';
    coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
    markerContainer.appendChild(coordinates);
    mapContainer.appendChild(markerContainer);


    // coordinates.style.zIndex = '10'; 
   
    // const newUtterance = new SpeechSynthesisUtterance(`${coordinates.innerHTML}`);
    // newUtterance.rate = 0.8
    // speechSynthesis.speak(newUtterance)


}

marker.on('dragend', onDragEnd);


};



MapView.prototype.zoomRatio = function(area) {
    console.log('area', area)
    
    if (area <= 83871) {zoom = 6;} else {zoom = 1;}
    console.log('zoom', zoom)
    return zoom;

};



module.exports = MapView;
