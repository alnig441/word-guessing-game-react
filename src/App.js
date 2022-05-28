import React from 'react';
import './App.css';
import Sentence from './components/Sentence';
import Instructions from './components/Instructions';
import Score from './components/Score';
import Grid from './components/Grid';
import { API } from './utilities/APIutil';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSentence: 'loading',
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

  getNext() {
    if(this.state.index < 9) {
      this.setState((state) => {
        return { index: state.index + 1 }
      })
      this.setState((state) => {
        return { currentSentence: state.sentences[state.index]}
      })
    } else {
      this.setState({ complete: true })
    }
  }

  render() {
    if(!this.state.complete) {
      return (
        <React.Fragment >
          <Sentence sentence={this.state.currentSentence} />
          <Instructions />
          <Score score={this.state.index}/>
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
