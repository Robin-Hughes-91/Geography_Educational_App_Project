const assert = require('assert');
const Countries = require('../models/countries.js');

describe('Countries', function() {

  let countries;

  beforeEach(function () {
    countries = new Countries();
    countryAfg = {
    	"_id": "1",
    	"name": "Afghanistan",
    	"alpha3Code": "AFG",
    	"capital": "Kabul"
    };
    countryBra = {
    	"_id": "2",
    	"name": "Brazil",
    	"alpha3Code": "BRA",
    	"capital": "Brasília"
    };
  })

  it('should start with an empty array of countries', function() {
    const actual = countries.countries;
    assert.deepStrictEqual(actual, []);
  });

  it('should be able to return an array of country names and ids', function() {
    const countryNameIDs = countries.handleData([countryAfg, countryBra]);
    assert.deepStrictEqual(countryNameIDs, [{
    	"id": "1",
    	"name": "Afghanistan"
    },
    {
    	"id": "2",
    	"name": "Brazil"
    }]);
  });

  it('should be able to add pinned property of true to a country and remove id', function() {
    const pinnedCountry = countries.preparePinnedCountry(countryAfg, true);
    assert.deepStrictEqual(pinnedCountry, {
    	"name": "Afghanistan",
    	"alpha3Code": "AFG",
    	"capital": "Kabul",
      "pinned": true
    });
  });

  it('should be able to add pinned property of false to a country and remove id', function() {
    const pinnedCountry = countries.preparePinnedCountry(countryAfg, false);
    assert.deepStrictEqual(pinnedCountry, {
    	"name": "Afghanistan",
    	"alpha3Code": "AFG",
    	"capital": "Kabul",
      "pinned": false
    });
  });

  it('should be able to return pinned countries only', function() {
    const afgPinned = countries.preparePinnedCountry(countryAfg, true);
    const pinnedCountries = countries.getPinnedCountries([afgPinned, countryBra]);
    assert.deepStrictEqual(pinnedCountries, [afgPinned]);
  });

});
