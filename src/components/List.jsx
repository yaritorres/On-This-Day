import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const List = (props) => {

  return (
    <div>
      {!props.data.length ? <FontAwesomeIcon id="loading" icon={faGear} /> :
        props.data.map(event =>
          <p>{event.text}</p>
        )
      }
    </div>
  )
}

export default List;