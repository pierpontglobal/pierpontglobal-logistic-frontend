import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ListAlt from '@material-ui/icons/ListAlt'
import DirectionsCar from '@material-ui/icons/DirectionsCar'
import Home from '@material-ui/icons/Home'
import LocalShipping from '@material-ui/icons/LocalShipping'
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    padding: '0px',
    width: '90%',
    margin: '0 auto',
  },
  LogoutButtonIcon: {
    transform: 'rotate(180deg)',
  },
});

class MiniDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleLogout = () => {
    this.setState({
      open: false
    }, () => {
      this.props.cookies.remove('token');
      window.location.href = '/';
    });
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open,
            })}
          >
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Pierpont Logistics
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              }),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <ListItem button>
                  <ListItemIcon> <Home /> </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              </Link>
              <Link to="/orders" style={{ textDecoration: 'none' }}>
                <ListItem button>
                  <ListItemIcon> <ListAlt /> </ListItemIcon>
                  <ListItemText primary="Order list" />
                </ListItem>
              </Link>
              <Link to="/shippers" style={{ textDecoration: 'none' }}>
                <ListItem button>
                  <ListItemIcon> <LocalShipping /> </ListItemIcon>
                  <ListItemText primary="Shippers" />
                </ListItem>
              </Link>
              <Link to="/Dealers" style={{ textDecoration: 'none' }}>
                <ListItem button>
                  <ListItemIcon> <DirectionsCar /> </ListItemIcon>
                  <ListItemText primary="Dealers" />
                </ListItem>
              </Link>
              <Link to="/invoices" style={{ textDecoration: 'none' }}>
                <ListItem button>
                  <ListItemIcon> <Icon><i class="fas fa-file-invoice"></i></Icon> </ListItemIcon>
                  <ListItemText primary="Invoices" />
                </ListItem>
              </Link>
            </List>
            <Divider />
            <List>
              <ListItem button onClick={this.handleLogout}>
                <ListItemIcon> <ExitToApp className={classes.LogoutButtonIcon}  /> </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div style={{ marginTop: '15px' }}>
              { this.props.children }
            </div>
            <div style={{ position: 'relative', width: '100%', marginTop: '25px', bottom: '5px', display: 'flex', flexDirection: 'row', padding: '5px' , justifyContent: 'center'}}>
              Pierpont Logistics. 2019 - All rights reserved.
            </div>
          </main>
        </div>
      </>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
