import React, { Component } from "react";
import styled, { css } from "styled-components";

const StepWrapper = styled.div`
  width: 200px;
  height: 40px;
  position: relative;
  color: ${props => props.textColor};
  ${props =>
    !props.isActive &&
    css`
      background: linear-gradient(
        ${props.gradientStyle},
        ${props.startColor},
        ${props.endColor}
      );
      color: white;
    `};
  ${props =>
    props.isActive &&
    css`
      background: ${props => props.statusColor};
      color: black;
    `};
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
    border-left: 20px solid
      ${props => (!props.isActive ? props.endColor : props.statusColor)};
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
  }
`;

const ColorsInOrder = [
  {
    start: "#851414",
    end: "#9b1717",
    background: `background: linear-gradient(to right, #0b740b, #0f9b0f);`
  },
  {
    start: "#9b1717",
    end: "#b11b1b",
    background: `background: linear-gradient(to right, #0f9b0f, #10a210);`
  },
  {
    start: "#b11b1b",
    end: "#c81e1e",
    background: `background: linear-gradient(to right, #10a210, #12ba12);`
  },
  {
    start: "#c81e1e",
    end: "#de2121",
    background: `background: linear-gradient(to right, #12ba12, #15d115);`
  },
  {
    start: "#de2121",
    end: "#e13737",
    background: `background: linear-gradient(to right, #15d115, #17e817);`
  },
  {
    start: "#e13737",
    end: "#e44e4e",
    background: `background: linear-gradient(to right, #17e817, #2eea2e);`
  }
];

class ProgressStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeColor: "#2ECB57",
      inactiveColor: "#eee",
      steps: this.props.steps
    };
  }

  updateStatus = e => {
    // Considering First status options with index 0

    const selectedIndex = parseInt(e.target.id);
    const { steps } = this.state;
    for (let i = 0; i <= selectedIndex; i++) {
      steps[i].active = true;
    }
    for (let i = selectedIndex + 1; i < steps.length; i++) {
      steps[i].active = false;
    }
    this.setState({
      steps: steps
    });
  };

  render() {
    const { activeColor, inactiveColor, steps } = this.state;

    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        {steps.map((step, index) => (
          <StepWrapper
            key={index}
            statusColor={step.active ? activeColor : inactiveColor}
            textColor={step.active ? "white" : "black"}
            id={index}
            onClick={this.updateStatus}
            isActive={!step.active}
            backgroundGradient={ColorsInOrder[index].background}
            startColor={ColorsInOrder[index].start}
            endColor={ColorsInOrder[index].end}
            gradientStyle={"to right"}
          >
            {step.label}
          </StepWrapper>
        ))}
      </div>
    );
  }
}

export default ProgressStep;
