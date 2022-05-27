import React from 'react';
import { useEffect, componentDidUpdate, componentDidMount, setState } from 'react';
import './App.css';
import Sentence from './components/Sentence';
import Instructions from './components/Instructions';
import Score from './components/Score';
import Grid from './components/Grid';
import { API } from './utilities/APIutil';

const SENTENCES = [];

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSentence: 'loading',
      score: 0,
      index: 0,
      sentences: [],
      complete: false
    };
    this.getNext = this.getNext.bind(this);
  }

  componentDidMount() {
    let response = API.get();

    response.then(result => {
      this.setState({ sentences: result })
      this.setState((state) => {
        return { currentSentence : state.sentences[state.index]}
      })
    });

  }

  componentDidUpdate(...prevProps) {
  }

  getNext() {
    if(this.state.index < 9) {
      console.log('which sentence ', this.state.index)
      this.setState((state) => {
        return { index: state.index + 1 }
      })
      this.setState((state) => {
        return { currentSentence: state.sentences[state.index]}
      })
      this.setState((state) => {
        return { score: state.score + 1 }
      })
    } else {
      this.setState({ complete: true })
    }
    console.log('did this work', this.state);

  }

  render() {
    if(!this.state.complete) {
      return (
        <React.Fragment >
          <Sentence sentence={this.state.currentSentence} />
          <Instructions />
          <Score score={this.state.score}/>
          <Grid sentence={this.state.currentSentence} onClick={this.getNext}/>
        </React.Fragment>
      )
    }
    else {
      return <h1> You Win! </h1>
    }
  }
}


export default App;
