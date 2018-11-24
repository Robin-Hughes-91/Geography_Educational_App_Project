const PubSub = require('../helpers/pub_sub.js');

const PinnedCountryView =  function (container) {
  this.container = container;
};

PinnedCountryView.prototype.render = function (country) {
  const countryContainer = this.createDiv('pinned-country-container');
  const countryName = this.createTextElement('p', country.name, 'pinned-country-name');
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
