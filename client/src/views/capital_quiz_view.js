const PubSub = require('../helpers/pub_sub.js');

const CapitalQuizView = function (container) {
  this.container = container;
}


CapitalQuizView.prototype.render = function (country) {
  const flag = this.createFlag(country);
  console.log(this.container);
  this.container.appendChild(flag);
};

CapitalQuizView.prototype.createFlag = function (country) {
  const picture = document.createElement('p');
  picture.textContent = `${country.capital}`;
  picture.id = `${country.name}`;
  picture.addEventListener('click', (evt) => {
    console.log(evt);
    PubSub.publish('QuizView:quiz-item-clicked_capital', evt.target);
    console.log(evt);
  });
  return picture;
};
// CapitalQuizView.prototype.createFlag = function (country) {
//   const picture = document.createElement('img');
//   picture.setAttribute('text', `${country.capital}`);
//   picture.setAttribute("name", `${country.name}`);
//   picture.addEventListener('click', (evt) => {
//     PubSub.publish('QuizView:quiz-item-clicked', evt.target.name);
//   });
//   return picture;
// };

module.exports = CapitalQuizView;
