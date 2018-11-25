const PubSub = require('../helpers/pub_sub.js');

const CountryView = function (container) {
  this.container = document.getElementsByClassName('wrapper');
  console.log('container', container);
  this.flagBox = document.getElementsByClassName('box-c');
  console.log('flagBox', flagBox);
}

CountryView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:selected-country-ready', (evt) => {
    this.clearCountry();
    this.render(evt.detail);
  });
}

CountryView.prototype.render = function (country) {
  const flagImage = document.createElement('img');
  flagImage.src = country.flag;
  this.flagBox.appendChild(flagImage);
};

CountryView.prototype.clearCountry = function () {
  this.container.innerHTML = '';
};

module.exports = CountryView;
