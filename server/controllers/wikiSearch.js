const axios = require('axios');

const wikiSearch = (month, day, param) => {

  return axios.get(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/${param}/${month}/${day}`)
  .catch(err => console.log(err))
}

module.exports = {
  wikiSearch: wikiSearch
}