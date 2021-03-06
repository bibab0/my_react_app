import React, { Component, useState, useEffect } from 'react';
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

// const CommentListWithSubscription = withSubscription(
//   CommentList,
//   (DataSource) => DataSource.getComments()
// );

// const BlogPostWithSubscription = withSubscription(
//   BlogPost,
//   (DataSource, props) => DataSource.getBlogPost(props.id)
// );

// function withSubscription(WrappedComponent, selectData) {
//   return class extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         data: selectData(DataSource, props)
//       };
//       this.handleChange = this.handleChange.bind(this);
//     }
//     componentDidMount() {
//       DataSource.addChangeListener(this.handleChange);
//     }
//     componentWillUnmount() {
//       DataSource.removeChangeListener(this.handleChange);
//     }
//     handleChange() {
//       this.setState({
//         data: selectData(DataSource, this.props)
//       })
//     }
//     render() {
//       return (
//         <WrappedComponent data={this.state.data} {...this.props} />
//       );
//     }
//   }
// }

const Button = props => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other}></button>
}

const UserButton = () => {
  return (
    <Button kind="primary" onClick={() => { console.log("点击了"); }}>hello world!</Button>
  )
}
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { count: 1 }
  }
  render() {
    return (
      <button color={this.props.color} onClick={() => this.setState(state => ({ count: state.count + 1 }))}>
        count:{this.state.count}
      </button>
    );
  }
}

class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;;
  }
}

class WordAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(state => ({
      words: state.words.concat('marklar')
    }));
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>点击</button>
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}

class CustomText extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }
  focusTextInput() {
    this.textInput.current.focus();
  }
  render() {
    return (
      <div>
        <div onClick={this.focusTextInput}>聚焦</div>
        <input ref={this.textInput} type="text" />
      </div>
    );
  }
}

class Cat extends Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="./logo.svg" alt='logo' style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }
  render() {
    return (
      <div style={{ height: '100px' }} onMouseOver={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )} />
      </div>
    );
  }
}

class Greeting extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (<div>hello,{this.props.name}</div>);
  }
}

Greeting.defaultProps = {
  name: 'panshihao'
}

class NameForm1 extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }
  handleSubmit(event) {
    console.log(this.input.current.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name: <input type="text" ref={this.input} defaultValue="11" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function createMarkup() {
  return { __html: 'First &middot; Second' }
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()}></div>
}

function Example() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>点我</button>
    </div>
  )
}

function MyCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  return (
    <div>
      <p>你已经点击了{count}次</p>
      <button onClick={() => setCount(count + 1)}>点击加一</button>
    </div>
  )
}

// function FriendStatus(props) {
//   const [isOnline, setIsOnline] = useState(null);
//   function handleStatusChange(status) {
//     setIsOnline(status.isOnline);
//   }
//   useEffect(() => {
//     ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
//     return () => {
//       ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
//     }
//   })
//   if (isOnline === null) {
//     return 'Loading...';
//   }
//   return isOnline ? 'Online' : 'Offline';
// }

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
        <UserButton />
        <CounterButton />
        <WordAdder />
        <CustomText />
        <MouseTracker />
        <Greeting />
        <NameForm1 />
        <MyComponent />
        <Example />
        <MyCount />
      </header>
    </div>
  );
}

export default App;
