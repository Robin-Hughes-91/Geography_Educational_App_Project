const PubSub = require('../helpers/pub_sub.js');

const CountryInfoView = function (container) {
  this.container = container;
};

CountryInfoView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:selected-country-ready', (evt) => {
    this.render(evt.detail);
  });
}

CountryInfoView.prototype.render = function (country) {
  const capitalParagraph = document.createElement('p');
  capitalParagraph.textContent = `Capital City: ${country.capital}`;
  const capitalContainer = document.querySelector('.d');
  capitalContainer.innerHTML = "";
  capitalContainer.appendChild(capitalParagraph);
  const populationParagraph = document.createElement('p');
  const populationContainer = document.querySelector('.e');
  populationContainer.innerHTML = "";
  populationParagraph.textContent = `Population: ${country.population}`;
  populationContainer.appendChild(populationParagraph);
  const regionParagraph = document.createElement('p');
  const regionContainer = document.querySelector('.f');
  regionContainer.innerHTML = "";
  regionParagraph.textContent = `Region: ${country.region}`;
  regionContainer.appendChild(regionParagraph);
};



module.exports = CountryInfoView;
