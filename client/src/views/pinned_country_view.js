const PubSub = require('../helpers/pub_sub.js');

const PinnedCountryView =  function (container, country) {
  this.container = container;
  this.country = country;
};

PinnedCountryView.prototype.render = function () {
  console.log('this.country from pinnedview render', this.country);
  const countryContainer = this.createDiv('pinned-country-container');
  const countryName = this.createTextElement('p', this.country.name, 'pinned-country-name');
  const showInfo = this.createButton('Show Country Info', 'pinned-country-show-info-button');
  const removeButton = this.createRemoveButton();

  countryContainer.appendChild(countryName);
  countryContainer.appendChild(showInfo);
  countryContainer.appendChild(removeButton);

  this.container.appendChild(countryContainer);
};

PinnedCountryView.prototype.createButton = function (textContent, cssClass) {
  const button = document.createElement('button');
  button.textContent = textContent;
  button.classList.add(cssClass);
  return button;
};

PinnedCountryView.prototype.createRemoveButton = function () {
  const removeButton = this.createButton('Remove from pinned countries', 'pinned-country-remove-button');
  removeButton.addEventListener('click', (event) => {
    PubSub.publish('PinnedCountryView:remove-button-clicked', this.country);
    console.log('this.country from createRemoveButton', this.country);
  });
  return removeButton;
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
