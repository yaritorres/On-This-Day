import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const List = (props) => {

  return (
    <div id="list-div">
      {!props.data.length ?
        <div id="loading" style={{display: props.activeGear ? null : 'none', animationPlayState: props.activeGear ? null : 'paused'}}>
          <FontAwesomeIcon id="gear" icon={faGear} />
          <span id="alert-gang"> Powered by Alert Gang </span>
        </div> :

        <div id="list" style={{display: props.activeGear ? 'none' : null}}>
          <div id="list-header">
            <span id="title" >{props.title} {props.currentMonth} {props.currentDay}</span>
            <span id="prev-searches" style={{display: props.record.length < 2 ? 'none' : 'block'}}>
              Previous Search: {props.months[props.record[0][0]]}, {props.record[0][1]} {`(${props.record[0][2]})`}
            </span>
          </div>
          {props.data.map(event =>
            <p className="list-item">{event.text}</p>
          )}
          <button onClick={() => { props.setPage(props.page + 10) }}> Show More </button>
        </div>
      }
    </div>
  )
}

export default List;