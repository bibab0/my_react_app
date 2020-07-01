import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
// const Home = lazy(() => import('./routes/Home'));
// const About = lazy(() => import('./routes/About'));
// const App = () => (
//   <Router>
//     <Suspense fallback={<div>loading...</div>}>
//       <switch>
//         <Route exact path="/" component={Home}></Route>
//         <Route path="/about" component={About}></Route>
//       </switch>
//     </Suspense>
//   </Router>
// )
// import MyErrorBoundary from './MyErrorBoundary';
// const OtherComponent = React.lazy(() => import('./OtherComponent'));
// const AnotherComponent = React.lazy(() => import('./AnotherComponent'));
// const MyComponet = () => (
//   <MyErrorBoundary>
//     <Suspense fallback={<div>loading...</div>}>
//       <OtherComponent />
//       <AnotherComponent />
//     </Suspense>
//   </MyErrorBoundary>
// )
function formatName(user) {
  return user.fName + user.lName;
}
const name = {
  fName: 'pan',
  lName: 'shihao'
};
function Element() {
  return (
    <h1>hello,{formatName(name)}</h1>
  )
}
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (<h2>我是{this.props.name}</h2>);
  }
}
class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() }
  }
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date()
    })
  }
  render() {
    return (
      <div>
        <h1>hello,world!</h1>
        <h2>现在是{this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}
class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }))
  }
  render() {
    return (
      <button onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
    );
  }
}
function MailBox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>hello!</h1>
      {
        unreadMessages.length > 0 && <h2>你有{unreadMessages.length}条未读消息！</h2>
      }
    </div>
  )
}
const messages = ['1', 'ww', 'ss'];

function WarningBaner(props) {
  if (!props.warn) return false;
  return (
    <div className="warning">Warning!</div>
  )
}
class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }))
  }
  render() {
    return (
      <div>
        <WarningBaner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>{!this.state.showWarning ? 'show' : 'hidden'}</button>
      </div>
    );
  }
}

function NumberList(props) {
  return (
    <ul>{props.numbers.map(number => <li key={number.toString()}>{number}</li>)}</ul>
  )
}
const numbers = [1, 2, 3, 4, 5, 6];

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    console.log('提交的名字' + this.state.value);
    event.preventDefault();

  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>名字：<input type="text" value={this.state.value} onChange={this.handleChange} /></label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>水开了</p>;
  } else {
    return <p>水没开</p>;
  }
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = { temperature: '', scale: 'c' };
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }
  handleCelsiusChange(temperature) {
    this.setState({ scale: 'c', temperature });
  }
  handleFahrenheitChange(temperature) {
    this.setState({ scale: 'f', temperature });
  }
  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

class TemperatureInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }
  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>请输入温度{scaleNames[scale]}：</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  )
}

function WelcomeDialog(props) {
  return (
    <FancyBorder color="red">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  )
}

class CustomTextInput extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  componentDidMount() {
    this.textInput.current.focus();
  }
  render() {
    return (
      <input type="text" ref={this.textInput} />
    );
  }
}

class OuterClickExample extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggleContainer = React.createRef();
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }
  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }
  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }))
  }
  onClickOutsideHandler(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false })
    }
  }
  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Select an option</button>
        {
          this.state.isOpen && (
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
          )
        }
      </div>
    );
  }
}

const ThemeContext = React.createContext('light');

class MyApp extends Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

class ThemedButton extends Component {
  static contextType = ThemeContext;
  render() {
    return <div>{this.context}</div>;
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Element />
        <Welcome name="panpan" />
        <Clock />
        <Toggle />
        <MailBox unreadMessages={messages} />
        <Page />
        <NumberList numbers={numbers} />
        <NameForm />
        <Calculator />
        <WelcomeDialog />
        <CustomTextInput />
        <OuterClickExample />
        <MyApp />
      </header>
    </div>
  );
}

export default App;
