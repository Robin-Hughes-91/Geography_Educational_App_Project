const PubSub = require('../helpers/pub_sub.js');

const PinnedCountryAddView =  function (button) {
  this.button = button;
};

PinnedCountryAddView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:selected-country-ready', (evt) => {
    const country = evt.detail;
    this.button.removeEventListener('click', handleClick);
    this.button.addEventListener('click', handleClick);
  });
};

const handleClick = function (evt) {
  PubSub.publish('PinnedCountryAddView:add-to-pinned-clicked', country);
};

module.exports = PinnedCountryAddView;
