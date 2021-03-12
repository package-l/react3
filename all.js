import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

// -------------------------------------------------------------------------------------------
// Component state
// -------------------------------------------------------------------------------------------

// So far we've looked at defining and passing props
// to our components. What happens when we want to change them?
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  increment = () => {
    this.setState({
      current: this.state.current + 1,
    });
  };

  render() {
    return (
      <div>
        <div>Current: {this.state.current}</div>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      other: 'untouched',
    };
  }

  render() {
    // We cannot do:
    // this.props.a = 'new value', or this.state.a = 'new value'

    return (
      <>
        <div>Current: {this.state.current}</div>
        <div>Other: {this.state.other}</div>
        <button
          onClick={() => {
            this.setState(
              (oldState) => {
                // State changes are asynchronous so instead of using
                // this.state, use the function
                const { current: oldCurrent } = oldState;

                return {
                  current: oldCurrent + 1,
                };
              },
              () => {
                // Here we have the new state
                console.log(this.state);
              }
            );
          }}
        >
          Up
        </button>
      </>
    );
  }
}

// Remember setState does not set the state but MERGES the state

// This will not replace the state, current will be unchanged
setState({
  random: 'new something',
});

// The diffing is not deep though, if you have:
state = {
  user: {
    firstName: 'John',
    lastName: 'Doe',
  },
};

// setting a new user will replace the entire user, our new
// user will not have a lastName:
setState({
  user: {
    firstName: 'Jane',
  },
});

// Inputs

// This component's state is managed by the DOM
// so we can't really use the value, its much better if
// we have React manage the component's state -> single source of truth!
class UncontrolledInput extends React.Component {
  render() {
    return <input />;
  }
}

class ControlledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  render() {
    const { value } = this.state;

    return (
      <>
        <div>
          <b>Current Value: </b>
          {value}
        </div>
        <input
          value={value}
          onChange={(e) => {
            this.setState({
              value: e.target.value,
            });
          }}
        />
      </>
    );
  }
}

// Lifecycle
// Mounting and unmounting
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    clearInterval(this.timerID);
  }

  tick() {
    this.setState(({ current }) => {
      return {
        current: current + 1,
      };
    });
  }

  render() {
    return (
      <div>
        <h1>Current: {this.state.current}</h1>
      </div>
    );
  }
}

// Taking a deeper look
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
        {current} is {current % 2 ? <Odd /> : <Even />}
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

// ------------------------------------------------------------------------------------------
// PROP TYPES
// ------------------------------------------------------------------------------------------

// How do we validate that our component receives what it needs?
// - TypeScript: adds strict typing on top of JS (https://www.typescriptlang.org/)
// - prop-types: official package from FB to validate props passed to components

class RadioButton extends Component {
  render() {
    const { value, label, onClick } = this.props;
    return (
      <button
        onClick={() => {
          onClick(value);
        }}
      >
        {label}
      </button>
    );
  }
}

// Define the type of properties that we expect
RadioButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

// PropType errors will not throw a runtime error (i.e. it will still render)
// so the component will still render -> CHECK OUT DEV TOOLS!
class App extends Component {
  render = () => <RadioButton />;
}

// Fundamental types
RadioButton.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,
  optionalObject: PropTypes.object,
};

// React types
RadioButton.propTypes = {
  optionalNode: PropTypes.node, // anything that can be rendered
  optionalElement: PropTypes.element, // specifically a react element
  optionalElementType: PropTypes.elementType, // a string which is the element's type or the actual class
  optionalMessage: PropTypes.instanceOf(MyClass), // an instance of a specific class
};

// Open question: how can we validate that Test is of a specific class when doing prop={Test}

class MyComponent extends Component {
  render = () => <div>MyComponent</div>;
}

// Example
MyComponent.propTypes = {
  p1: PropTypes.node, // anything that can be rendered
  p2: PropTypes.element, // specifically a react element
  p3: PropTypes.elementType,
  // This doesn't work if you pass in <MyComponent /> -> remember
  // this gets converted to an object. Instead you use `new MyClass()`
  p4: PropTypes.instanceOf(MyComponent),
};

// Allowing more than 1 type
MyComponent.propTypes = {
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Message)]),
};

// Example
MyComponent.propTypes = {
  p1: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

// Validating arrays
MyComponent.propTypes = {
  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
};

// Validating objects
MyComponent.propTypes = {
  // An object with all property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),
  // Object with shape (allows +- keys)
  optionalObjectWithShape: PropTypes.shape({
    a: PropTypes.string,
    b: PropTypes.number,
  }),
  // Object with specific keys (you can have less keys than these, but not more)
  optionalObjectWithShape: PropTypes.exact({
    a: PropTypes.string,
    b: PropTypes.number,
  }),
};

// Example
class Avatar extends Component {
  render() {
    const { user } = this.props;
    const { fullName, email } = user;

    return (
      <div>
        <div>{fullName}</div>
        <div>{email}</div>
      </div>
    );
  }
}

Avatar.propTypes = {
  // More relaxed
  user: PropTypes.objectOf(PropTypes.string),
  // More strict
  user: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    // with this option we can include additional properties
  }),
  // Strictest
  user: PropTypes.exact({
    fullName: PropTypes.string,
    email: PropTypes.string,
    // no additional properties accepted
  }),
};

// So far we haven't made anything required, just specified the type
// Any proptype can be made a required field
Avatar.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  // Anything is allowed as long as its provided
  user: PropTypes.any.isRequired,
};

// Default values
Avatar.defaultProps = {
  user: {
    fullName: 'Default User',
  },
};

// Its useful to create our own PropTypes so we
// don't have to repeat the definition everywhere
