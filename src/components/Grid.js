import Next from './Next';
import React, { useEffect, useState, componentDidUpdate, componentDidMount } from 'react';
import './Grid.css';
import Input from './Input';

let visible = true;

export default function Grid(props) {

  let [complete, setComplete] = useState(false);
  let [score, setScore] = useState(0);
  let [sentence, setSentence] = useState('')

  useEffect(() => {
    if(sentence !== props.sentence) {
      setSentence(props.sentence);
      setScore(0);
      setComplete(false);
      resetGrid()
    }
  })

  function checkLetter(e) {
    e.preventDefault();
    const numberOfInputs = props.sentence.length - 1;
    const inputFieldID = e.target.attributes['id'].value;
    const userInput = e.key.toLowerCase();
    const correctLetter = props.sentence[inputFieldID].toLowerCase();
    const thisInput = e.target;
    const previousInput = e.target.previousSibling;
    const nextInput = e.target.nextSibling;
    let isLastInput = (inputFieldID === numberOfInputs.toString());


    if(userInput.length === 1){
      if(userInput === correctLetter){
        thisInput.value = e.key;
        if(isLastInput && score !== numberOfInputs) {
          console.log('last input');
          thisInput.focus();
        } else {
          thisInput.setAttribute('disabled', true);
          setScore(score + 1);
        }
      }
      if(!isLastInput) {
        nextInput.focus()
      }
    }

    else if(userInput === 'backspace') {
      thisInput.value = "";
      if(previousInput.hasAttribute('disabled')) {
        previousInput.removeAttribute("disabled");
        if(score > 0) {
          setScore(score - 1);
        }
      }
      previousInput.focus();
      previousInput.value = "";
    }

    if(score === numberOfInputs) {
      setComplete(true);
      setSentence(props.sentence);
    }
  }

  if(!complete) {
    return(
      <Input data={buildGridData(props.sentence)} onKeyUp={checkLetter}/>
    )
  } else {
    return (
      <>
        <Input data={buildGridData(props.sentence)} onKeyUp={checkLetter}/>
        <Next onClick={props.onClick} />
      </>
    )
  }
}

function resetGrid() {
  const grid = document.getElementsByTagName('input');
  for(const input of grid) {
    input.value = "";
    input.removeAttribute("disabled");
  }
  grid[0].focus();
}

function buildGridData(sentence: string) {
  const length = sentence.length;
  let inputProps = [];
  let letterKey = 0;
  let spaceKey = 0;

  for(var i = 0 ; i < length ; i++) {
    if(sentence[i] === ' ') {
      inputProps.push({  className: 'space' , key: 's-' + spaceKey, id: i });
      spaceKey ++;
    } else {
      inputProps.push({ className: 'letter' , key: 'l-' + letterKey, id: i });
      letterKey ++;
    }
  }
  return inputProps;
}
