import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, IconButton } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
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
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 140
  }
});

class AddContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerFound: false,
      types: [],
      isLoading: false,
      container: {
        containerType: '',
        length: '',
        width: '',
        height: '',
        tareWeight: '',
        nextWeight: '',
        totalWeight: '',
        volumne: '',
        volWeigth: '',
        squarePt: '',
        pieces: 1
      }
    };
  }

  componentDidMount = () => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${this.props.cookies.get('token', { path: '/' })}`;
    axios.get(`${ApiServer}/api/v1/container`).then(data => {
      let containers = data.data;
      this.setState({
        types: containers.map(item => {
          return {
            label: item.description,
            id: item.id,
            length: item.length,
            width: item.width,
            height: item.height,
            tareWeight: item.tare_weight,
            nextWeight: item.next_weight,
            totalWeight: item.total_weight,
            volumne: item.volume,
            volWeigth: item.vol_weight,
            squarePt: item.square_pt
          };
        })
      });
    });
  };

  handleChange = event => {
    // Get container type info
    console.log(event);
    let containerId = event.target.value;
    this.setState(
      {
        isLoading: true
      },
      () => {
        axios.get(`${ApiServer}/api/v1/container/${containerId}`).then(
          data => {
            let container = data.data;
            console.log(data.data);
            const obj = {
              id: containerId,
              width: container.width,
              height: container.height,
              length: container.length,
              tareWeight: container.tare_weight,
              nextWeight: container.next_weight,
              totalWeight: container.total_weight,
              volumne: container.volume,
              volWeigth: container.vol_weight,
              squarePt: container.square_pt,
              containerType: container.description
            };
            this.setState({
              isLoading: false,
              container: obj,
              containerFound: true
            });
          },
          err => {
            this.setState({
              isLoading: false,
              containerFound: false
            });
          }
        );
      }
    );
  };

  addContainerToShippment = () => {
    this.props.handleAdd(this.state.container);
  };

  handleChangePieces = e => {
    const { container } = this.state;
    container.pieces = e.target.value;
    this.setState({
      container: container
    });
  };

  render() {
    const { classes } = this.props;
    const { types, container, containerFound } = this.state;
    return (
      <>
        <div>
          <span style={{ fontWeight: '600' }}>Add Container</span>
        </div>
        <div
          style={{
            marginTop: '17px',
            display: 'flex',
            flexDirection: 'column',
            width: '50%'
          }}
        >
          <div style={{ width: '80%' }}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Container type</InputLabel>
              <Select
                value={this.state.container.containerType}
                onChange={this.handleChange}
                inputProps={{
                  name: 'containerType',
                  id: 'containerType'
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {types.map(item => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                disabled={true}
                id="length"
                label="Length"
                className={classes.textField}
                margin="normal"
                value={container.length}
                style={{ width: '100px' }}
              />
              <TextField
                disabled={true}
                id="width"
                label="Width"
                className={classes.textField}
                margin="normal"
                value={container.width}
                style={{ width: '100px' }}
              />
              <TextField
                disabled={true}
                id="height"
                label="Height"
                className={classes.textField}
                margin="normal"
                value={container.height}
                style={{ width: '100px' }}
              />
              <TextField
                disabled={true}
                id="tareWeight"
                label="tareWeight"
                className={classes.textField}
                margin="normal"
                value={container.tareWeight}
                style={{ width: '100px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                disabled={true}
                id="nextWeight"
                label="nextWeight"
                className={classes.textField}
                margin="normal"
                value={container.nextWeight}
                style={{ width: '100px' }}
              />
              <TextField
                disabled={true}
                id="totalWeight"
                label="totalWeight"
                className={classes.textField}
                margin="normal"
                value={container.totalWeight}
                style={{ width: '100px' }}
              />
              <TextField
                disabled={true}
                id="volumne"
                label="volumne"
                className={classes.textField}
                margin="normal"
                value={container.volumne}
                style={{ width: '100px' }}
              />
              <TextField
                disabled={true}
                id="volWeigth"
                label="volWeigth"
                className={classes.textField}
                margin="normal"
                value={container.volWeigth}
                style={{ width: '100px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                disabled={true}
                id="squarePt"
                label="squarePt"
                className={classes.textField}
                margin="normal"
                value={container.squarePt}
                style={{ width: '100px' }}
              />
              <TextField
                disabled={!containerFound}
                id="pieces"
                label="Pieces"
                className={classes.textField}
                margin="normal"
                type="number"
                value={container.pieces}
                defaultValue={container.pieces}
                onChange={this.handleChangePieces}
                style={{ width: '100px' }}
              />
            </div>
          </div>
        </div>
        <div width={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <Button
              disabled={!this.state.containerFound}
              onClick={this.addContainerToShippment}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Add container
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(AddContainer);
