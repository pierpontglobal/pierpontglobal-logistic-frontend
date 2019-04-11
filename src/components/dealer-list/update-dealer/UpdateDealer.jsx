import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

class UpdateDealer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consignee_name: this.props.fetchedDealer.name,
      consignee_address: this.props.fetchedDealer.address
    };
  }

  handleChange = e => {
    let value = e.target.value;
    this.setState({
      [e.target.id]: value
    });
  };

  handleUpdate = () => {
    const { fetchedDealer } = this.props;
    this.props.handleUpdate({
      ...this.state,
      consignee_id: fetchedDealer.id
    });
  };

  handleDelete = () => {
    const { fetchedDealer } = this.props;
    this.props.handleDelete({
      ...this.state,
      consignee_id: fetchedDealer.id
    });
  };

  render() {
    const { fetchedDealer } = this.props;
    return (
      <>
        <div>
          <span style={{ fontWeight: "600" }}>Update / Delete Dealer</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            height: "100%",
            width: "100%",
            padding: "16px"
          }}
        >
          <div
            style={{
              padding: "8px",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ width: "100%" }}>
              <TextField
                id="consignee_name"
                label="Dealer name"
                margin="normal"
                onChange={this.handleChange}
                defaultValue={fetchedDealer.name}
              />
            </div>
            <div style={{ width: "100%" }}>
              <TextField
                id="consignee_address"
                label="Dealer Address"
                margin="normal"
                onChange={this.handleChange}
                defaultValue={fetchedDealer.address}
              />
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between"
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleDelete}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleUpdate}
            >
              Update
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default UpdateDealer;
