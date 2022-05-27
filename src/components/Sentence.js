import React from 'react';
import { useEffect, componentDidUpdate, componentDidMount } from 'react';
import './Sentence.css';

function Sentence(props) {
  return <h1>{splitWords(props.sentence)}</h1>
}

export default Sentence;

function splitWords(sentence: any) {
  const words = sentence.split(' ');
  let scrambled = "";

  for(var i = 0, l = words.length ; i < l ; i ++) {
    if (words[i].length > 3) {
      scrambled += scramble(words[i]);
    } else {
      scrambled += words[i];
    }
    if(i <= (l - 1)) {
      scrambled += " ";
    }
  }
  return scrambled;
}

function scramble(word: string){
  const WORD = word.split('');
  const BEGIN = WORD.shift();
  const END : any = WORD.pop();

  let scrambled : any = BEGIN;
  let reducedWord = WORD;

  for(var i = 0 ; i < reducedWord.length ; ) {
    let targetIndex = Math.round(Math.random() * (reducedWord.length - 1));
    scrambled += reducedWord.splice(targetIndex, 1);
  }

  scrambled += END;
  return scrambled ;
}
