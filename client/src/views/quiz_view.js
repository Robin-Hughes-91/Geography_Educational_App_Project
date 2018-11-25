const PubSub = require('../helpers/pub_sub.js');

const QuizView = function (container) {
  this.container = container;
}


QuizView.prototype.render = function (country) {

  const quizContainer = document.createElement('div');
  quizContainer.id = 'quiz_item';

  const flag = this.createFlag(country);
  this.container.appendChild(quizContainer);
};

QuizView.prototype.createFlag = function (country) {
  console.log(country);
  const picture = document.createElement('img');
  picture.setAttribute('src', `${country.flag}`);
  picture.setAttribute("height", "50");
  picture.setAttribute("width", "100");
  picture.setAttribute("name", `${country.name}`);
  console.log(picture);
  picture.addEventListener('click', (evt) => {
  PubSub.publish('QuizView:quiz-item-clicked', evt.target.name);
  console.log(evt.target.name);
  });
  this.container.appendChild(picture);
  return picture;
};





module.exports = QuizView;
