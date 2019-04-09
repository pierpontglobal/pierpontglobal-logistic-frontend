import React, { Component } from "react";
import BaseComponent from "../base-component/BaseComponent";
import axios from "axios";
import { ApiServer } from "../../Defaults";
import PPGTable from "../ppg-table/PPGTable";
import { Paper, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PPGModal from "../ppg-modal/PPGModal";
import AddAgent from "./add-agent/AddAgent";
import { NOTIFICATION_TYPES } from "../../constants/NotificationTypes";

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
    title: "Address"
  }
];

class AgentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      openModalAdd: false
    };
  }

  componentDidMount = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.props.cookies.get("token", { path: "/" })}`;

    axios.get(`${ApiServer}/api/v1/agent`).then(data => {
      let response = data.data;
      if (!!response) {
        let mappedData = response.map(row => {
          let mappedRow = {
            id: row.id,
            content: [{ text: row.name }, { text: row.address }]
          };
          return mappedRow;
        });
        this.setState({
          rows: mappedData
        });
      }
    });
  };

  openModal = e => {
    this.setState({
      openModalAdd: true
    });
  };

  createAgent = e => {
    const { rows } = this.state;
    this.setState(
      {
        openModalAdd: false
      },
      () => {
        axios
          .post(`${ApiServer}/api/v1/agent`, {
            agent: {
              name: e.agent_name,
              address: e.agent_address
            }
          })
          .then(
            data => {
              let response = data.data;
              if (!!response) {
                console.log(response);
                rows.push({
                  id: response.id,
                  content: [{ text: response.name }, { text: response.address }]
                });
                this.setState(
                  {
                    isLoading: false,
                    rows: rows
                  },
                  () => {
                    this.props.addNotification(
                      "Process has completed",
                      "Agent was added successfully",
                      2000,
                      NOTIFICATION_TYPES.SUCCESS
                    );
                  }
                );
              } else {
                this.setState({
                  isLoading: false
                });
              }
            },
            err => {
              this.props.addNotification(
                "Process has completed",
                "We couldn't add your agent, try again later.",
                2000,
                NOTIFICATION_TYPES.ERROR
              );
            }
          );
      }
    );
  };

  onCloseChargesModal = () => {
    this.setState({
      openModalAdd: false
    });
  };

  render() {
    const { rows, openModalAdd } = this.state;
    const { classes } = this.props;
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
                Available Agents
              </span>
            </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.openModal}
            >
              Create Agent
            </Button>
          </div>
          <PPGTable rows={rows} columns={columns} />
          <PPGModal
            setOpen={openModalAdd}
            handleClose={this.onCloseChargesModal}
            width="40%"
            height="30%"
          >
            <AddAgent handleAdd={this.createAgent} />
          </PPGModal>
        </BaseComponent>
      </>
    );
  }
}

export default withStyles(styles)(AgentList);
