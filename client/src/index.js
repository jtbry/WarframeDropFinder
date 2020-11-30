import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Home from './pages/home/Home'
import Item from './pages/item/Item'
import Drops from './pages/drops/Drops'
import Component from './pages/component/Component'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

// todo: branding / customization
// Change public/manifest.json and favicos / logos
// Create and implement a color scheme. For now it is white/grey monochrome
const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#white'
    },
    text: {
      primary: '#020204'
    },
    secondary: {
      main: '#BEBBB6'
    },
    background: {
      default: 'white',
      paper: 'white'
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <Router>
        <Switch>
          <Route path="/item/*" component={Item} />
          <Route path="/component/*" component={Component} />
          <Route path="/drops/*" component={Drops} />
          <Route exact path="/" component={Home} />
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
