import React, { Component } from "react";
import styled from "styled-components";

const FilterPanelWrapper = styled.div`
  width: 100%;
  padding: 16px;
  margin: 8px 0px;
  background: #efefef;
  border-radius: 16px;
`;

class PPGFilterPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <FilterPanelWrapper>Filter options here...</FilterPanelWrapper>
      </>
    );
  }
}

export default PPGFilterPanel;
