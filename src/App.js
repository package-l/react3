import React, { Component } from 'react';
import './App.css';

const mainLog = (msg) => console.log(`%c ${msg} `, 'background: black; color: white');
const displayLog = (msg) => console.log(`%c ${msg} `, 'background: green; color: white');
const evenLog = (msg) => console.log(`%c ${msg} `, 'background: red;');
const oddLog = (msg) => console.log(`%c ${msg} `, 'background: blue; color: white;');

class Even extends Component {
  constructor() {
    super();
    this.log = evenLog;
    this.log('constructing Even');
  }

  componentDidMount() {
    this.log('componentDidMount Even');
  }

  componentWillUnmount() {
    this.log('componentWillUnmount Even');
  }

  render() {
    return <div className="even">Even!</div>;
  }
}

class Odd extends Component {
  constructor() {
    super();
    this.log = oddLog;
    this.log('constructing Odd');
  }

  componentDidMount() {
    this.log('componentDidMount Odd');
  }

  componentWillUnmount() {
    this.log('componentWillUnmount Odd');
  }

  render() {
    return <div className="odd">Odd</div>;
  }
}

class Display extends Component {
  constructor() {
    super();
    this.log = displayLog;
    this.log('constructing Display');
  }

  componentDidMount() {
    this.log('componentDidMount Display');
  }

  componentWillUnmount() {
    this.log('componentWillUnmount Display');
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.log('shouldComponentUpdate Display', nextProps, nextState);
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    this.log('componentDidUpdate Display', prevProps, prevState);
  }

  render() {
    const { current } = this.props;

    return (
      <div className="wrapper display">
        {current} is {current % 2 !== 0 ? <Odd /> : <Even />}
      </div>
    );
  }
}

class Counter extends Component {
  // Always need to call the default constructor before anything
  constructor(props) {
    super(props);
    this.log = mainLog;
    // Define the initial state for your component, its the only place
    // where you can assign state
    this.state = {
      current: props.min || 0,
    };

    this.log('constructing Counter');
  }

  componentDidMount() {
    this.log('componentDidMount Counter');
  }

  componentWillUnmount() {
    this.log('componentWillUnmount Counter');
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.log('shouldComponentUpdate Counter', nextProps, nextState);
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    this.log('componentDidUpdate Counter', prevProps, prevState);
  }

  decrement = () =>
    this.setState(({ current }) => ({
      current: current + (current === this.props.min ? 0 : -1),
    }));

  increment = () =>
    this.setState(({ current }) => ({
      current: current + (current === this.props.max ? 0 : 1),
    }));

  render() {
    const { min, max } = this.props;
    const { current } = this.state;

    return (
      <div className="wrapper counter">
        <div className="item">Min: {min}</div>
        <button onClick={this.decrement}>-</button>
        <Display current={current} />
        <button onClick={this.increment}>+</button>
        <div className="item">Max: {max}</div>
      </div>
    );
  }
}

const App = () => {
  return <Counter min={3} max={8} />;
};

export default App;
