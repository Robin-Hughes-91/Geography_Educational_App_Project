const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json());

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('countriesdb');
    const collection = db.collection('countries');
    // const scoresdb = client.db('scoresdb');
    const collection_of_scores = db.collection('scores');
    const router = createRouter(collection);
    const scores_router = createRouter(collection_of_scores);

    // const router_for_scores = createRouter(collection_of_scores);
    app.use('/api/geography_api', router);
    app.use('/api/scores', scores_router);
  })
  .catch(console.err);

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
