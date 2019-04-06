import React, { Component } from 'react';
import PPGTable from '../../ppg-table/PPGTable';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import Button from '@material-ui/core/Button';
import PPGModal from '../../ppg-modal/PPGModal';
import AddCharges from './add-charges/AddCharges';
import axios from 'axios';
import { ApiServer } from '../../../Defaults';

const NOTIFICATION_TYPES = {
  ERROR: 'danger',
  SUCCESS: 'success'
};

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
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {},
  menuList: {
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

const incomeColumns = [
  {
    title: 'Service'
  },
  {
    title: 'Description'
  },
  {
    title: 'QTY'
  },
  {
    title: 'Unit'
  },
  {
    title: 'Rate'
  },
  {
    title: 'Amount'
  },
  {
    title: 'Currency'
  },
  {
    title: 'Payment'
  },
  {
    title: 'Profit'
  },
  {
    title: 'Bill to'
  }
];

const expensesColumns = [
  {
    title: 'Service'
  },
  {
    title: 'Description'
  },
  {
    title: 'QTY'
  },
  {
    title: 'Unit'
  },
  {
    title: 'Rate'
  },
  {
    title: 'Amount'
  },
  {
    title: 'Profit'
  },
  {
    title: 'Vendor'
  }
];

class ChargesOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incomeRows: [],
      expensesRows: [],
      onCloseChargesModal: false,
      charges: [],
      services: []
    };
  }

  addCharge = () => {
    this.setState({
      openModalAddCharges: true
    });
  };

  componentDidMount = () => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${this.props.cookies.get('token', { path: '/' })}`;

    axios.get(`${ApiServer}/api/v1/charge`).then(
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
        console.log('in charges option for service list > >> > >> > > ');
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
    if (!!charges) {
      let incomeCharges = charges.filter(c => c.custom_id === 1);
      let expenseCharges = charges.filter(c => c.custom_id === 2);

      incomeRows = incomeCharges.map(item => {
        return {
          id: item.id,
          content: [
            { text: item.name },
            { text: item.description },
            { text: item.quantity },
            { text: item.unit },
            { text: item.rate },
            { text: item.amount },
            { text: item.profit },
            { text: item.vendor }
          ]
        };
      });

      expenseRows = expenseCharges.map(item => {
        return {
          id: item.id,
          content: [
            { text: item.name },
            { text: item.description },
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

      this.setState({
        incomeRows: incomeRows,
        expenseRows: expenseRows
      });
    }
  };

  handleAddCharge = charge => {
    const { incomeRows, expensesRows, incomes, expenses } = this.state;
    const { shippId } = this.props;
    let expense = charge.expense;
    let income = charge.income;
    let service = charge.service;
    console.log(charge);
    if (!!charge) {
      console.log(charge);

      let chargesDto = [];

      if (!!income.amount && !!expense.amount) {
        chargesDto.push({
          description: income.description,
          quantity: income.quantity,
          unit: income.unit,
          rate: income.rate,
          profit: income.profit,
          bill_to_name: income.billToName,
          quantity_expense: income.quantityExpense,
          vendor: income.vendor,
          bill_to: income.billTo,
          amount: income.amount,
          currency: income.currency,
          payment: income.payment,
          shippment_id: shippId,
          service_id: service.serviceId,
          charge_type_id: 1
        });
        chargesDto.push({
          description: expense.description,
          quantity: expense.quantity,
          unit: expense.unit,
          rate: expense.rate,
          profit: expense.profit,
          bill_to_name: expense.billToName,
          quantity_expense: expense.quantityExpense,
          vendor: expense.vendor,
          bill_to: expense.billTo,
          amount: expense.amount,
          currency: expense.currency,
          payment: expense.payment,
          shippment_id: shippId,
          service_id: service.serviceId,
          charge_type_id: 2
        });
      } else if (!!income.amount && !expense.amount) {
        chargesDto.push({
          description: income.description,
          quantity: income.quantity,
          unit: income.unit,
          rate: income.rate,
          profit: income.profit,
          bill_to_name: income.billToName,
          quantity_expense: income.quantityExpense,
          vendor: income.vendor,
          bill_to: income.billTo,
          amount: income.amount,
          currency: income.currency,
          payment: income.payment,
          shippment_id: shippId,
          service_id: service.serviceId,
          charge_type_id: 1
        });
      } else {
        chargesDto.push({
          description: expense.description,
          quantity: expense.quantity,
          unit: expense.unit,
          rate: expense.rate,
          profit: expense.profit,
          bill_to_name: expense.billToName,
          quantity_expense: expense.quantityExpense,
          vendor: expense.vendor,
          bill_to: expense.billTo,
          amount: expense.amount,
          currency: expense.currency,
          payment: expense.payment,
          shippment_id: shippId,
          service_id: service.serviceId,
          charge_type_id: 2
        });
      }

      axios
        .post(`${ApiServer}/api/v1/charge`, {
          charges: chargesDto
        })
        .then(
          data => {
            console.log(data);
            this.props.addNotification(
              'Process completed',
              'Commodity added successfully!',
              2000,
              NOTIFICATION_TYPES.SUCCESS
            );
          },
          err => {
            this.props.addNotification(
              'Process interrupted',
              "Couldn't add commodity",
              2000,
              NOTIFICATION_TYPES.ERROR
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

  render() {
    const { classes } = this.props;
    const {
      openModalAddCharges,
      expensesRows,
      incomeRows,
      services
    } = this.state;
    return (
      <>
        <Paper style={{ marginBottom: '8px' }}>
          <TitleWrapper>
            <div style={{ margin: '10px', padding: '5px' }}>
              <span
                style={{
                  fontWeight: '600',
                  fontSize: '1.25rem',
                  color: 'darkgray',
                  padding: '10px'
                }}
              >
                Charges{' '}
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
        <TableWrapper>
          <PPGTable columns={incomeColumns} rows={incomeRows} />
        </TableWrapper>
        <TableWrapper>
          <PPGTable columns={expensesColumns} rows={expensesRows} />
        </TableWrapper>
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
      </>
    );
  }
}

export default withStyles(styles)(ChargesOption);
