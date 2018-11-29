const PubSub = require('../helpers/pub_sub.js');

const QuizView = function (container) {
  this.container = container;
}


QuizView.prototype.render = function (country) {
  const flag = this.createFlag(country);
  console.log(this.container);
  this.container.appendChild(flag);
};




QuizView.prototype.createFlag = function (country) {
  const picture = document.createElement('img');
  picture.setAttribute('src', `${country.flag}`);
  picture.setAttribute("name", `${country.name}`);
  picture.addEventListener('click', (evt) => {
    PubSub.publish('QuizView:quiz-item-clicked', evt.target.name);
    // picture.removeEventListener('click', evt);

  });
  return picture;

};




module.exports = QuizView;
