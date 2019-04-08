import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToApp from "@material-ui/icons/ExitToApp";
import ListAlt from "@material-ui/icons/ListAlt";
import DirectionsCar from "@material-ui/icons/DirectionsCar";
import People from "@material-ui/icons/People";
import DirectionsTransit from "@material-ui/icons/DirectionsTransit";
import Home from "@material-ui/icons/Home";
import LocalShipping from "@material-ui/icons/LocalShipping";
import { Link, NavLink } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import { withCookies } from "react-cookie";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: "white",
    color: "black"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    backgroundColor: "#D62020"
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: "#931616",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    backgroundColor: "#931616",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    backgroundColor: "white",
    ...theme.mixins.toolbar
  },
  content: {
    padding: "0px",
    width: "90%",
    margin: "0 auto",
    marginTop: "75px"
  },
  LogoutButtonIcon: {
    transform: "rotate(180deg)"
  }
});

class MiniDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleLogout = () => {
    this.setState(
      {
        open: false
      },
      () => {
        this.props.cookies.remove("token", { path: "/" });
        window.location.href = "/";
      }
    );
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open
            })}
          >
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                <span
                  style={{
                    fontWeight: "400",
                    background: "linear-gradient(left right, #5b0170, #6b0184)"
                  }}
                >
                  Pierpont Logistics
                </span>
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open
              })
            }}
            style={{ backgroundColor: "#2d034c" }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton
                style={{ color: "#2d034c" }}
                onClick={this.handleDrawerClose}
              >
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              <NavLink
                to="/dashboard"
                style={{ textDecoration: "none", color: "white" }}
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    {" "}
                    <Home style={{ fill: "#fff" }} />{" "}
                  </ListItemIcon>
                  <ListItemText
                    primary={<span style={{ color: "#fff" }}>Dashboard</span>}
                  />
                </ListItem>
              </NavLink>
              <NavLink
                to="/orders"
                style={{ textDecoration: "none" }}
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    {" "}
                    <ListAlt style={{ fill: "#fff" }} />{" "}
                  </ListItemIcon>
                  <ListItemText
                    primary={<span style={{ color: "#fff" }}>Orders</span>}
                  />
                </ListItem>
              </NavLink>
              <NavLink
                to="/shippers"
                style={{ textDecoration: "none" }}
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    {" "}
                    <LocalShipping style={{ fill: "#fff" }} />{" "}
                  </ListItemIcon>
                  <ListItemText
                    primary={<span style={{ color: "#fff" }}>Shippers</span>}
                  />
                </ListItem>
              </NavLink>
              <NavLink
                to="/Dealers"
                style={{ textDecoration: "none" }}
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    {" "}
                    <DirectionsCar style={{ fill: "#fff" }} />{" "}
                  </ListItemIcon>
                  <ListItemText
                    primary={<span style={{ color: "#fff" }}>Dealers</span>}
                  />
                </ListItem>
              </NavLink>
              <NavLink
                to="/agents"
                style={{ textDecoration: "none" }}
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    {" "}
                    <People style={{ fill: "#fff" }} />{" "}
                  </ListItemIcon>
                  <ListItemText
                    primary={<span style={{ color: "#fff" }}>Agents</span>}
                  />
                </ListItem>
              </NavLink>
              <NavLink
                to="/mode_of_transportations"
                style={{ textDecoration: "none" }}
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    {" "}
                    <DirectionsTransit style={{ fill: "#fff" }} />{" "}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <span style={{ color: "#fff" }}>Mode of transports</span>
                    }
                  />
                </ListItem>
              </NavLink>
            </List>
            <Divider style={{ backgroundColor: "#D62020" }} />
            <List>
              <ListItem button onClick={this.handleLogout}>
                <ListItemIcon>
                  {" "}
                  <ExitToApp
                    style={{ fill: "#fff" }}
                    className={classes.LogoutButtonIcon}
                  />{" "}
                </ListItemIcon>
                <ListItemText
                  primary={<span style={{ color: "#fff" }}>Logout</span>}
                />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div style={{ marginTop: "15px" }}>{this.props.children}</div>
            <div
              style={{
                position: "relative",
                width: "100%",
                marginTop: "25px",
                bottom: "5px",
                display: "flex",
                flexDirection: "row",
                padding: "5px",
                justifyContent: "center"
              }}
            >
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
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
