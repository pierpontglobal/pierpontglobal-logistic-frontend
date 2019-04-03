import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, IconButton } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { ApiServer } from '../../../../Defaults';

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

  componentDidMount = () => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${this.props.cookies.get('token', { path: '/' })}`;
  };

  findCarByVin = () => {
    const { vin } = this.state;
    if (!!vin) {
      this.setState(
        {
          findingCar: true
        },
        () => {
          axios.get(`${ApiServer}/api/v1/car/${vin}`).then(
            data => {
              console.log(data);
              let carFound = false;
              let carData = null;
              if (data.data.status !== 500) {
                carFound = true;
                carData = data.data.car_information;
              }
              this.setState({
                findingCar: false,
                car: carData,
                carFound: carFound
              });
            },
            err => {
              this.setState({
                findingCar: false,
                car: null,
                carFound: false
              });
            }
          );
        }
      );
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
              <div>
                <div
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ fontWeight: '600' }}>Car information</span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ width: '30%', margin: '7px' }}>
                      <div>VIN: {this.state.car.vin}</div>
                    </div>
                    <div style={{ width: '30%', margin: '7px' }}>
                      <div>Year: {this.state.car.year}</div>
                    </div>
                    <div style={{ width: '30%', margin: '7px' }}>
                      <div>Model: {this.state.car.car_model}</div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ width: '30%', margin: '7px' }}>
                      <div>Maker: {this.state.car.car_maker}</div>
                    </div>
                    <div style={{ width: '30%', margin: '7px' }}>
                      <div>Engine: {this.state.car.engine}</div>
                    </div>
                    <div style={{ width: '30%', margin: '7px' }}>
                      <div>Trim: {this.state.car.trim}</div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ width: '30%', margin: '7px' }}>
                      <div>Fuel: {this.state.car.car_fuel}</div>
                    </div>
                    <div style={{ width: '30%', margin: '7px' }}>
                      <div>Body style: {this.state.car.car_body_style}</div>
                    </div>
                    <div style={{ width: '30%', margin: '7px' }}>
                      <div>Type code: {this.state.car.car_type_code}</div>
                    </div>
                  </div>
                </div>
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
