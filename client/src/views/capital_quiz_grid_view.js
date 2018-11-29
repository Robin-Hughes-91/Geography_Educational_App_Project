const PubSub = require('../helpers/pub_sub.js');
const CapitalQuizView = require('./capital_quiz_view.js');

const CapitalQuizGridView = function (container) {
  this.container = container;
  this.scoreTotal = 0;
};


CapitalQuizGridView.prototype.bindEvents = function () {

  PubSub.subscribe('Countries:country_data_ready_capitals', (evt) => {
    const random = this.shuffle(evt.detail);
    const capitals = this.renderCapitals(random);
    const randomCountryForQuestion = this.randomCountry(random);
    const createquestion = this.createQuestion(random);
    const question = this.renderQuestion(random);
    this.compareQuestionAnswer()
  });

  PubSub.subscribe('Countries:country_new_question_ready_capitals', (evt) => {
    const random = this.shuffle(evt.detail);
    const capitals = this.renderCapitals(random);
    const randomCountryForQuestion = this.randomCountry(random);
    const createquestion = this.createQuestion(random);
    const question = this.renderQuestion(random);
  });

  PubSub.subscribe('CapitalQuizGridView:update_current_score_capital', (evt) => {
    const createquestion = this.createScore(evt.detail);
    const question = this.renderScore(evt.detail);
  });
};


CapitalQuizGridView.prototype.shuffle = function (array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    const count = array[counter];
    array[counter] = array[index];
    array[index] = count;
  }
  let selected = array.slice(0,4) ;
  return selected;
}

CapitalQuizGridView.prototype.renderCapitals = function (countries) {

  const capitalContainer = document.createElement('div');
  capitalContainer.id = 'capital_item';
  this.container.innerHTML = '';
  const quizView = new CapitalQuizView(capitalContainer);
  countries.forEach((country) => quizView.render(country));
  this.container.appendChild(capitalContainer);
};

CapitalQuizGridView.prototype.createQuestion = function (countries) {
  const country = this.randomCountry(countries)
  this.country = country;
  // console.log('country', this.country);
  PubSub.publish('QuizGridView:random_country_from_quiz', this.country);
  const question = document.createElement('p');
  question.textContent = `Which is the Capital City of ${country.name}?`;
  return question;
};

CapitalQuizGridView.prototype.randomCountry = function (countries) {
  const random = countries[Math.floor(Math.random() * countries.length)]
  // console.log(random);
  return random;
};

CapitalQuizGridView.prototype.renderQuestion = function (countries) {
  const questionContainer = document.createElement('div');
  questionContainer.id = 'question_item';

  const question = this.createQuestion(countries);
  questionContainer.appendChild(question);
  this.container.appendChild(questionContainer);
  const answerContainer = document.createElement('div');
  this.container.appendChild(answerContainer);
  answerContainer.id = 'answer_item_capital';
};

CapitalQuizGridView.prototype.renderScore = function (scores) {
  const scoreDisplay = document.querySelector('.m')
  const scoreContainer = document.createElement('div');
  scoreContainer.id = 'score_item_capital';

  const score = this.createScore(scores);
  scoreContainer.appendChild(score);
  scoreDisplay.innerHTML = ""
  scoreDisplay.appendChild(scoreContainer);
};

CapitalQuizGridView.prototype.createScore = function (scores) {
  // console.log('country', this.country);
  const score = document.createElement('p');
  console.log(scores);
  score.textContent = `Score ${scores}`;
  return score;
};

CapitalQuizGridView.prototype.compareQuestionAnswer = function(){
  PubSub.subscribe('QuizView:quiz-item-clicked_capital', (evt) => {

    let score = null
    let result = ""

    if (evt.detail.id === this.country.name) {
      result = "Well done!,";
      this.scoreTotal++

      PubSub.publish('CapitalQuizGridView:update_current_score_capital', this.scoreTotal);
      setTimeout(() => { PubSub.publish('CapitalQuizGridView:refresh_quiz_capital')
    }, 2000);

  } else {
    result = "Whoops,";
  }

  const isAnswerCorrect = document.createElement('p');
  isAnswerCorrect.textContent = `${result} that is the Capital of ${evt.detail.id}!`
  const answer = document.querySelector('#answer_item_capital')
  answer.innerHTML = ""
  answer.appendChild(isAnswerCorrect);
})
};

module.exports = CapitalQuizGridView;
