const Countries = require('./models/countries.js');
// const CountryView = require('./views/country_view.js');
const SelectView = require('./views/select_view.js');
// const  = require('./views/select_view.js');
// const  = require('./views/country_view.js');
const PinnedCountryListView = require('./views/pinned_country_list_view.js');

document.addEventListener('DOMContentLoaded', () => {
// document.querySelector('');
// const  = new ();
//  .bindEvents();

const selectDropdown = document.querySelector('.country-select');
const selectView = new SelectView(selectDropdown);
selectView.bindEvents();

const pinnedCountriesContainer = document.querySelector('.pinned-countries');
const pinnedCountryListView = new PinnedCountryListView(pinnedCountriesContainer);
pinnedCountryListView.bindEvents();

const countries = new Countries();
countries.getData();
countries.bindEvents();
})
