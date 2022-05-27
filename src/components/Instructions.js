import React from 'react';
import { useEffect, componentDidUpdate, componentDidMount } from 'react';
import './Instructions.css';

class Instructions extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    // console.log(this,'has mounted')
  }
  render () {
    return(
      <>
      <p>Guess the sentence! Start typing</p>
      <p>The yellow blocks are meant for spaces</p>
      </>
    )
  }

}

export default Instructions;
