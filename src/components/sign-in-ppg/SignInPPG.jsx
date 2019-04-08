import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import ArrowForward from "@material-ui/icons/ArrowForward";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { ApiServer, WEB_APP_LOGISTICS } from "../../Defaults";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  main: {
    width: "auto",
    display: "absolute",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 450,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    background: "linear-gradient(45deg, #AA1919 40%, #D31F1F 15%, #AA1919 40%)"
  },
  logo: {
    width: "100%"
  }
});

class SignInPPG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false
    };
  }

  handleUserEmail = e => {
    this.setState({ email: e.target.value });
  };

  handleUserPassword = e => {
    this.setState({ password: e.target.value });
  };

  continue = e => {
    e.preventDefault();
    const token = queryString.parse(this.props.location.search).token;
    axios.post(`${ApiServer}/oauth/ppg`, { token: token }).then(data => {
      if (!!data && data.headers && data.headers["authorization"]) {
        this.props.cookies.set(
          "token",
          this.getToken(data.headers["authorization"]),
          { path: "/" }
        );
        this.props.history.push("/dashboard");
      } else {
        console.log("authorization token missing.");
      }
    });
  };

  getToken = value => {
    if (value.includes("Bearer")) {
      value = value.split(" ")[1];
    }
    return value;
  };

  render() {
    const { classes } = this.props;
    const { isLoggedIn } = this.state;
    if (isLoggedIn) return <Redirect to="/dashboard" />;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Grant Access to Pierpont Global
          </Typography>
          <div style={{ pading: "18px", margin: "25px" }}>
            By clicking "continue" you allow Pierpont global to access your
            personal information.
          </div>
          <div style={{ marginTop: "3px", marginBottom: "3px" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.continue}
            >
              <span style={{ pading: "5px", marginRight: "7px" }}>
                Continue{" "}
              </span>
              <ArrowForward />
            </Button>
          </div>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(withRouter(SignInPPG));
