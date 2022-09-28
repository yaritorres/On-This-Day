import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const List = (props) => {
  const [months, setMonths] = useState({
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July',
    8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  });

  return (
    <div>
      {!props.data.length ?
        <div id="loading" style={{display: props.activeGear ? null : 'none'}}>
          <FontAwesomeIcon id="gear" icon={faGear} />
        </div> :

        <div id="list" style={{display: props.activeGear ? 'none' : null}}>
          <span id="title" >{props.title} {months[props.month]} / {props.day}</span>
          {props.data.map(event =>
            <p>{event.text}</p>
          )}
        </div>
      }
    </div>
  )
}

export default List;