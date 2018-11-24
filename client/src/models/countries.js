const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Countries = function () {
  this.countries  = []
};

Countries.prototype.getData = function(){
  const request = new RequestHelper('/api/geography_api');
  request.get()
  .then((countries) => {
  const countryNameIDs = this.handleData(countries);
  PubSub.publish('Countries:country_names_ready', countryNameIDs);
  console.log(countryNameIDs);

  })
  .catch(console.error);
};

Countries.prototype.handleData = function (countries) {
  const countryNameIDs = countries.map((country) => {
    return {
      id: country._id,
      name: country.name
    }
  })
  return countryNameIDs;
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

Countries.prototype.addPinnedCountry = function () {
  PubSub.subscribe('CountryView:add-to-pinned-clicked', (evt) => {
    const request = new RequestHelper('/api/geography_api/pinned');
    const countryPayload = evt.detail;
    delete countryPayload._id;
    countryPayload.pinned = true;
    request.put(evt.detail.id, countryPayload)
      .then((pinnedCountries) => {
        PubSub.publish('Countries:pinned-countries-ready', pinnedCountries);
        console.log('pinnedCountries from Countries.addPinnedCountry', pinnedCountries);
      });
  })
};

module.exports = Countries
