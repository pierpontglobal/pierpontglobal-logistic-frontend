import React, { Component } from "react";
import BaseComponent from "../base-component/BaseComponent";
import PPGTable from "../ppg-table/PPGTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import { withRouter } from "react-router-dom";
import PPGTableEnhanced from "../ppg-table-enhanced/PPGTableEnhanced";
import axios from "axios";
import { ApiServer } from "../../Defaults";

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const columns = [
  {
    title: "",
    isIcon: true
  },
  {
    title: "Number"
  },
  {
    title: "Origin"
  },
  {
    title: "Destination"
  },
  {
    title: "Service type"
  }
];

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      rows: []
    };
  }

  componentDidMount = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.props.cookies.get("token", { path: "/" })}`;

    axios.get(`${ApiServer}/api/v1/order`).then(data => {
      const obj = data.data;

      const rowData = obj.orders_with_shipp.concat(obj.orders_without_shipp);
      let mappedData = rowData.map(row => {
        let rowObj = {
          id: row.order_number,
          content: [
            { isIcon: true, icon: <RemoveRedEye /> },
            { text: row.order_number },
            { text: row.origin_name },
            { text: row.destination_name },
            { text: row.service_type }
          ]
        };
        return rowObj;
      });
      this.setState({
        rows: mappedData,
        isLoading: false
      });
    });
  };

  onRowClick = (e, rowId) => {
    // Got to detail page of selected order
    this.props.history.push(`order/${rowId}`);
  };

  render() {
    const { isLoading, rows } = this.state;
    return (
      <>
        <BaseComponent cookies={this.props.cookies}>
          {isLoading ? (
            <LoadingWrapper>
              {" "}
              <CircularProgress />{" "}
            </LoadingWrapper>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "space-between",
                  justifyContent: "space-between"
                }}
              >
                <div style={{ marginTop: "15px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                    Orders
                  </span>
                </div>
              </div>
              {/*<PPGTable handleOnRowClick={this.onRowClick} columns={columns} rows={rows} />*/}
              <PPGTable
                columns={columns}
                rows={rows}
                handleOnRowClick={this.onRowClick}
              />
            </>
          )}
        </BaseComponent>
      </>
    );
  }
}

export default withRouter(OrderList);
