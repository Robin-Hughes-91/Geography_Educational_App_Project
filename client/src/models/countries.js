const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Countries = function () {
  this.countries  = []
};

Countries.prototype.getData = function(){
  const request = new RequestHelper('/api/geography_api');
  request.get()
  .then((countries) => {
  const countryNames = this.handleData(countries);
  PubSub.publish('Countries:country_names_ready', countryNames);
  console.log(countryNames);

  })
  .catch(console.error);
};

Countries.prototype.handleData = function (countries) {
  const countryNames = countries.map((country) => {
    return country.name;
  })
  return countryNames;
};

Countries.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:country-name-selected', (evt) => {
    const request = new RequestHelper(`/api/geography_api/${evt.detail}`);
    const country = request.get()
    .then((country) => {
      PubSub.publish('Countries:selected-country-ready', country);
    })
  })
};

module.exports = Countries
