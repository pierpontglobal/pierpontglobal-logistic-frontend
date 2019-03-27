import React, { Component } from 'react';
import CustomCard from '../card/CustomCard';
import styled from 'styled-components';
import BaseComponent from '../base-component/BaseComponent';

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
`;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Pierpont Logistics',
    };
  }

  handleClick = () => {
    alert('click handled');
  }

  render() {
    return (
      <>
        <BaseComponent cookies={this.props.cookies}>
          <CardsWrapper>
            <CustomCard title="Income" labelButton="View details" content="$ 120,000.00" handleClick={this.handleClick} />
            <CustomCard title="Expenses" labelButton="View details" content="$ 35,899.56" handleClick={this.handleClick} />
          </CardsWrapper>
        </BaseComponent>
      </>
    );
  }
}

export default Dashboard;
