import React, { Component } from "react";
import CustomCard from "../card/CustomCard";
import styled from "styled-components";
import BaseComponent from "../base-component/BaseComponent";
import PPGActivePie from "../charts/ppg-active-pie/PPGActivePie";
import PPGComposedBar from "../charts/ppg-compose-bar/PPGComposedBar";
import Paper from "@material-ui/core/Paper";
import numeral from "numeral";
import axios from "axios";
import { ApiServer } from "../../Defaults";

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
      ],
      cardsData: {
        income: 0,
        expense: 0,
        profit: 0,
        pcs: 0,
        weight: 0
      }
    };
  }

  componentDidMount = () => {
    // Get dashboard data
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.props.cookies.get("token", { path: "/" })}`;

    axios.get(`${ApiServer}/api/v1/dashboard`).then(data => {
      let response = data.data;
      let cardsData = {
        income: Number(response.total_income),
        expense: Number(response.total_expense),
        profit: Number(response.total_profit),
        pcs: Number(response.total_pieces),
        weight: Number(response.total_weight)
      };
      this.setState({
        cardsData: cardsData
      });
    });

    axios
      .get(`${ApiServer}/api/v1/dashboard/composed_chart?days=5`)
      .then(data => {
        let response = data.data;
        console.log(response);
        let chart_data = response.map(item => {
          return {
            name: item.label,
            uv: Number(item.total_income),
            pv: Number(item.total_expense),
            amt: Number(item.total_income) - Number(item.total_expense)
          };
        });
        this.setState({
          chartData: chart_data
        });
        console.log(chart_data);
      });
  };

  handleClick = () => {
    alert("click handled");
  };

  render() {
    const { pieChartData, cardsData, chartData } = this.state;
    return (
      <>
        <BaseComponent cookies={this.props.cookies}>
          <CardsWrapper
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <CustomCard
              title="Income"
              labelButton="View details"
              content={numeral(cardsData.income).format("$0.00")}
              handleClick={this.handleClick}
            />
            <CustomCard
              title="Expenses"
              labelButton="View details"
              content={numeral(cardsData.expense).format("$0.00")}
              handleClick={this.handleClick}
            />
            <CustomCard
              title="Profit"
              labelButton="View details"
              content={numeral(cardsData.profit).format("$0.00")}
              handleClick={this.handleClick}
            />
            <CustomCard
              title="PCs"
              labelButton="View details"
              content={`${cardsData.pcs} units`}
              handleClick={this.handleClick}
            />
            <CustomCard
              title="Weight"
              labelButton="View details"
              content={numeral(cardsData.weight).format("0.00") + "kg"}
              handleClick={this.handleClick}
            />
          </CardsWrapper>
          <ChartWrapper>
            <Paper style={{ margin: "5px", width: "60%" }}>
              <PPGComposedBar data={chartData} />
            </Paper>
          </ChartWrapper>
        </BaseComponent>
      </>
    );
  }
}

export default Dashboard;
