const Countries = require('./models/countries.js');
// const CountryView = require('./views/country_view.js');
const QuizView = require('./views/quiz_view.js');
const QuizGridView = require('./views/quiz_grid_view.js');
const SelectView = require('./views/select_view.js');
// const  = require('./views/select_view.js');
// const  = require('./views/country_view.js');

document.addEventListener('DOMContentLoaded', () => {
// document.querySelector('');
// const  = new ();
//  .bindEvents();



const selectDropdown = document.querySelector('.country-select');
const selectView = new SelectView(selectDropdown);
selectView.bindEvents();

const countries = new Countries();
countries.getData();
countries.getAllData();
countries.bindEvents();

const quizDiv = document.querySelector('.box.j')
const quizView = new QuizGridView(quizDiv);
quizView.bindEvents();


})
