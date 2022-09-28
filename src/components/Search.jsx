import React, { useState, useEffect } from 'react';
const axios = require('axios');
import List from '../components/List.jsx'

const Search = (props) => {
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [param, setParam] = useState('births');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(10);
  const [activeGear, setActiveGear] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('');
  const [birthsTitle, setBirthsTitle] = useState('Notable People Born On');
  const [deathsTitle, setDeathsTitle] = useState('Notable People Who Died On');
  const [eventsTitle, setEventsTitle] = useState('Events That Occurred On');
  const [holidaysTitle, setHolidaysTitle] = useState('Holidays Celebrated On');
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveGear(true);
    setData([]);

    axios.post('http://localhost:3000/search', {month, day, param})
      .then(response => {
        if (!response.data[param].length) {
          alert('Please enter a valid date')
          return;
        }
        param === 'births' ? setTitle(birthsTitle) : null;
        param === 'deaths' ? setTitle(deathsTitle) : null;
        param === 'events' ? setTitle(eventsTitle) : null;
        param === 'holidays' ? setTitle(holidaysTitle) : null;

        setData(response.data[param]);
        setCurrentSearch(response.data[param][0]);
      })
      .then(() => {
        setActiveGear(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div id="form-and-list">
      <form onSubmit={(e) => { handleSubmit(e) }}>
        <label>Month</label>
        <input
          className="date"
          type="number"
          value={month}
          onChange={(e) => { if (e.target.value > 0 && e.target.value < 13) { setMonth(e.target.value) } }}
        />
        <label>Day</label>
        <input type="number" value={day} className="date"
          onChange={(e) => { if (e.target.value > 0 && e.target.value < 32) { setDay(e.target.value) } }}
        />
        <select onChange={(e) => { setParam(e.target.value.toLowerCase()) }}>
          <option>Births</option>
          <option>Deaths</option>
          <option>Events</option>
          <option>Holidays</option>
        </select>
        <input id="submit" type="submit" value="Search"/>
      </form>
      <List data={data.slice(0, page)} activeGear={activeGear} title={title} month={month} day={day}/>
    </div>
  )
}

export default Search;