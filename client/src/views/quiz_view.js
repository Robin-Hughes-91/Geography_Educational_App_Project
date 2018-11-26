const PubSub = require('../helpers/pub_sub.js');

const QuizView = function (container) {
  this.container = container;
}


QuizView.prototype.render = function (country) {
  console.log(country);


  const flagContainer = document.createElement('div');
  flagContainer.id = 'flag_item';
  const flag = this.createFlag(country);
  flagContainer.appendChild(flag);
  this.container.appendChild(flagContainer);
};




QuizView.prototype.createFlag = function (country) {
  console.log(country);
  const picture = document.createElement('img');
  picture.setAttribute('src', `${country.flag}`);
  picture.setAttribute("name", `${country.name}`);
  console.log(picture);
  picture.addEventListener('click', (evt) => {
  PubSub.publish('QuizView:quiz-item-clicked', evt.target.name);
  console.log(evt.target.name);
  });
  return picture;
};


module.exports = QuizView;
