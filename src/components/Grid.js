import Next from './Next';
import React, { useEffect, useState } from 'react';
import './Grid.css';
import Input from './Input';

export default function Grid(props) {

  let [complete, setComplete] = useState(false);
  let [score, setScore] = useState(0);
  let [sentence, setSentence] = useState('');
  const inputs = document.getElementsByTagName('input');

  useEffect(() => {
    if(sentence !== props.sentence) {
      setSentence(props.sentence);
      setScore(0);
      setComplete(false);
      resetGrid()
    }
  },[sentence, props.sentence])

  function checkLetter(e) {
    e.preventDefault();
    const userInput = e.key.toLowerCase();
    const numberOfInputs = props.sentence.length - 1;
    const inputFieldID = parseInt(e.target.attributes['id'].value);
    const correctLetter = props.sentence[inputFieldID].toLowerCase();
    const thisInput = e.target;
    const isLastInput = (inputFieldID === numberOfInputs);
    const isFirstInput = (inputFieldID === 0);
    const previousInput = !isFirstInput ? inputs[inputFieldID - 1] : null;
    const nextInput = !isLastInput ? inputs[inputFieldID + 1] : null;

    if(userInput.length === 1){
      if(userInput === correctLetter){
        thisInput.value = e.key;
        if(isLastInput && score !== numberOfInputs) {
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
  const words = sentence.split(' ');
  let inputId = 0;

  let gridData = words.map((word, i) => {
    let wordObjects = { tag: 'div', className: 'flex-container', key: word, children: [] }
    for (const index in word) {
      wordObjects.children.push({ tag: 'div', className: 'flex-item', key: `letter${i}${index}`, children: [{tag: 'input', className: 'letter', key: `${i}${index}`, id: inputId, maxLength: 1, pattern: '[a-zA-Z0-9]+' }] })
      inputId ++;
    }
    if(i !== words.length - 1){
      wordObjects.children.push({ tag: 'div', className: 'flex-item', key: `space${i}`, children:  [{tag: 'input', className: 'space', key: `${i}space`, id: inputId, maxLength: 1, pattern: '[a-zA-Z0-9]+' }] })
      inputId ++;
    }
    return wordObjects;
  })

  return gridData;
}
