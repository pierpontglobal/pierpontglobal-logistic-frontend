import React, { Component } from 'react';
import TYPES from '../../../../constants/CommodityTypes';
import AddVehicle from '../add-vehicle/AddVehicle';
import AddContainer from '../add-container/AddContainer';

class AddCommodity extends Component {
  constructor(props) {
    super(props);
  }

  handleAddCommodity = e => {
    this.props.handleAdd(e);
  };

  render() {
    let component = null;
    if (this.props.type === TYPES.VEHICLE) {
      component = (
        <AddVehicle handleAdd={this.handleAddCommodity} {...this.props} />
      );
    } else if (this.props.type === TYPES.CONTAINER) {
      component = (
        <AddContainer handleAdd={this.handleAddCommodity} {...this.props} />
      );
    }
    return component;
  }
}

export default AddCommodity;
