const Countries = require('./models/countries.js');
const QuizView = require('./views/quiz_view.js');
const QuizGridView = require('./views/quiz_grid_view.js');
const CapitalQuizView = require('./views/capital_quiz_view.js');
const CapitalQuizGridView = require('./views/capital_quiz_grid_view.js');
const CountryFlagView = require('./views/country_flag_view.js');
const SelectView = require('./views/select_view.js');
const CountryInfoView = require('./views/country_info_view.js');
const MapView = require('./views/map_view.js');
const PinnedCountryListView = require('./views/pinned_country_list_view.js');
const PinnedCountryAddView = require('./views/pinned_country_add_view.js');

document.addEventListener('DOMContentLoaded', () => {
// document.querySelector('');
// const  = new ();
//  .bindEvents();



const selectDropdown = document.querySelector('.country-select');
const selectView = new SelectView(selectDropdown);
selectView.bindEvents();

const mapDiv = document.querySelector('#mapid')
const mapView = new MapView(mapDiv);
mapView.bindEvents();

const pinnedCountriesContainer = document.querySelector('.pinned-countries-list');
const pinnedCountryListView = new PinnedCountryListView(pinnedCountriesContainer);
pinnedCountryListView.bindEvents();

const countries = new Countries();
countries.getData();
countries.getAllData();
countries.getNewQuestion();
countries.getNewQuestionCapital()
countries.getAllDataForCapitalsQuiz()
countries.bindEvents();

// countries.getFlagScore()
// countries.updateScore();


const flagQuiz = document.querySelector('')
const flagQuizView = new QuizGridView(flagQuiz);
flagQuizView.bindEvents();


const capitalQuiz = document.querySelector('')
const capitalQuizView = new CapitalQuizGridView(capitalQuiz);
capitalQuizView.bindEvents();

const pinnedCountryAddButton = document.querySelector('.pinned-country-add-button');
const pinnedCountryAddView = new PinnedCountryAddView(pinnedCountryAddButton);
pinnedCountryAddView.bindEvents();


// const pinnedCountryAddButton = document.querySelector('.pinned-country-add-button');
// console.log('pinned-country-add-button from app', pinnedCountryAddButton);
// const pinnedCountryAddView = new PinnedCountryAddView(pinnedCountryAddButton);
// pinnedCountryAddView.bindEvents();
//
// const quizDiv = document.querySelector('.j')
// const quizView = new QuizGridView(quizDiv);
// quizView.bindEvents();

const countryContainer = document.querySelector('.wrapper');
const flagBox = document.querySelector('.flag');
// console.log('app flagbox', flagBox);
const countryFlagView = new CountryFlagView(countryContainer, flagBox);
countryFlagView.bindEvents();

const countryInfoContainer = document.querySelector('.g');
const countryInfoView = new CountryInfoView (countryInfoContainer);
countryInfoView.bindEvents();
})
