const axios = require('axios');

const wikiSearch = (month, day) => {

  return axios.get(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`)
  .catch(err => console.log(err))
}

module.exports = {
  wikiSearch: wikiSearch
}