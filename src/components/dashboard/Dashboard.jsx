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

const ChartTitle = styled.div`
  margin: 8px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: darkgray;
  font-weight: 600;
`;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Pierpont Logistics",
      cardsData: {
        income: 0,
        expense: 0,
        profit: 0,
        pcs: 0,
        weight: 0
      },
      days_ago_for_chart: 4 // Includes 0, so its really 5
    };
  }

  componentDidMount = () => {
    // Get dashboard data
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.props.cookies.get("token", { path: "/" })}`;

    const { days_ago_for_chart } = this.state;

    axios.get(`${ApiServer}/api/v1/dashboard`).then(data => {
      let response = data.data;
      if (!!response) {
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
      }
    });

    axios
      .get(
        `${ApiServer}/api/v1/dashboard/composed_chart?days=${days_ago_for_chart}`
      )
      .then(data => {
        let response = data.data;
        console.log(response);
        if (!!response) {
          let chart_data = response.map(item => {
            return {
              name: item.label,
              income: Number(item.total_income),
              expense: Number(item.total_expense),
              profit: Number(item.total_income) - Number(item.total_expense)
            };
          });
          this.setState({
            chartData: chart_data
          });
        }
      });
  };

  handleClick = () => {
    alert("click handled");
  };

  render() {
    const {
      pieChartData,
      cardsData,
      chartData,
      days_ago_for_chart
    } = this.state;
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
              <ChartTitle> Last {days_ago_for_chart + 1} days</ChartTitle>
              <PPGComposedBar data={chartData} />
            </Paper>
          </ChartWrapper>
        </BaseComponent>
      </>
    );
  }
}

export default Dashboard;
