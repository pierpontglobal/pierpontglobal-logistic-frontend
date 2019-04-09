import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

class UpdateAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agent_name: this.props.fetchedAgent.name,
      agent_address: this.props.fetchedAgent.address
    };
  }

  handleChange = e => {
    let value = e.target.value;
    this.setState({
      [e.target.id]: value
    });
  };

  handleUpdate = () => {
    const { fetchedAgent } = this.props;
    this.props.handleUpdate({
      ...this.state,
      agent_id: fetchedAgent.id
    });
  };

  render() {
    const { fetchedAgent } = this.props;
    return (
      <>
        <div>
          <span style={{ fontWeight: "600" }}>Add Agent</span>
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
                id="agent_name"
                label="Agent name"
                margin="normal"
                onChange={this.handleChange}
                defaultValue={fetchedAgent.name}
              />
            </div>
            <div style={{ width: "100%" }}>
              <TextField
                id="agent_address"
                label="Agent Address"
                margin="normal"
                onChange={this.handleChange}
                defaultValue={fetchedAgent.address}
              />
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-end"
            }}
          >
            <Button
              variant="contained"
              color="secondary"
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

export default UpdateAgent;
