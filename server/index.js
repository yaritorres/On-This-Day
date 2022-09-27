require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const wiki = require('./controllers/wikiSearch.js');

app.use(express.static(path.join(__dirname, '../public/')));
app.use(express.json());
app.use(cors());

app.post('/search', (req, res) => {

  wiki.wikiSearch(req.body.month, req.body.day)
    .then(query => {
      res.send(query.data);
    })
    .catch(err => {
      res.send(undefined);
    })
})

app.listen(process.env.PORT);
console.log('Listening on port', process.env.PORT);