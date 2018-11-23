use countriesdb;
db.dropDatabase();

db.countries.insertMany([
  {
    species: "Yellow Wagtail",
    location: "Sutherland",
    date: "2017-06-01"
  },
  {
    species: "Red Kite",
    location: "Knockshinnoch",
    date: "2017-01-22"
  },
  {
    species: "Little Egret",
    location: "Seamill",
    date: "2018-08-15"
  }
]);
