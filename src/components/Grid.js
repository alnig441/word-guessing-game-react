import React from 'react';
import Next from './Next';
import { useEffect, useState, componentDidUpdate, componentDidMount } from 'react';
import './Grid.css';
import { get } from '../utilities/APIutil';

import Input from './Input';

let visible = true;

export default function Grid(props) {

  return (
    <>
      <Input data={buildGridData(props.sentence)} />
      <Next visible={visible} onClick={props.onClick} />
    </>
  )
}

function buildGridData(sentence: string) {
  const length = sentence.length;
  let inputProps = [];
  let letterKey = 0;
  let spaceKey = 0;

  for(var i = 0 ; i < length ; i++) {
    if(sentence[i] === ' ') {
      inputProps.push({  className: 'space' , key: 's-' + spaceKey, value: sentence[i] });
      spaceKey ++;
    } else {
      inputProps.push({ className: 'letter' , key: 'l-' + letterKey, value: sentence[i] });
      letterKey ++;
    }
  }
  return inputProps;
}
