const PubSub = require('../helpers/pub_sub.js');

const CountryInfoView = function (container) {
  this.container = container;
};

CountryInfoView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:selected-country-ready', (evt) => {
    // this.clearCountry();
    this.render(evt.detail);
  });
}

CountryInfoView.prototype.render = function (country) {
  const countryInfoWrapper = document.createElement('div');
  countryInfoWrapper.classList.add('country-info-wrapper');
  const capital = document.createElement('p');
  capital.classList.add('country-info-capital');
  const population = document.createElement('p');
  population.classList.add('country-info-population');
  capital.textContent = country.capital;
  population.textContent = country.population;
  countryInfoWrapper.appendChild(capital);
  countryInfoWrapper.appendChild(population);
  this.container.appendChild(countryInfoWrapper);
};



module.exports = CountryInfoView;
