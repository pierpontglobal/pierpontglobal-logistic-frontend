import React, { Component } from "react";
import PPGTable from "../../ppg-table/PPGTable";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import Button from "@material-ui/core/Button";
import PPGModal from "../../ppg-modal/PPGModal";
import AddCharges from "./add-charges/AddCharges";
import axios from "axios";
import { ApiServer } from "../../../Defaults";
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

const incomeColumns = [
  {
    title: "Service"
  },
  {
    title: "QTY"
  },
  {
    title: "Unit"
  },
  {
    title: "Rate"
  },
  {
    title: "Amount"
  },
  {
    title: "Currency"
  },
  {
    title: "Payment"
  },
  {
    title: "Profit"
  },
  {
    title: "Bill to"
  }
];

const expensesColumns = [
  {
    title: "Service"
  },
  {
    title: "QTY"
  },
  {
    title: "Unit"
  },
  {
    title: "Rate"
  },
  {
    title: "Amount"
  },
  {
    title: "Vendor"
  }
];

class ChargesOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incomeRows: [],
      expenseRows: [],
      onCloseChargesModal: false,
      charges: [],
      services: [],
      openToDeleteChargeConfirmation: false,
      toDeleteChargeId: -1
    };
  }

  addCharge = () => {
    this.setState({
      openModalAddCharges: true
    });
  };

  componentDidMount = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.props.cookies.get("token", { path: "/" })}`;

    const { shippId } = this.props;

    axios.get(`${ApiServer}/api/v1/charge?shipp_id=${shippId}`).then(
      data => {
        let charges = data.data.charges;

        this.setState(
          {
            charges: charges
          },
          () => {
            this.updateChargesTables();
          }
        );
      },
      err => {}
    );

    axios.get(`${ApiServer}/api/v1/service`).then(
      data => {
        console.log("in charges option for service list > >> > >> > > ");
        console.log(data);
        if (!!data && !!data.data) {
          let services = data.data.map(item => ({
            value: item.id,
            label: item.name
          }));
          console.log(data);
          this.setState({
            services: services
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  };

  updateChargesTables = () => {
    const { charges } = this.state;
    let incomeRows = [];
    let expenseRows = [];
    console.log("will update rows >>>>>>>>>>>>>>>>> ");
    console.log(charges);
    if (!!charges) {
      let incomeCharges = charges.filter(c => c.custom_id === 1);
      let expenseCharges = charges.filter(c => c.custom_id === 2);

      incomeRows = incomeCharges.map(item => {
        return {
          id: item.charge_id,
          content: [
            { text: item.name },
            { text: item.quantity },
            { text: item.unit },
            { text: item.rate },
            { text: item.amount },
            { text: item.currency },
            { text: item.payment },
            { text: item.profit },
            { text: item.bill_to }
          ]
        };
      });

      expenseRows = expenseCharges.map(item => {
        return {
          id: item.charge_id,
          content: [
            { text: item.name },
            { text: item.quantity },
            { text: item.unit },
            { text: item.rate },
            { text: item.amount },
            { text: item.vendor }
          ]
        };
      });

      this.setState({
        incomeRows: incomeRows,
        expenseRows: expenseRows
      });
    }
  };

  handleAddCharge = charge => {
    const { incomeRows, expenseRows, incomes, expenses, charges } = this.state;
    const { shippId } = this.props;
    let expense = charge.expense;
    let income = charge.income;
    let service = charge.service;
    console.log(charge);
    if (!!charge) {
      console.log("TO ADD CHARGE AJAJAJA");
      console.log(charge);

      console.log(expense);
      console.log(income);

      let dto = {};

      if (!!expense && !!expense.amount) {
        dto["expense"] = {
          ...expense,
          unit: expense.units,
          shippment_id: shippId,
          service_id: service.serviceId
        };
      }
      if (!!income && income.amount) {
        dto["income"] = {
          ...income,
          bill_to: income.billTo,
          bill_to_name: income.billToName,
          unit: income.units,
          shippment_id: shippId,
          service_id: service.serviceId
        };
      }

      axios.post(`${ApiServer}/api/v1/charge`, dto).then(
        data => {
          console.log(data);
          let response_charges = data.data.charges.map(charge => {
            let obj = { ...charge };
            obj["charge_id"] = obj.id;
            return obj;
          });
          let override_charges = [...charges].concat(response_charges);
          console.log(">>> >>>> >>>> >>>>");
          console.log(charges);
          console.log(override_charges);
          this.setState(
            {
              openModalAddCharges: false,
              charges: override_charges
            },
            () => {
              this.props.addNotification(
                "Process completed",
                "Charge added successfully!",
                2000,
                NOTIFICATION_TYPES.SUCCESS
              );
              this.updateChargesTables();
              this.props.handleChange(override_charges);
            }
          );
        },
        err => {
          this.setState(
            {
              openModalAddCharges: false
            },
            () => {
              this.props.addNotification(
                "Process interrupted",
                "Couldn't add charge",
                2000,
                NOTIFICATION_TYPES.ERROR
              );
            }
          );
        }
      );
    }
  };

  onCloseChargesModal = () => {
    this.setState({
      openModalAddCharges: false
    });
  };

  onCloseConfirmDialog = () => {
    this.setState({
      openToDeleteChargeConfirmation: false
    });
  };

  onDeleteCharge = (e, rowId) => {
    console.log(rowId);
    this.setState({
      openToDeleteChargeConfirmation: true,
      toDeleteChargeId: rowId
    });
  };

  confirmedRemoveCharge = () => {
    console.log("will enter remove charge");
    const {
      toDeleteChargeId,
      carRows,
      containerRows,
      commodities,
      charges
    } = this.state;
    const { shippId } = this.props;

    console.log(this.state);

    let state_charges = [...charges];
    console.log(charges);

    if (!!toDeleteChargeId) {
      let charge = charges.find(x => x.charge_id === toDeleteChargeId);
      console.log(charge);
      if (!!charge) {
        axios
          .delete(
            `${ApiServer}/api/v1/charge?charge_id=${toDeleteChargeId}&shipp_id=${shippId}`
          )
          .then(
            data => {
              state_charges = charges.filter(
                c => c.charge_id !== toDeleteChargeId
              );
              this.updateChargesTables();
              this.setState(
                {
                  charges: state_charges,
                  openToDeleteChargeConfirmation: false
                },
                () => {
                  this.updateChargesTables();
                  this.props.handleChange(state_charges);
                  this.props.addNotification(
                    "Process completed",
                    "Charge removed successfully!",
                    2000,
                    NOTIFICATION_TYPES.SUCCESS
                  );
                }
              );
            },
            err => {
              this.props.addNotification(
                "Process interrupted",
                "Couldn't remove associated charge",
                2000,
                NOTIFICATION_TYPES.ERROR
              );
            }
          );
      }
    }
  };

  render() {
    const { classes } = this.props;
    const {
      openModalAddCharges,
      expenseRows,
      incomeRows,
      services,
      openToDeleteChargeConfirmation
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
                Charges{" "}
              </span>
            </div>
            <div>
              <MenuList className={classes.menuList}>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={this.addCharge}
                >
                  + Charge
                </Button>
              </MenuList>
            </div>
          </TitleWrapper>
        </Paper>
        {incomeRows.length > 0 ? (
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
                Incomes{" "}
                <span style={{ fontStyle: "italic" }}>
                  (Double click to remove.)
                </span>
              </span>
            </div>
            <PPGTable
              columns={incomeColumns}
              rows={incomeRows}
              handleOnRowDoubleClick={this.onDeleteCharge}
            />
          </TableWrapper>
        ) : null}
        {expenseRows.length > 0 ? (
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
                Expenses{" "}
                <span style={{ fontStyle: "italic" }}>
                  (Double click to remove.)
                </span>
              </span>
            </div>
            <PPGTable
              columns={expensesColumns}
              rows={expenseRows}
              handleOnRowDoubleClick={this.onDeleteCharge}
            />
          </TableWrapper>
        ) : null}
        {incomeRows.length === 0 && expenseRows.length === 0
          ? "No charges has been added"
          : null}
        <PPGModal
          setOpen={openModalAddCharges}
          handleClose={this.onCloseChargesModal}
          width="80%"
          height="80%"
        >
          <AddCharges
            services={services}
            cookies={this.props.cookie}
            handleAdd={this.handleAddCharge}
          />
        </PPGModal>
        <PPGModal
          setOpen={openToDeleteChargeConfirmation}
          handleClose={this.onCloseConfirmDialog}
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
                Are you sure you want to remove this charge?
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
                <Button onClick={this.onCloseConfirmDialog}>Cancel</Button>
              </div>
              <div>
                <Button onClick={this.confirmedRemoveCharge}>Remove</Button>
              </div>
            </div>
          </div>
        </PPGModal>
      </>
    );
  }
}

export default withStyles(styles)(ChargesOption);
