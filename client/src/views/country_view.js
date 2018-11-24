const PubSub = require('../helpers/pub_sub.js');

const CountryView = function (container) {
  this.container = document.getElementsByClassName('#wrapper');
  this.flagBox = document.getElementsByClassName('#box-c')
}

CountryView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:selected-country-ready', (evt) => {
    this.clearCountry();
    this.render(evt.detail);
  });
}

CountryView.prototype.render = function (countries) {
  const flagImage = document.createElement('img');
  flagImage.src = country.flag;
  this.flagBox.appendChild(flagImage);
};

CountryView.prototype.clearCountry = function () {
  this.container.innerHTML = '';
};

module.exports = CountryView;
