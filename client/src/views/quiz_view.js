const PubSub = require('../helpers/pub_sub.js');

const QuizView = function (container) {
  this.container = container;
}


QuizView.prototype.render = function (country) {
  // console.log(country);

  // const flags = document.querySelector('#flag_item');
  // console.log(this.container);
  // const flagContainer = document.createElement('div');
  // flagContainer.id = 'flag_item';
  const flag = this.createFlag(country);
  console.log(this.container);
  this.container.appendChild(flag);
};




QuizView.prototype.createFlag = function (country) {
  // console.log(country);
  const picture = document.createElement('img');
  picture.setAttribute('src', `${country.flag}`);
  picture.setAttribute("name", `${country.name}`);
  // console.log(picture);
  picture.addEventListener('click', (evt) => {
    // console.log('in picture addEventListener');
    // console.log('clicked evt.target.name', evt.target.name);
    // console.log('here', evt.target.name);
    PubSub.publish('QuizView:quiz-item-clicked', evt.target.name);
  });
  return picture;
};


module.exports = QuizView;
