const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Countries = function () {
  this.countries  = [];
};

Countries.prototype.getData = function(){
  const request = new RequestHelper('/api/geography_api');
  request.get()
  .then((countries) => {
    console.log(countries);
    const countryNames = this.handleData(countries);
    PubSub.publish('Countries:country_names_ready', countryNames);
  // console.log(countryNames);

  })
  .catch(console.error);
};

Countries.prototype.getAllData = function(){
  const request = new RequestHelper('/api/geography_api');
  request.get()
  .then((countries) => {
  PubSub.publish('Countries:country_data_ready', countries);
  console.log(countries);
  const pinnedCountries = this.getPinnedCountries(countries);
  PubSub.publish('Countries:pinned-countries-ready', pinnedCountries);
  })
  .catch(console.error);
};

Countries.prototype.getNewQuestion = function(){
  PubSub.subscribe('QuizGridView:refresh_quiz', (evt) => {
    const request = new RequestHelper('/api/geography_api');
    request.get()
    .then((countries) => {
      PubSub.publish('Countries:country_new_question_ready', countries);
      console.log(countries);
    })
    .catch(console.error);
  });};

Countries.prototype.handleData = function (countries) {
  const countryNameIDs = countries.map((country) => {
    return {
      id: country._id,
      name: country.name
    }
  })
  return countryNameIDs;
};

Countries.prototype.getPinnedCountries = function (countries) {
  const pinnedCountries = countries.filter((country) => {
    return country.pinned === true;
  });
  return pinnedCountries;
};

Countries.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:country-name-selected', (evt) => {
    const request = new RequestHelper(`/api/geography_api/${evt.detail}`);
    const country = request.get()
    .then((country) => {
      PubSub.publish('Countries:selected-country-ready', country);
    })
  });

  this.removePinnedCountry();
  this.addNotes();
};

Countries.prototype.addPinnedCountry = function () {
  PubSub.subscribe('CountryView:add-to-pinned-clicked', (evt) => {
    const request = new RequestHelper('/api/geography_api/pinned');
    const pinnedCountryId = evt.detail._id;
    const pinnedCountry = this.preparePinnedCountry(evt.detail, true);
    request.put(pinnedCountryId, pinnedCountry)
      .then((pinnedCountries) => {
        PubSub.publish('Countries:pinned-countries-ready', pinnedCountries);
      });
  });
};

Countries.prototype.removePinnedCountry = function () {
  PubSub.subscribe('PinnedCountryView:remove-button-clicked', (evt) => {
    const request = new RequestHelper('/api/geography_api/pinned');
    const removedCountryId = evt.detail._id;
    const removedCountry = this.preparePinnedCountry(evt.detail, false);
    request.put(removedCountryId, removedCountry)
      .then((pinnedCountries) => {
        PubSub.publish('Countries:pinned-countries-ready', pinnedCountries);
      })
  });
};

Countries.prototype.addNotes = function () {
  PubSub.subscribe('PinnedCountryView:notes-submitted', (evt) => {
    const request = new RequestHelper('/api/geography_api/pinned');
    const countryId = evt.detail._id;
    const country = evt.detail;
    delete country._id;
    request.put(countryId, country);
      // .then((pinnedCountries) => {
      //   PubSub.publish('Countries:pinned-countries-ready', pinnedCountries);
      // })
  })
};

Countries.prototype.preparePinnedCountry = function (country, pinnedBoolean) {
  const pinnedCountry = country;
  delete pinnedCountry._id;
  country.pinned = pinnedBoolean;
  return pinnedCountry;
};

module.exports = Countries;
