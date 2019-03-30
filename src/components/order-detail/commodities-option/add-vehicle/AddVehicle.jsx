import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, IconButton } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  input: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  }
});

class AddVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findingCar: false,
      car: null,
      vin: '',
      carFound: false
    };
  }

  findCarByVin = () => {
    const { vin } = this.state;
    if (!!vin) {
      this.setState({
        findingCar: true
      });
      setTimeout(() => {
        this.setState({
          findingCar: false,
          car: {
            vin: this.state.vin
          },
          carFound: true
        });
      }, 3000);
    }
  };

  vinInput = e => {
    this.setState({
      vin: e.target.value
    });
  };

  addCarToShippment = () => {
    this.props.handleAdd(this.state.car);
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <div>
          <span style={{ fontWeight: '600' }}>Add vehicle</span>
        </div>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div
            style={{
              width: '45%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between'
            }}
          >
            <TextField
              autoFocus
              id="vin-number"
              label="VIN Number"
              className={classes.textField}
              margin="normal"
              disabled={this.state.findingCar}
              onChange={this.vinInput}
            />
            <div style={{ marginLeft: '7px' }}>
              {this.state.findingCar ? (
                <CircularProgress size={32} />
              ) : (
                <IconButton
                  disabled={this.state.findingCar}
                  onClick={this.findCarByVin}
                >
                  <i class="fas fa-search" />
                </IconButton>
              )}
            </div>
          </div>
          {this.state.car ? (
            <>
              <div style={{ width: '100%' }}>
                <div>
                  <span style={{ fontWeight: '600' }}>Car information</span>
                </div>
                <div>VIN: {this.state.car.vin}</div>
              </div>
            </>
          ) : null}
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <Button
                disabled={!this.state.carFound}
                onClick={this.addCarToShippment}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Add car
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(AddVehicle);
