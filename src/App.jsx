import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { MuiThemeProvider } from '@material-ui/core';
import axios from 'axios';
import { DefaultTheme } from './Defaults';
import SignIn from './components/SignIn/SignIn';

class App extends Component {
  constructor(props) {
    super(props);
    const { cookies } = this.props;

    axios.interceptors.request.use((config) => {
      config.headers = { Authorization: `Bearer ${cookies.get('token')}` };
      return config;
    }, error => Promise.reject(error));

    axios.interceptors.response.use(response => response,
      (error) => {
        if (error.response.request.responseURL.includes('oauth/token')) {
          return error.response;
        } if (error.response.status === 401) {
          cookies.remove('token');
          window.location.href = '/?signIn=true';
        }
        return Promise.reject(error);
      });
  }

  render() {
    const { cookies } = this.props;
    return (
      <MuiThemeProvider theme={DefaultTheme}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" render={() => (<SignIn cookies={cookies} />)} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default withCookies(App);
