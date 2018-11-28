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
  // const countryInfoWrapper = document.createElement('div');
  // countryInfoWrapper.classList.add('country-info-wrapper');
  // const capital = document.createElement('p');
  // capital.classList.add('country-info-capital');
  // const population = document.createElement('p');
  // population.classList.add('country-info-population');
  // capital.textContent = country.capital;
  // population.textContent = country.population;
  // countryInfoWrapper.appendChild(capital);
  // countryInfoWrapper.appendChild(population);
  // this.container.appendChild(countryInfoWrapper);
  const capitalParagraph = document.createElement('p');
  capitalParagraph.textContent = `The capital city of ${country.name} is ${country.capital}`;
  const capitalContainer = document.querySelector('.d');
  capitalContainer.appendChild(capitalParagraph);
  const populationParagraph = document.createElement('p');
  const populationContainer = document.querySelector('.e');
  populationParagraph.textContent = `The population of ${country.name} is ${country.population}`;
  populationContainer.appendChild(populationParagraph);
  const regionParagraph = document.createElement('p');
  const regionContainer = document.querySelector('.f');
  regionParagraph.textContent = `${country.name} is part of the ${country.region} region`;
  regionContainer.appendChild(regionParagraph);
};



module.exports = CountryInfoView;
