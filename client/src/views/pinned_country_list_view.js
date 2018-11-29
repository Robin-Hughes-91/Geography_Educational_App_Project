const PubSub = require('../helpers/pub_sub.js');
const PinnedCountryView = require('./pinned_country_view.js');

const PinnedCountryListView = function (container) {
  this.container = container;
  this.pinnedCountries = [];
};

PinnedCountryListView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:pinned-countries-ready', (event) => {
    this.pinnedCountries = event.detail;
    this.render();
  })
};

//////////////////////
// RENDER FUNCTIONS //
//////////////////////

PinnedCountryListView.prototype.render = function () {
  this.container.innerHTML = '';
  this.container.style.display = "grid";
  this.pinnedCountries.forEach((country) => {
    const countryView = new PinnedCountryView(this.container, country);
    countryView.render();
  });
  // this.renderHowToPopup();
};

PinnedCountryListView.prototype.renderHowToPopup = function () {
  const container = this.createDiv('how-to-container');
  const headerBar = this.createDiv('how-to-header-bar');
  const heading = this.createTextElement('h3', 'Add pinned countries!', 'how-to-heading');
  const closeButton = this.createCloseHowToButton(container);
  const blurbText = 'To pin the current country, save it, and add your own notes, simply click on the big blue-green pin!';
  const blurb = this.createTextElement('p', blurbText, 'how-to-blurb');

  headerBar.appendChild(heading);
  headerBar.appendChild(closeButton);
  container.appendChild(headerBar);
  container.appendChild(blurb);
  this.container.appendChild(container);
};

/////////////////////////////////////////
// CREATE ELEMENT FUNCTIONS (SPECIFIC) //
/////////////////////////////////////////

PinnedCountryListView.prototype.createCloseHowToButton = function (container) {
  const closeButton = this.createButton('X', 'how-to-close-button');
  closeButton.addEventListener('click', () => {
    container.style.display = "none";
  });
  return closeButton;
};

////////////////////////////////////////
// CREATE ELEMENT FUNCTIONS (GENERIC) //
////////////////////////////////////////

PinnedCountryListView.prototype.createTextElement = function (type, textContent, cssClass) {
  const element = document.createElement(type);
  element.textContent = textContent;
  element.classList.add(cssClass);
  return element;
};

PinnedCountryListView.prototype.createDiv = function (cssClass) {
  const div = document.createElement('div');
  div.classList.add(cssClass);
  return div;
};

PinnedCountryListView.prototype.createButton = function (textContent, cssClass) {
  const button = document.createElement('button');
  button.textContent = textContent;
  button.classList.add(cssClass);
  return button;
};

////////////////////
// MODULE EXPORTS //
////////////////////

module.exports = PinnedCountryListView;
