import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Home from './pages/home'
import Item from './pages/item'
import ItemComponent from './pages/component'
import Location from './pages/location'

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#5A4EA6'
    },
    text: {
      primary: '#120504',
      secondary: '#787878'
    },
    secondary: {
      main: '#3F3CA6'
    },
    background: {
      default: '#F2F2F2',
      paper: '#FCFCFC'
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/item/*' component={Item} />
          <Route path='/component/*' component={ItemComponent} />
          <Route path='/location/*' component={Location} />
          <Redirect to='/' />
        </Switch>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
