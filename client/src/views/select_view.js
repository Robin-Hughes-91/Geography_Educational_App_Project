const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (selectElement) {
  this.selectElement = selectElement;
}

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:country_names_ready', (evt) => {
    this.populate(evt.detail);
  });

  this.selectElement.addEventListener('change', (evt) => {
    console.log(evt.target.value);
    PubSub.publish('SelectView:country-name-selected', evt.target.value);
  });
};

SelectView.prototype.populate = function (countryObjects) {
  countryObjects.forEach((countryObject) => {
    const option = document.createElement('option');
    option.classList.add('country-select-option');
    option.value = countryObject.id;
    option.textContent = countryObject.name;
    this.selectElement.appendChild(option);
  });
};

module.exports = SelectView;
