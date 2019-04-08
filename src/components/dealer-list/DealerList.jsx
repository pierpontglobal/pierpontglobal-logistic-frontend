import React, { Component } from "react";
import BaseComponent from "../base-component/BaseComponent";
import PPGTable from "../ppg-table/PPGTable";
import { withRouter } from "react-router-dom";
import PPGModal from "../ppg-modal/PPGModal";
import { Paper, Button } from "@material-ui/core";
import axios from "axios";
import { ApiServer } from "../../Defaults";
import { withCookies } from "react-cookie";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const columns = [
  {
    title: "Name"
  },
  {
    title: "Latitude"
  },
  {
    title: "Longitude"
  },
  {
    title: "Phone number"
  },
  {
    title: "Country"
  },
  {
    title: "City"
  }
];
class DealerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }

  componentDidMount = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.props.cookies.get("token", { path: "/" })}`;

    // DEALERS FROM PierPont Global already registered should be retrieved here.
    const examples = [
      {
        id: 1,
        name: "Dealer example",
        latitude: 56.89,
        longitude: 78.98,
        user_id: 2,
        phone_number: "8098675678",
        country: "Sample country dealer",
        city: "Sample city dealer",
        address1: "Address 1 sample dealer",
        address2: "Address 2 sample dealer"
      }
    ];
    axios.get(`${ApiServer}/api/v1/consignee`).then(data => {
      const rowData = data.data;
      let mappedData = rowData.map(row => {
        let rowObj = {
          id: row.id,
          content: [
            { text: row.name },
            { text: row.latitude },
            { text: row.longitude },
            { text: row.phone_number },
            { text: row.country },
            { text: row.city }
          ]
        };
        return rowObj;
      });
      this.setState({
        rows: mappedData
      });
    });
  };

  render() {
    const { rows } = this.state;
    return (
      <>
        <BaseComponent cookies={this.props.cookies}>
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
                Available Dealers
              </span>
            </div>
          </div>
          <PPGTable rows={rows} columns={columns} />
        </BaseComponent>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(DealerList));
