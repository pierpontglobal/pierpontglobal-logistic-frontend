import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

class UpdateTransport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transport_name: this.props.fetchedTransport.name
    };
  }

  handleChange = e => {
    let value = e.target.value;
    this.setState({
      [e.target.id]: value
    });
  };

  handleUpdate = () => {
    const { fetchedTransport } = this.props;
    this.props.handleUpdate({
      ...this.state,
      transport_id: fetchedTransport.id
    });
  };

  handleDelete = () => {
    const { fetchedTransport } = this.props;
    this.props.handleDelete({
      ...this.state,
      transport_id: fetchedTransport.id
    });
  };

  render() {
    const { fetchedTransport } = this.props;
    return (
      <>
        <div>
          <span style={{ fontWeight: "600" }}>
            Update / Delete Transportation mode
          </span>
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
                id="transport_name"
                label="Transport name"
                margin="normal"
                onChange={this.handleChange}
                defaultValue={fetchedTransport.name}
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

export default UpdateTransport;
