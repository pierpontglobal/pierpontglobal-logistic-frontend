import React, { useState } from "react";
import styled from "styled-components";
import posed from "react-pose";

const MaterialSelect = styled.div`
  border: solid white 1px;
  margin: 0 !important;
  padding: 4px 30px;
  font-weight: 100;
  cursor: pointer;
  transition: 0.4s;

  :hover {
    background: rgba(255, 255, 255, 0.3);
    transition: 0.4s;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class ButtonsSelect extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: 0
    };

    this.setClickedButtonId = this.setClickedButtonId.bind(this);
  }

  setClickedButtonId(id) {
    this.setState({
      selected: id
    });
  }

  render() {
    const { selected } = this.state;

    return (
      <ButtonGroup>
        <MaterialSelect
          key={1}
          style={{
            borderTopLeftRadius: "7px",
            borderBottomLeftRadius: "7px",
            borderRight: "none",
            background: selected === 1 ? "white" : "",
            color: selected === 1 ? "rgb(68, 39, 95)" : ""
          }}
          onClick={() => this.setClickedButtonId(1)}
        >
          SEA
        </MaterialSelect>
        <MaterialSelect
          style={{
            background: selected === 2 ? "white" : "",
            color: selected === 2 ? "rgb(68, 39, 95)" : ""
          }}
          key={2}
          onClick={() => this.setClickedButtonId(2)}
        >
          LAND
        </MaterialSelect>
        <MaterialSelect
          key={3}
          style={{
            borderTopRightRadius: "7px",
            borderBottomRightRadius: "7px",
            borderLeft: "none",
            background: selected === 3 ? "white" : "",
            color: selected === 3 ? "rgb(68, 39, 95)" : ""
          }}
          onClick={() => this.setClickedButtonId(3)}
        >
          AIR
        </MaterialSelect>
      </ButtonGroup>
    );
  }
}

export default ButtonsSelect;
