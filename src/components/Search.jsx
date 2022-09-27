import React, { useState, useEffect } from 'react';
const axios = require('axios');
import List from '../components/List.jsx'

const Search = (props) => {
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [param, setParam] = useState('births');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/search', {month, day})
      .then(response => {
        if (!response.data) {
          alert('Please enter a valid date')
          return;
        }
        setData(response.data[param]);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div>
      <form onSubmit={(e) => { handleSubmit(e) }}>
        <label>Month</label>
        <input
          type="number"
          value={month}
          onChange={(e) => { if (e.target.value > 0 && e.target.value < 13) { setMonth(e.target.value) } }}
        />
        <label>Day</label>
        <input type="number" value={day}
          onChange={(e) => { if (e.target.value > 0 && e.target.value < 32) { setDay(e.target.value) } }}
        />
        <select onChange={(e) => { setParam(e.target.value.toLowerCase()) }}>
          <option>Births</option>
          <option>Deaths</option>
          <option>Events</option>
          <option>Holidays</option>
          <option>Selected</option>
        </select>
        <input type="submit" value="Search"/>
      </form>
      <List data={data.slice(0, page)}/>
    </div>
  )
}

export default Search;