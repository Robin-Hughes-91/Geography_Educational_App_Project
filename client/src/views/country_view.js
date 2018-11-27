const PubSub = require('../helpers/pub_sub.js');


const CountryView = function (container) {
  this.container = container;
}


CountryView.prototype.render = function (country) {

  const mapContainer = document.createElement('div');
  mapContainer.id = 'map_item';

  const map = this.createMap(country);
  this.container.appendChild(mapContainer);
};

// CountryView.prototype.createMap = function (country) {
//   console.log(country);
//   const newMap = document.createElement('img');
//   newMap.setAttribute('src', `${country.flag}`);
//   newMap.setAttribute("name", `${country.name}`);
//   console.log(newMap);
//   newMap.addEventListener('click', (evt) => {
//   PubSub.publish('QuizView:quiz-item-clicked', evt.target.name);
//   console.log(evt.target.name);
//   });
//   this.container.appendChild(newMap);
//   return newMap;
// };




module.exports = CountryView;