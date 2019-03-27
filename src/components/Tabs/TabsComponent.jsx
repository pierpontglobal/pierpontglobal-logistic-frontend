import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    width: '100%',
  },
});

class TabsComponent extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme, options, withBackground } = this.props;

    return (
      <div className={classes.root}>
        {withBackground ? 
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              {options.map((tab, index) => (
                  <Tab key={index} label={tab.label} icon={tab.icon ? tab.icon : null} />
              ))}
            </Tabs>
          </AppBar> :
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            {options.map((tab, index) => (
                <Tab key={index} label={tab.label} icon={tab.icon ? tab.icon : null} />
            ))}
        </Tabs>
        }
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
            {options.map((tab, index) => (
                <TabContainer key={index} dir={theme.direction}>
                    { tab.item }
                </TabContainer>
            ))}
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TabsComponent);