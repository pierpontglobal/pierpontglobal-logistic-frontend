import React, { Component } from "react";
import CustomCard from "../card/CustomCard";
import styled from "styled-components";
import BaseComponent from "../base-component/BaseComponent";
import PPGActivePie from "../charts/ppg-active-pie/PPGActivePie";
import PPGComposedBar from "../charts/ppg-compose-bar/PPGComposedBar";
import Paper from "@material-ui/core/Paper";

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
`;

const ChartWrapper = styled.div`
  margin: 9px;
  padding: 12px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Pierpont Logistics",
      pieChartData: [
        { name: "Step #1", value: 400 },
        { name: "Step #2", value: 300 },
        { name: "Step #3", value: 300 }
      ]
    };
  }

  handleClick = () => {
    alert("click handled");
  };

  render() {
    const { pieChartData } = this.state;
    return (
      <>
        <BaseComponent cookies={this.props.cookies}>
          <CardsWrapper
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <CustomCard
              title="Income"
              labelButton="View details"
              content="$ 120,000.00"
              handleClick={this.handleClick}
            />
            <CustomCard
              title="Expenses"
              labelButton="View details"
              content="$ 35,899.56"
              handleClick={this.handleClick}
            />
            <CustomCard
              title="Profit"
              labelButton="View details"
              content="$ 55,980.00"
              handleClick={this.handleClick}
            />
            <CustomCard
              title="PCs"
              labelButton="View details"
              content="1,112 units"
              handleClick={this.handleClick}
            />
            <CustomCard
              title="Weight"
              labelButton="View details"
              content="766,989,897,98 kg"
              handleClick={this.handleClick}
            />
          </CardsWrapper>
          <ChartWrapper>
            <Paper style={{ margin: "5px", width: "60%" }}>
              <PPGComposedBar />
            </Paper>
          </ChartWrapper>
        </BaseComponent>
      </>
    );
  }
}

export default Dashboard;
