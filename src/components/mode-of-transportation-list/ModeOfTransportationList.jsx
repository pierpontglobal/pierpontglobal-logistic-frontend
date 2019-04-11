import React, { Component } from "react";
import BaseComponent from "../base-component/BaseComponent";
import { Paper, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PPGTable from "../ppg-table/PPGTable";
import axios from "axios";
import { ApiServer } from "../../Defaults";
import { NOTIFICATION_TYPES } from "../../constants/NotificationTypes";
import AddTransport from "./add-transport/AddTransport";
import PPGModal from "../ppg-modal/PPGModal";
import UpdateTransport from "./update-transport/UpdateTransport";

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
    title: "Mode of transportation name"
  }
];

class ModeOfTransportationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      openModalAdd: false,
      openModalUpdate: false,
      name: ""
    };
  }

  componentDidMount = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.props.cookies.get("token", { path: "/" })}`;
    axios.get(`${ApiServer}/api/v1/mode_of_transportation`).then(data => {
      let response = data.data;
      if (!!response) {
        let mappedData = response.map(row => {
          let mappedRow = {
            id: row.id,
            content: [{ text: row.name }]
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

  createTransport = e => {
    const { rows } = this.state;
    this.setState(
      {
        openModalAdd: false
      },
      () => {
        axios
          .post(`${ApiServer}/api/v1/mode_of_transportation`, {
            mode_of_transportation: {
              name: e.transport_name
            }
          })
          .then(
            data => {
              let response = data.data;
              if (!!response) {
                rows.push({
                  id: response.id,
                  content: [{ text: response.name }]
                });
                this.setState(
                  {
                    isLoading: false,
                    rows: rows
                  },
                  () => {
                    this.props.addNotification(
                      "Process has completed",
                      "Mode of transport was added successfully",
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
                "We couldn't add your mode of transports, try again later.",
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

  updateTransport = transport => {
    const { rows } = this.state;

    this.setState(
      {
        openModalUpdate: false
      },
      () => {
        axios
          .put(
            `${ApiServer}/api/v1/mode_of_transportation?id=${
              transport.transport_id
            }`,
            {
              mode_of_transportation: {
                name: transport.transport_name
              }
            }
          )
          .then(
            data => {
              let response = data.data;
              if (!!response) {
                console.log(response);

                this.updateRowsWithModifiedData(response);

                this.props.addNotification(
                  "Process has completed",
                  "Transport mode was updated successfully",
                  2000,
                  NOTIFICATION_TYPES.SUCCESS
                );
              }
            },
            err => {
              this.props.addNotification(
                "Process has completed",
                "Couldn't update transport mode.",
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
        row.content = [{ text: entity.name }];
        break;
      }
    }

    this.setState({
      rows: rows
    });
  };

  deleteTransport = transport => {
    const { rows } = this.state;
    let modified_rows = [...rows];

    this.setState(
      {
        openModalUpdate: false
      },
      () => {
        axios
          .delete(
            `${ApiServer}/api/v1/mode_of_transportation?id=${
              transport.transport_id
            }`
          )
          .then(data => {
            let response = data.data;
            if (!!response) {
              modified_rows = modified_rows.filter(x => x.id !== response.id);
              this.setState(
                {
                  rows: modified_rows
                },
                () => {
                  this.props.addNotification(
                    "Success!",
                    "Mode of transport was deleted successfully",
                    2000,
                    NOTIFICATION_TYPES.SUCCESS
                  );
                }
              );
            }
          })
          .catch(err => {
            if (
              err &&
              err.response &&
              err.response.status &&
              err.response.status === 502
            ) {
              console.log(err.response);
              this.props.addNotification(
                "Transport mode couldn't be deleted",
                !!err.response.data.error
                  ? err.response.data.error
                  : "An error ocurred, please contact your administrator.",
                2000,
                NOTIFICATION_TYPES.ERROR
              );
            }
          });
      }
    );
  };

  openUpdateModal = (e, rowId) => {
    axios
      .get(`${ApiServer}/api/v1/mode_of_transportation/${rowId}`)
      .then(data => {
        let response = data.data;
        console.log(response);
        this.setState({
          openModalUpdate: true,
          fetchedTransport: response
        });
      });
  };

  render() {
    const {
      rows,
      openModalAdd,
      fetchedTransport,
      openModalUpdate
    } = this.state;
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
                Available mode of transportations
              </span>
            </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.openModal}
            >
              Create mode
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
            width="40%"
            height="30%"
          >
            <AddTransport handleAdd={this.createTransport} />
          </PPGModal>
          <PPGModal
            setOpen={openModalUpdate}
            handleClose={() => this.onCloseModal("openModalUpdate")}
            width="45%"
            height="30%"
          >
            <UpdateTransport
              handleUpdate={this.updateTransport}
              handleDelete={this.deleteTransport}
              fetchedTransport={fetchedTransport}
            />
          </PPGModal>
        </BaseComponent>
      </>
    );
  }
}

export default withStyles(styles)(ModeOfTransportationList);
