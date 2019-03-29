import React, { Component } from 'react';
import BaseComponent from '../base-component/BaseComponent';

class InvoiceList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <>
        <BaseComponent cookies={this.props.cookies}>
          Invoice CRUD operations here...
        </BaseComponent>
      </>
    );
  }
}

export default InvoiceList;