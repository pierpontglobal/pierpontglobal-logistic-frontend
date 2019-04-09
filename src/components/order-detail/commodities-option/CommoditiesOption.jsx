import React, { Component } from "react";
import PPGTable from "../../ppg-table/PPGTable";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import Button from "@material-ui/core/Button";
import PPGModal from "../../ppg-modal/PPGModal";
import TYPES from "../../../constants/CommodityTypes";
import AddCommodity from "./add-commodity/AddCommodity";
import axios from "axios";
import { ApiServer } from "../../../Defaults";
import createReactContext from "create-react-context";
import { NOTIFICATION_TYPES } from "../../../constants/NotificationTypes";

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 0px;
  align-items: center;
`;

const TableWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 15px;
  margin-top: 18px;
`;

const styles = theme => ({
  menuItem: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {},
  menuList: {
    display: "flex",
    flexDirection: "row"
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const containerColumns = [
  {
    title: "Reference"
  },
  {
    title: "Description"
  },
  {
    title: "Pieces"
  },
  {
    title: "Length"
  },
  {
    title: "Width"
  },
  {
    title: "Height"
  },
  {
    title: "Tare weight"
  },
  {
    title: "Next weight"
  },
  {
    title: "Total weigth"
  },
  {
    title: "Volume"
  },
  {
    title: "Vol weight"
  },
  {
    title: "Square Pt"
  }
];

const carColumns = [
  {
    title: "Vin"
  },
  {
    title: "Pieces"
  },
  {
    title: "Year"
  },
  {
    title: "Model"
  },
  {
    title: "Maker"
  },
  {
    title: "Engine"
  },
  {
    title: "Trim"
  },
  {
    title: "Fuel"
  },
  {
    title: "Body"
  },
  {
    title: "Type code"
  }
];

class CommoditiesOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerRows: [],
      carRows: [],
      openModalAddVehicle: false,
      openModalAddContainer: false,
      openToDeleteCarConfirmation: false,
      commodities: this.props.commodities,
      shippId: this.props.shippId
    };
  }

  componentDidMount = () => {
    // Setup axios
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.props.cookies.get("token", { path: "/" })}`;

    this.updateCommoditiesTables();
  };

  addVehicle = () => {
    this.setState({
      openModalAddVehicle: true
    });
  };

  onCloseVehicleModal = () => {
    this.setState({
      openModalAddVehicle: false
    });
  };

  addContainer = () => {
    this.setState({
      openModalAddContainer: true
    });
  };

  onCloseContainerMocal = () => {
    this.setState({
      openModalAddContainer: false
    });
  };

  onCloseConfirmationModal = () => {
    this.setState({
      openToDeleteCarConfirmation: false
    });
  };

  handleAddVehicle = e => {
    const { carRows } = this.state;
    const { orderId, commodities } = this.props;
    let commodities_arr = [...commodities];

    axios
      .post(`${ApiServer}/api/v1/commodity?order_number=${orderId}`, {
        commodity: {
          reference: e.vin,
          pieces: e.pieces,
          type: 1
        }
      })
      .then(
        data => {
          let artifact = data.data.artifact;
          let commodity = data.data.commodity;
          let e = artifact.car_information;
          commodities_arr.push({
            artifact: artifact,
            commodity: commodity
          });
          this.setState(
            {
              carRows: [
                ...carRows,
                {
                  id: commodity.id, // Commodity ID
                  content: [
                    { text: e.vin }, // Commodty artifact ID
                    { text: commodity.pieces },
                    { text: e.year },
                    { text: e.car_model },
                    { text: e.car_maker },
                    { text: e.engine },
                    { text: e.trim },
                    { text: e.car_fuel },
                    { text: e.car_body_style },
                    { text: e.car_type_code }
                  ]
                }
              ],
              openModalAddVehicle: false,
              commodities: commodities_arr
            },
            () => {
              // Propagate commodities array to Order Detail
              this.props.onCommoditiesChange(commodities_arr);
              // this.props.recalculateSummary();
              this.updateCommoditiesTables();
              this.props.addNotification(
                "Process completed",
                "Commodity added successfully!",
                2000,
                NOTIFICATION_TYPES.SUCCESS
              );
            }
          );
        },
        err => {
          this.props.addNotification(
            "Process interrupted",
            "Couldn't add commodity",
            2000,
            NOTIFICATION_TYPES.ERROR
          );
        }
      );
  };

  handleAddContainer = container => {
    const { containerRows } = this.state;
    const { orderId, commodities } = this.props;
    let commodities_arr = [...commodities];

    axios
      .post(`${ApiServer}/api/v1/commodity?order_number=${orderId}`, {
        commodity: {
          reference: container.id,
          pieces: container.pieces,
          type: 2
        }
      })
      .then(
        data => {
          let added_container = data.data.artifact;
          let commodity = data.data.commodity;
          commodities_arr.push({
            artifact: added_container,
            commodity: commodity
          });
          this.setState(
            {
              containerRows: [
                ...containerRows,
                {
                  id: commodity.id, /// Commodity ID
                  content: [
                    { text: added_container.id }, // Commodty artifact ID
                    { text: added_container.description },
                    { text: commodity.pieces },
                    { text: added_container.length },
                    { text: added_container.width },
                    { text: added_container.height },
                    { text: added_container.tare_weight },
                    { text: added_container.next_weight },
                    { text: added_container.total_weight },
                    { text: added_container.volume },
                    { text: added_container.vol_weigth },
                    { text: added_container.square_pt }
                  ]
                }
              ],
              openModalAddContainer: false,
              commodities: commodities_arr
            },
            () => {
              this.props.onCommoditiesChange(commodities_arr);
              // this.props.recalculateSummary();
              this.updateCommoditiesTables();
              this.props.addNotification(
                "Process completed",
                "Commodity added successfully!",
                2000,
                NOTIFICATION_TYPES.SUCCESS
              );
            }
          );
        },
        err => {
          this.props.addNotification(
            "Process interrupted",
            "Couldn't add commodity",
            2000,
            NOTIFICATION_TYPES.ERROR
          );
        }
      );
  };

  onDeleteCommodity = (e, rowId) => {
    this.setState({
      openToDeleteCarConfirmation: true,
      toDeleteCommodityId: rowId
    });
  };

  confirmedRemoveCommodity = () => {
    const {
      toDeleteCommodityId,
      carRows,
      containerRows,
      commodities,
      shippId
    } = this.state;

    let state_commodities = [...commodities];

    if (!!toDeleteCommodityId) {
      let commodity = commodities.find(
        x => x.commodity.id === toDeleteCommodityId
      );
      if (!!commodity) {
        axios
          .delete(
            `${ApiServer}/api/v1/commodity?reference=${toDeleteCommodityId}&shipp_id=${shippId}`
          )
          .then(
            data => {
              state_commodities = commodities.filter(
                c => c.commodity.id !== toDeleteCommodityId
              );
              this.setState(
                {
                  commodities: state_commodities,
                  openToDeleteCarConfirmation: false
                },
                () => {
                  this.props.onCommoditiesChange(state_commodities);
                  this.updateCommoditiesTables();
                  this.props.addNotification(
                    "Process completed",
                    "Commodity removed successfully!",
                    2000,
                    NOTIFICATION_TYPES.SUCCESS
                  );
                }
              );
            },
            err => {
              this.props.addNotification(
                "Process interrupted",
                "Couldn't remove associated commodity",
                2000,
                NOTIFICATION_TYPES.ERROR
              );
            }
          );
      }
    }
  };

  updateCommoditiesTables = () => {
    const { commodities } = this.state;
    let carRows = [];
    let containerRows = [];
    if (!!commodities) {
      let vehicleCommodities = commodities.filter(
        c => c.commodity.commodity_type_id === 1
      );
      let containerCommodities = commodities.filter(
        c => c.commodity.commodity_type_id === 2
      );

      carRows = vehicleCommodities.map(cdty => {
        let vehicle = cdty.artifact.car_information;
        return {
          id: cdty.commodity.id,
          content: [
            { text: vehicle.vin },
            { text: cdty.commodity.pieces },
            { text: vehicle.year },
            { text: vehicle.car_model },
            { text: vehicle.car_maker },
            { text: vehicle.engine },
            { text: vehicle.trim },
            { text: vehicle.car_fuel },
            { text: vehicle.car_body_style },
            { text: vehicle.car_type_code }
          ]
        };
      });

      containerRows = containerCommodities.map(cdty => {
        let container = cdty.artifact;
        return {
          id: cdty.commodity.id,
          content: [
            { text: container.id },
            { text: container.description },
            { text: cdty.commodity.pieces },
            { text: container.length },
            { text: container.width },
            { text: container.height },
            { text: container.tare_weight },
            { text: container.next_weight },
            { text: container.total_weight },
            { text: container.volume },
            { text: container.vol_weight },
            { text: container.square_pt }
          ]
        };
      });
      this.setState({
        carRows: carRows,
        containerRows: containerRows
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      carRows,
      containerRows,
      openModalAddVehicle,
      openModalAddContainer,
      containerCommodity,
      vehicleCommodity,
      openToDeleteCarConfirmation
    } = this.state;

    return (
      <>
        <Paper style={{ marginBottom: "8px" }}>
          <TitleWrapper>
            <div style={{ margin: "10px", padding: "5px" }}>
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "1.25rem",
                  color: "darkgray",
                  padding: "10px"
                }}
              >
                Commodities{" "}
              </span>
            </div>
            <div>
              <MenuList className={classes.menuList}>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={this.addVehicle}
                >
                  + Vehicle
                </Button>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={this.addContainer}
                >
                  + Container
                </Button>
              </MenuList>
            </div>
          </TitleWrapper>
        </Paper>
        {carRows.length > 0 ? (
          <TableWrapper>
            <div>
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "1.05rem",
                  color: "darkgray",
                  padding: "10px"
                }}
              >
                Vehicles{" "}
                <span style={{ fontStyle: "italic" }}>
                  (Double click to remove.)
                </span>
              </span>
            </div>
            <PPGTable
              columns={carColumns}
              rows={carRows}
              handleOnRowDoubleClick={this.onDeleteCommodity}
            />
          </TableWrapper>
        ) : null}
        {containerRows.length > 0 ? (
          <TableWrapper>
            <div>
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "1.05rem",
                  color: "darkgray",
                  padding: "10px"
                }}
              >
                Containers{" "}
                <span style={{ fontStyle: "italic" }}>
                  (Double click to remove.)
                </span>
              </span>
            </div>
            <PPGTable
              columns={containerColumns}
              rows={containerRows}
              handleOnRowDoubleClick={this.onDeleteCommodity}
            />
          </TableWrapper>
        ) : null}
        {carRows.length === 0 && containerRows.length === 0
          ? "No commodities has been added"
          : null}
        <PPGModal
          setOpen={openModalAddVehicle}
          handleClose={this.onCloseVehicleModal}
          width="765px"
          height="400px"
        >
          <AddCommodity
            handleAdd={this.handleAddVehicle}
            type={TYPES.VEHICLE}
            {...this.props}
          />
        </PPGModal>
        <PPGModal
          setOpen={openModalAddContainer}
          handleClose={this.onCloseContainerMocal}
          width="765px"
          height="400px"
        >
          <AddCommodity
            handleAdd={this.handleAddContainer}
            type={TYPES.CONTAINER}
            {...this.props}
          />
        </PPGModal>
        <PPGModal
          setOpen={openToDeleteCarConfirmation}
          handleClose={this.onCloseConfirmationModal}
          width="240px"
          height="80px"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px"
            }}
          >
            <div>
              <span style={{ fontWeight: "600", color: "darkgray" }}>
                Are you sure you want to remove this commodity?
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <Button onClick={this.onCloseConfirmationModal}>Cancel</Button>
              </div>
              <div>
                <Button onClick={this.confirmedRemoveCommodity}>Remove</Button>
              </div>
            </div>
          </div>
        </PPGModal>
      </>
    );
  }
}

export default withStyles(styles)(CommoditiesOption);
