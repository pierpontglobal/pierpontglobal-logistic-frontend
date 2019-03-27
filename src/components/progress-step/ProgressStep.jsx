import React, { Component } from 'react';
import styled from 'styled-components';

const StepWrapper = styled.div`
  width: 200px;
  height: 40px;
  position: relative;
  background: ${props => props.statusColor};
  color: ${props => props.textColor};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 18px;
  border-radius: 50px 0px 0px 50px;
  &:before {
    content: "";
    position: absolute;
    right: -20px;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 20px solid ${props => props.statusColor};
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
  }
`;

class ProgressStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeColor: '#2ECB57',
      inactiveColor: '#eee',
      steps: [
        {
          label: 'Step 1',
          active: false,
        },
        {
          label: 'Step 2',
          active: false,
        },
        {
          label: 'Step 3',
          active: false,
        },
        {
          label: 'Step 4',
          active: false,
        },
        {
          label: 'Step 5',
          active: false
        },
        {
          label: 'Step 6',
          active: false
        }
      ]
    };
  }

  updateStatus = (e) => {
    // Considering First status options with index 0
    const selectedIndex = parseInt(e.target.id);
    const { steps } = this.state;
    for(let i = 0; i <= selectedIndex; i++) {
      steps[i].active = true;
    }
    for(let i = selectedIndex + 1; i < steps.length; i++) {
      steps[i].active = false;
    }
    this.setState({
      steps: steps
    });
  }

  render() {

    const { steps, activeColor, inactiveColor } = this.state;

    return(
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        {steps.map((step, index) => (
          <StepWrapper 
            key={index} 
            statusColor={step.active? activeColor : inactiveColor} 
            textColor={step.active? 'white' : 'black'}
            id={index}
            onClick={this.updateStatus}>
            { step.label }
          </StepWrapper>
        ))}
      </div>
    );
  }
}

export default ProgressStep;
