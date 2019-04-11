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
import AddDealer from "./add-dealer/AddDealer";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { NOTIFICATION_TYPES } from "../../constants/NotificationTypes";
import UpdateDealer from "./update-dealer/UpdateDealer";

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
class DealerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      openModalAdd: false,
      openModalUpdate: false
    };
  }

  addNotification = (title, message, duration, type) => {
    let obj = this.notificationDOMRef_info;
    if (type === NOTIFICATION_TYPES.SUCCESS)
      obj = this.notificationDOMRef_sucess;
    else if (type === NOTIFICATION_TYPES.ERROR)
      obj = this.notificationDOMRef_error;

    obj.current.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: duration },
      dismissable: { click: true }
    });
  };

  componentDidMount = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.props.cookies.get("token", { path: "/" })}`;

    axios.get(`${ApiServer}/api/v1/consignee`).then(data => {
      const rowData = data.data;
      if (!!rowData) {
        let mappedData = rowData.map(row => {
          let rowObj = {
            id: row.id,
            content: [{ text: row.name }, { text: row.address }]
          };
          return rowObj;
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

  createDealer = e => {
    const { rows } = this.state;
    this.setState(
      {
        openModalAdd: false
      },
      () => {
        axios
          .post(`${ApiServer}/api/v1/consignee`, {
            consignee: {
              name: e.dealer_name,
              address: e.dealer_address
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
                      "Dealer was added successfully",
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
                "We couldn't add your dealer, try again later.",
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
    axios.get(`${ApiServer}/api/v1/consignee/${rowId}`).then(data => {
      let response = data.data;
      console.log(response);
      this.setState({
        openModalUpdate: true,
        fetchedDealer: response
      });
    });
  };

  updateConsignee = consignee => {
    const { rows } = this.state;

    this.setState(
      {
        openModalUpdate: false
      },
      () => {
        axios
          .put(`${ApiServer}/api/v1/consignee?id=${consignee.consignee_id}`, {
            consignee: {
              name: consignee.consignee_name,
              address: consignee.consignee_address
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
                  "Dealer was updated successfully",
                  2000,
                  NOTIFICATION_TYPES.SUCCESS
                );
              }
            },
            err => {
              this.props.addNotification(
                "Process has completed",
                "We couldn't update the dealer, please contact your administrator.",
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

  deleteConsignee = consignee => {
    const { rows } = this.state;
    let modified_rows = [...rows];

    this.setState(
      {
        openModalUpdate: false
      },
      () => {
        axios
          .delete(`${ApiServer}/api/v1/consignee?id=${consignee.consignee_id}`)
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
                    "Consignee was deleted successfully",
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
                "Consignee couldn't be deleted",
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

  render() {
    const { rows, openModalAdd, fetchedDealer, openModalUpdate } = this.state;
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
                Available Dealers
              </span>
            </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.openModal}
            >
              Create Dealer
            </Button>
          </div>
          <PPGTable
            handleOnRowDoubleClick={this.openUpdateModal}
            rows={rows}
            columns={columns}
          />
          <PPGModal
            setOpen={openModalAdd}
            handleClose={() => this.onCloseModal("openModalUpdate")}
            width="40%"
            height="30%"
          >
            <AddDealer handleAdd={this.createDealer} />
          </PPGModal>
          <PPGModal
            setOpen={openModalUpdate}
            handleClose={() => this.onCloseModal("openModalUpdate")}
            width="45%"
            height="30%"
          >
            <UpdateDealer
              handleUpdate={this.updateConsignee}
              handleDelete={this.deleteConsignee}
              fetchedDealer={fetchedDealer}
            />
          </PPGModal>
        </BaseComponent>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(DealerList));
