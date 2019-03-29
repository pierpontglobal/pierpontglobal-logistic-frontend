import React, { Component } from 'react';
import BaseComponent from '../base-component/BaseComponent';


class DealerList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <>
        <BaseComponent cookies={this.props.cookies}>
          Dealer CRUD operations here...
        </BaseComponent>
      </>
    );
  }
}

export default DealerList;