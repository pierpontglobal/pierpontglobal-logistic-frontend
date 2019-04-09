import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withCookies } from "react-cookie";
import { MuiThemeProvider } from "@material-ui/core";
import { DefaultTheme } from "./Defaults";
import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/sign-in/SignIn";
import OrderDetail from "./components/order-detail/OrderDetail";
import OrderList from "./components/order-list/OrderList";
import NotFound from "./components/not-found/NotFound";
import { Redirect } from "react-router-dom";
import SignInPPG from "./components/sign-in-ppg/SignInPPG";
import SignUp from "./components/sign-up/SignUp";
import ShipperList from "./components/shipper-list/ShipperList";
import DealerList from "./components/dealer-list/DealerList";
import InvoiceList from "./components/invocie-list/InvocieList";
import ShipperCreate from "./components/shipper-list/shipper-create/ShipperCreate";
import LandingPage from "./components/landing-page/LandingPage";
import AgentList from "./components/agent-list/AgentList";
import ModeOfTransportationList from "./components/mode-of-transportation-list/ModeOfTransportationList";
import Script from "react-load-script";
import { GOOGLE_API_KEY } from "./Defaults";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { NOTIFICATION_TYPES } from "./constants/NotificationTypes";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptisLoaded: false
    };
    this.notificationDOMRef_info = React.createRef();
    this.notificationDOMRef_sucess = React.createRef();
    this.notificationDOMRef_error = React.createRef();
  }

  handleOnLoad = () => {
    this.setState({
      scriptisLoaded: true
    });
  };

  addNotification = (title, message, duration, type) => {
    let obj = this.notificationDOMRef_info;
    if (type === NOTIFICATION_TYPES.SUCCESS)
      obj = this.notificationDOMRef_sucess;
    else if (type === NOTIFICATION_TYPES.ERROR)
      obj = this.notificationDOMRef_error;

    obj.current.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: duration },
      dismissable: { click: true }
    });
  };

  render() {
    const { cookies } = this.props;
    const { scriptisLoaded } = this.state;
    const isLoggedIn = !!cookies.get("token", { path: "/" });
    return (
      <MuiThemeProvider theme={DefaultTheme}>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
          onLoad={this.handleOnLoad}
        />
        {scriptisLoaded ? (
          <Router>
            <div>
              <ReactNotification ref={this.notificationDOMRef_info} />
              <ReactNotification ref={this.notificationDOMRef_error} />
              <ReactNotification ref={this.notificationDOMRef_sucess} />
              <Switch>
                <Route exact path="/" render={() => <LandingPage />} />
                <Route
                  exact
                  path="/sign-in"
                  render={() => <SignIn cookies={cookies} />}
                />
                <Route
                  path="/dashboard"
                  render={() =>
                    isLoggedIn ? (
                      <Dashboard
                        addNotification={this.addNotification}
                        cookies={cookies}
                      />
                    ) : (
                      <Redirect to="/sign-in" />
                    )
                  }
                />
                <Route
                  exact
                  path="/orders"
                  render={() =>
                    isLoggedIn ? (
                      <OrderList
                        addNotification={this.addNotification}
                        cookies={cookies}
                      />
                    ) : (
                      <Redirect to="/sign-in" />
                    )
                  }
                />
                <Route
                  exact
                  path="/order/:id"
                  render={() =>
                    isLoggedIn ? (
                      <OrderDetail
                        addNotification={this.addNotification}
                        cookies={cookies}
                      />
                    ) : (
                      <Redirect to="/sign-in" />
                    )
                  }
                />
                <Route
                  exact
                  path="/shippers"
                  render={() =>
                    isLoggedIn ? (
                      <ShipperList
                        addNotification={this.addNotification}
                        cookies={cookies}
                      />
                    ) : (
                      <Redirect to="/sign-in" />
                    )
                  }
                />
                <Route
                  exact
                  path="/shippers/create"
                  render={() =>
                    isLoggedIn ? (
                      <ShipperCreate
                        addNotification={this.addNotification}
                        cookies={cookies}
                      />
                    ) : (
                      <Redirect to="/sign-in" />
                    )
                  }
                />
                <Route
                  exact
                  path="/dealers"
                  render={() =>
                    isLoggedIn ? (
                      <DealerList
                        addNotification={this.addNotification}
                        cookies={cookies}
                      />
                    ) : (
                      <Redirect to="/sign-in" />
                    )
                  }
                />
                <Route
                  exact
                  path="/agents"
                  render={() =>
                    isLoggedIn ? (
                      <AgentList
                        addNotification={this.addNotification}
                        cookies={cookies}
                      />
                    ) : (
                      <Redirect to="/" />
                    )
                  }
                />
                <Route
                  exact
                  path="/mode_of_transportations"
                  render={() =>
                    isLoggedIn ? (
                      <ModeOfTransportationList
                        addNotification={this.addNotification}
                        cookies={cookies}
                      />
                    ) : (
                      <Redirect to="/sign-in" />
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
        ) : null}
      </MuiThemeProvider>
    );
  }
}

export default withCookies(App);
