import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Pierpont Logistics',
    };
  }

  render() {
    return (
      <div>
        { this.state.title }
      </div>
    );
  }
}

export default Dashboard;
