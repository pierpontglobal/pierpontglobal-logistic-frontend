import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { MuiThemeProvider } from '@material-ui/core';
import { DefaultTheme } from './Defaults';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/sign-in/SignIn';
import OrderDetail from './components/order-detail/OrderDetail';
import OrderList from './components/order-list/OrderList';
import NotFound from './components/not-found/NotFound';
import { Redirect } from 'react-router-dom';
import SignInPPG from './components/sign-in-ppg/SignInPPG';
import SignUp from './components/sign-up/SignUp';
import ShipperList from './components/shipper-list/ShipperList';
import DealerList from './components/dealer-list/DealerList';
import InvoiceList from './components/invocie-list/InvocieList';

function App(props) {
  const { cookies } = props;
  const isLoggedIn = !!cookies.get('token');
  return (
    <MuiThemeProvider theme={DefaultTheme}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={() => <SignIn cookies={cookies} />} />
            <Route
              path="/dashboard"
              render={() =>
                isLoggedIn ? (
                  <Dashboard cookies={cookies} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/orders"
              render={() =>
                isLoggedIn ? (
                  <OrderList cookies={cookies} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/order/:id"
              render={() =>
                isLoggedIn ? (
                  <OrderDetail cookies={cookies} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/shippers"
              render={() =>
                isLoggedIn ? (
                  <ShipperList cookies={cookies} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/dealers"
              render={() =>
                isLoggedIn ? (
                  <DealerList cookies={cookies} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/invoices"
              render={() =>
                isLoggedIn ? (
                  <InvoiceList cookies={cookies} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/oauth/ppg:token?"
              render={() => <SignInPPG cookies={cookies} />}
            />
            <Route exact path="/signup" render={() => <SignUp />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default withCookies(App);
