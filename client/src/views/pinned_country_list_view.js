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

PinnedCountryListView.prototype.render = function () {
  this.container.innerHTML = '';
  this.container.style.display = "grid";
  this.pinnedCountries.forEach((country) => {
    const countryView = new PinnedCountryView(this.container, country);
    countryView.render();
  });
};

module.exports = PinnedCountryListView;
