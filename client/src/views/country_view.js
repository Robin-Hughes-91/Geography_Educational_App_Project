const PubSub = require('../helpers/pub_sub.js');

const CountryView = function (container, flagbox) {
  this.container = container;
  console.log('container', container);
  this.flagBox = flagbox;
}

CountryView.prototype.bindEvents = function () {
  this.flagBox.src = "https://www.telegraph.co.uk/content/dam/Travel/2017/February/flags-quiz-AP.jpg?imwidth=450";
  PubSub.subscribe('Countries:selected-country-ready', (evt) => {
    // this.clearCountry();
    this.render(evt.detail);
    console.log(this.flagBox);
  });
}

CountryView.prototype.render = function (country) {
  console.log(country.flag);
  this.flagBox.src = country.flag;
};

CountryView.prototype.clearCountry = function () {
  this.container.innerHTML = '';
};

module.exports = CountryView;
