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
  const [title, setTitle] = useState('');
  const [record, setRecord] = useState([]);
  const [months, setMonths] = useState({
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July',
    8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  });
  const [currentMonth, setCurrentMonth] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [currentParam, setCurrentParam] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearched(true);
    setActiveGear(true);
    setData([]);

    axios.post('http://localhost:3000/search', {month, day, param})
      .then(response => {
        console.log(response);
        if (!response.data[param].length) {
          alert('Please enter a valid date')
          return;
        }
        param === 'births' ? setTitle('Notable People Born On') : null;
        param === 'deaths' ? setTitle('Notable People Who Died On') : null;
        param === 'events' ? setTitle('Events That Occurred On') : null;
        param === 'holidays' ? setTitle('Holidays Celebrated On') : null;

        setCurrentMonth(months[month]);
        setCurrentDay(day);
        setCurrentParam(param);
        record.push([month, day, param]);
        if (record.length > 2) {
          record.shift();
        }
        setData(response.data[param]);
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
      <List
        data={data.slice(0, page)} activeGear={activeGear} title={title} currentMonth={currentMonth}
        currentParam={currentParam} currentDay={currentDay} months={months} record={record}
        page={page} setPage={setPage}
      />
      <p id="default-title" style={{display: !searched ? 'inline' : 'none'}}>
        Welcome to One Day.
      </p>
      <p id="default-subtitle" style={{display: !searched ? 'inline' : 'none'}}>
        Input your favorite month and day to get started.
      </p>
    </div>

  )
}

export default Search;