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
      openModalAdd: false
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

  onCloseModal = () => {
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
          <PPGTable rows={rows} columns={columns} />
          <PPGModal
            setOpen={openModalAdd}
            handleClose={this.onCloseModal}
            width="40%"
            height="30%"
          >
            <AddDealer handleAdd={this.createDealer} />
          </PPGModal>
        </BaseComponent>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(DealerList));
