import React from 'react';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import withStyles from '@material-ui/core/styles/withStyles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ApiServer, PPGServer, APP_SERVER, PPG_SECRET_KEY, PPG_PUBLIC_KEY } from '../../Defaults';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router-dom';


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

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    const { email, password } = this.state;
    const { cookies } = this.props;
    this.setState({
      isLoading: true
    });
    axios.post(`${ApiServer}/signup`, {user: {email: email, password: password}} )
    .then(data => {
      if (!!data) {
        this.setState({
          isLoading: false,
          hasErrors: false,
          errors: [],
          isLoggedIn: true
        }, () => {
          this.props.history.push('/')
        });
      }
    }).catch(err => {
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { email, password, isLoading } = this.state;
    return(
      <>
        <div style={{ width: '100vh', height: '100vh',  display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '350px', height: 'auto' }}>
            <Paper style={{ padding: '15px' }}>
              <div style={{ marginBottom: '25px' }}>
                <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', fontWeight: '600', fontSize: '1.2rem' }}>
                  SignUp in Pierpont Logistics
                </span>
              </div>
              <div>
                <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input value={email} onChange={this.handleInputChange} id="email" name="email" autoComplete="email" autoFocus />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input value={password} onChange={this.handleInputChange} name="password" type="password" id="password" autoComplete="current-password" />
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.handleOnSubmit}
                  >
                    Sign up! { isLoading ? <CircularProgress style={{ marginLeft: '7px' }} size={20} color="#fff" /> : null }
                  </Button>
                </form>
              </div>
            </Paper>
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(SignUp));