const PubSub = require('../helpers/pub_sub.js');

const PinnedCountryView =  function (container, country) {
  this.container = container;
  this.country = country;
};

PinnedCountryView.prototype.render = function () {
  const countryContainer = this.createDiv('pinned-country-container');
  const countryName = this.createTextElement('p', this.country.name, 'pinned-country-name');
  const showInfo = this.createButton('Show Country Info', 'pinned-country-show-info-button');

  countryContainer.appendChild(countryName);
  countryContainer.appendChild(showInfo);

  this.container.appendChild(countryContainer);
};

PinnedCountryView.prototype.createButton = function (textContent, cssClass) {
  const button = document.createElement('button');
  button.textContent = textContent;
  button.classList.add(cssClass);
  return button;
};

PinnedCountryView.prototype.createTextElement = function (type, textContent, cssClass) {
  const element = document.createElement(type);
  element.textContent = textContent;
  element.classList.add(cssClass);
  return element;
};

PinnedCountryView.prototype.createDiv = function (cssClass) {
  const div = document.createElement('div');
  div.classList.add(cssClass);
  return div;
};

module.exports = PinnedCountryView;
