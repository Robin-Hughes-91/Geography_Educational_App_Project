use countriesdb;
db.scores.drop();
db.scores.insertMany([
  {
    flags_top_score: 0
  },
  {
    capitals_top_score: 0
  }
]);
