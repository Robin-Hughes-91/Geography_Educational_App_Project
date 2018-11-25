const Countries = require('./models/countries.js');
const CountryView = require('./views/country_view.js');
const SelectView = require('./views/select_view.js');

document.addEventListener('DOMContentLoaded', () => {
// document.querySelector('');
// const  = new ();
//  .bindEvents();



const countries = new Countries();
countries.getData();
countries.bindEvents();

const selectDropdown = document.querySelector('.country-select');
const selectView = new SelectView(selectDropdown);
selectView.bindEvents();



const countryContainer = document.querySelector('.wrapper');
const flagBox = document.querySelector('.flag');
console.log('app flagbox', flagBox);
const countryView = new CountryView(countryContainer, flagBox);
countryView.bindEvents();


})
