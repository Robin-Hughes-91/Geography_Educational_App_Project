const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (selectElement) {
  this.selectElement = selectElement;
}

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:country_names_ready', (evt) => {
    this.populate(evt.detail);
  })
};

SelectView.prototype.populate = function (countryNames) {
  countryNames.forEach((countryName) => {
    const option = document.createElement('option');
    option.classList.add('country-select-option');
    option.value = countryName;
    option.textContent = countryName;
    this.selectElement.appendChild(option);
  });
};

module.exports = SelectView;
