import Next from './Next';
import React, { useEffect, useState, forceUpdate } from 'react';
import './Grid.css';
import Input from './Input';

export default function Grid(props) {

  let [complete, setComplete] = useState(false);
  let [score, setScore] = useState(0);
  let [sentence, setSentence] = useState('');
  let [currentInput, setCurrentInput] = useState(0);
  const inputs = document.getElementsByTagName('input');

  useEffect(() => {
    if(sentence !== props.sentence) {
      setSentence(props.sentence);
      setScore(0);
      setComplete(false);
      setCurrentInput(0);
      resetGrid()
    }
  },[sentence, props.sentence])

  useEffect(() => {
       document.addEventListener('click', checkLetter, true);
       return () => {
           document.removeEventListener('click', checkLetter, true);
       };
   }, [currentInput]);

   function resetGrid() {
     for(const input of inputs) {
       input.value = "";
       input.removeAttribute("disabled");
     }
     inputs[0].focus();
   }

  function checkLetter(e) {
    e.preventDefault();
    if(!e.key) {
      inputs[currentInput].focus();
    }

    else {
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
          setCurrentInput(inputFieldID + 1);
          nextInput.focus()
        }
      }

      else if(userInput === 'backspace' && !isFirstInput) {
        thisInput.value = "";
        if(previousInput.hasAttribute('disabled')) {
          previousInput.removeAttribute("disabled");
          if(score > 0) {
            setScore(score - 1);
          }
        }
        previousInput.focus();
        setCurrentInput(inputFieldID - 1);
        previousInput.value = "";
      }

      if(score === numberOfInputs) {
        setComplete(true);
        setSentence(props.sentence);
      }
    }
  }

  if(!complete) {
    return(
      <div id="grid">
        <Input data={buildGridData(props.sentence)} onKeyUp={checkLetter}/>
      </div>
    )
  } else {
    return (
      <>
        <div id="grid">
          <Input data={buildGridData(props.sentence)} onKeyUp={checkLetter}/>
          <Next onClick={props.onClick} />
        </div>
      </>
    )
  }
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
