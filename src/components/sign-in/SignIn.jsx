import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router-dom';
import Img from 'react-image';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    background: 'linear-gradient(45deg, #0F2027 30%, #203A43 90%)'
  },
  logo: {
    width: '100%',
  },
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      isLoading: false,
      hasErrors: false,
      errors: [],
      isLoggedIn: false,
    }
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleUserEmail = this.handleUserEmail.bind(this);
    this.handleUserPassword = this.handleUserPassword.bind(this);
    this.handleUserRemember = this.handleUserRemember.bind(this);
  }

  handleUserRemember = (e) => {
    this.setState({rememberMe: e.target.value});
  }

  handleUserEmail = (e) => {
    this.setState({email: e.target.value});
  }

  handleUserPassword = (e) => {
    this.setState({password: e.target.value});
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { cookies } = this.props;
    this.setState({
      isLoading: true
    });
    axios.post('https://reqres.in/api/login', {email: email, password: password})
    .then(data => {
      if (!!data) {
        let tokenREceived = this.getToken('Bearer 87684Dfhfkreakaiikrridnakjfosdf9sdf8');
        cookies.set('token', tokenREceived, { path: '/' });
        this.setState({
          isLoading: false,
          hasErrors: false,
          errors: [],
          isLoggedIn: true
        });
      }
    });
  }

  getToken = (value) => {
    if(value.includes('Bearer')) {
      value = value.split(' ')[1]
    }
    return value;
  }

  signInWithPPG = () => {
    this.props.history.push('/sign_in_ppg')
  }

  loadError = () => {
    this.setState({
      hasErrors: true,
      errors: ['username is incorrect']
    });
  }

  render() {
    const { classes } = this.props;
    const { email, password, rememberMe, hasErrors, errors, isLoggedIn, isLoading } = this.state;

    let ErrorComponent = <div>
      <Typography component="h6" variant="body1">
        Email or password are wrong. Please, try again.
        {errors.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </Typography>
    </div>

    if (isLoggedIn) return <Redirect to='/dashboard' />

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Img
              style={{
                width: '100%',
                cursor: 'pointer',
              }}
              alt="Pierpont Logistics"
              className={classes.logo}
              src={['/logos/Logo5a-Black.png']}
              loader={
                <div style={{ width: '165px', height: '40px', background: '#dedede' }} />
                }
            />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {
            hasErrors? ErrorComponent : null
          }
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input value={email} onChange={this.handleUserEmail} id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input value={password} onChange={this.handleUserPassword} name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={this.handleUserRemember} value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleOnSubmit}
            >
              Sign in { isLoading ? <CircularProgress style={{ marginLeft: '7px' }} size={20} color="#fff" /> : null }
            </Button>
            <div style={{ marginTop: '3px', marginBottom: '3px' }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.signInWithPPG}
              >
                Sign in with Pierpont Global
              </Button>
            </div>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(SignIn));