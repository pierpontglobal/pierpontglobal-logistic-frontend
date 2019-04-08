import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

class AddAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agent_name: "",
      agent_address: ""
    };
  }

  handleChange = e => {
    let value = e.target.value;
    this.setState({
      [e.target.id]: value
    });
  };

  handleAdd = () => {
    this.props.handleAdd(this.state);
  };

  render() {
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
              />
            </div>
            <div style={{ width: "100%" }}>
              <TextField
                id="agent_address"
                label="Agent Address"
                margin="normal"
                onChange={this.handleChange}
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
              onClick={this.handleAdd}
            >
              Create
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default AddAgent;
