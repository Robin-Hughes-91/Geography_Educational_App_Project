const PubSub = require('../helpers/pub_sub.js');
const QuizView = require('./quiz_view.js');

const QuizGridView = function (container) {
  this.container = container;

};

QuizGridView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:country_data_ready', (evt) => {
    const random = this.shuffle(evt.detail);
    const flags = this.renderFlags(random);
    const randomCountryForQuestion = this.randomCountry(random);
    const createquestion = this.createQuestion(random);
    const question = this.renderQuestion(random);
    const answer = this.checkAnswer(random)
    // const compareAnswer = this.compare()
  });
};


QuizGridView.prototype.shuffle = function (array) {
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

QuizGridView.prototype.renderFlags = function (countries) {
  this.container.innerHTML = '';
  const quizView = new QuizView(this.container);
  countries.forEach((country) => quizView.render(country));
};

QuizGridView.prototype.randomCountry = function (countries) {
  console.log(countries);
  const random = countries[Math.floor(Math.random() * countries.length)]
  console.log(random);
  PubSub.publish('QuizGridView: random_country_from_quiz', random)
  return random;
};

QuizGridView.prototype.createQuestion = function (countries) {
  const country = this.randomCountry(countries)
  const question = document.createElement('p');
  question.textContent = `Which Flag belongs to ${country.name}`;
  return question;
};

QuizGridView.prototype.renderQuestion = function (countries) {
  const questionContainer = document.createElement('div');
  questionContainer.id = 'question_item';
  const question = this.createQuestion(countries);
  questionContainer.appendChild(question);
  this.container.appendChild(questionContainer);
};

QuizGridView.prototype.checkAnswer = function (random) {
  PubSub.subscribe('QuizView:quiz-item-clicked', (evt) => {
    const answer = event.detail;
    const check = compare(answer);
    const isAnswerCorrect = document.createElement('p');
    isAnswerCorrect.textContent = ` ${check}, that is ${answer}`
    const answerContainer = document.createElement('div');
    answerContainer.id = 'answer_item';
    answerContainer.appendChild(isAnswerCorrect);
    this.container.appendChild(answerContainer);
  });
};

QuizGridView.prototype.comapre = function(answer){
  PubSub.subscribe('QuizGridView: random_country_from_quiz', evt) =>{
    if evt.detail === answer {return "true";}else{return "false";}
  }
};



module.exports = QuizGridView;
