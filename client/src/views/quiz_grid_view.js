const PubSub = require('../helpers/pub_sub.js');
const QuizView = require('./quiz_view.js');

const QuizGridView = function (container) {
  this.container = container;

};

QuizGridView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:country_data_ready', (evt) => {
    console.log(evt.detail);
    const random = this.shuffle(evt.detail);
    this.render(random);
  });
};

QuizGridView.prototype.render = function (countries) {
  this.container.innerHTML = '';
  const quizView = new QuizView(this.container);
  countries.forEach((country) => quizView.render(country));
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



module.exports = QuizGridView;
