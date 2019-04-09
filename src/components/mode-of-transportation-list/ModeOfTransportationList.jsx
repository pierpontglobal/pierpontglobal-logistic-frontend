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
          <PPGTable rows={rows} columns={columns} />
          <PPGModal
            setOpen={openModalAdd}
            handleClose={this.onCloseModal}
            width="40%"
            height="30%"
          >
            <AddTransport handleAdd={this.createTransport} />
          </PPGModal>
        </BaseComponent>
      </>
    );
  }
}

export default withStyles(styles)(ModeOfTransportationList);
