import React from 'react';
import { useEffect } from 'react';
import './Score.css';

function Score(props) {
  return (
    <h1>Score: {props.score}</h1>
  )
}

export default Score;
