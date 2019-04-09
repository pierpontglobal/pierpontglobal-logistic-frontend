import React, { Component } from "react";
import BaseComponent from "../base-component/BaseComponent";
import axios from "axios";
import { ApiServer } from "../../Defaults";
import PPGTable from "../ppg-table/PPGTable";
import { Paper, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PPGModal from "../ppg-modal/PPGModal";
import AddAgent from "./add-agent/AddAgent";
import UpdateAgent from "./update-agent/UpdateAgent";
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
      openModalAdd: false,
      openModalUpdate: false
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

  openModal = modal => {
    this.setState({
      [modal]: true
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

  onCloseModal = modal => {
    this.setState({
      [modal]: false
    });
  };

  openUpdateModal = (e, rowId) => {
    axios.get(`${ApiServer}/api/v1/agent/${rowId}`).then(data => {
      let response = data.data;
      console.log(response);
      this.setState({
        openModalUpdate: true,
        fetchedAgent: response
      });
    });
  };

  updateAgent = agent => {
    const { rows } = this.state;

    this.setState(
      {
        openModalUpdate: false
      },
      () => {
        axios
          .put(`${ApiServer}/api/v1/agent?id=${agent.agent_id}`, {
            agent: {
              name: agent.agent_name,
              address: agent.agent_address
            }
          })
          .then(
            data => {
              let response = data.data;
              if (!!response) {
                console.log(response);

                this.updateRowsWithModifiedData(response);

                this.props.addNotification(
                  "Process has completed",
                  "Agent was updated successfully",
                  2000,
                  NOTIFICATION_TYPES.SUCCESS
                );
              }
            },
            err => {
              this.props.addNotification(
                "Process has completed",
                err,
                2000,
                NOTIFICATION_TYPES.ERROR
              );
            }
          );
      }
    );
  };

  updateRowsWithModifiedData = entity => {
    const { rows } = this.state;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].id === entity.id) {
        let row = rows[i];
        row.content = [{ text: entity.name }, { text: entity.address }];
        break;
      }
    }

    this.setState({
      rows: rows
    });
  };

  render() {
    const { rows, openModalAdd, fetchedAgent, openModalUpdate } = this.state;
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
              onClick={() => this.openModal("openModalAdd")}
            >
              Create Agent
            </Button>
          </div>
          <PPGTable
            rows={rows}
            columns={columns}
            handleOnRowDoubleClick={this.openUpdateModal}
          />
          <PPGModal
            setOpen={openModalAdd}
            handleClose={() => this.onCloseModal("openModalAdd")}
            width="50%"
            height="30%"
          >
            <AddAgent handleAdd={this.createAgent} />
          </PPGModal>
          <PPGModal
            setOpen={openModalUpdate}
            handleClose={() => this.onCloseModal("openModalUpdate")}
            width="50%"
            height="30%"
          >
            <UpdateAgent
              handleUpdate={this.updateAgent}
              fetchedAgent={fetchedAgent}
            />
          </PPGModal>
        </BaseComponent>
      </>
    );
  }
}

export default withStyles(styles)(AgentList);
