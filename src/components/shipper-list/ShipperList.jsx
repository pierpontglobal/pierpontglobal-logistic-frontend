import React, { Component } from 'react';
import BaseComponent from '../base-component/BaseComponent';


class ShipperList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
   return(
      <>
        <BaseComponent cookies={this.props.cookies}>
          Shipper CRUD operations here...
        </BaseComponent>
      </>
   );
  }
}

export default ShipperList;
