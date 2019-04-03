import React, { Component } from 'react';
import PPGTable from '../../ppg-table/PPGTable';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import Button from '@material-ui/core/Button';
import PPGModal from '../../ppg-modal/PPGModal';
import AddCharges from './add-charges/AddCharges';

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
    title: 'Income'
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
      onCloseChargesModal: false
    };
  }

  addCharge = () => {
    this.setState({
      openModalAddCharges: true
    });
  };

  handleAddCharge = charge => {
    const { incomeRows, expensesRows } = this.state;
    console.log(charge);

    let service = charge.service;
    let income = charge.income;
    let expense = charge.expense;

    let rowId = `${Math.floor(Math.random() * 31) + 1}`;

    if (!!income.amount && !!income.payment) {
      incomeRows.push({
        id: `i-${rowId}`,
        content: [
          { text: service.serviceTypeName },
          { text: service.serviceTypeDescription },
          { text: income.quantity },
          { text: income.units },
          { text: income.rate },
          { text: income.amount },
          { text: income.currency },
          { text: income.payment },
          { text: income.profit },
          { text: income.billTo }
        ]
      });
    }

    if (!!expense.amount && !!expense.payment) {
      expensesRows.push({
        id: `e-${rowId}`,
        content: [
          { text: service.serviceTypeName },
          { text: service.serviceTypeDescription },
          { text: expense.quantity },
          { text: expense.units },
          { text: expense.rate },
          { text: expense.amount },
          { text: expense.currency },
          { text: expense.payment },
          { text: expense.profit },
          { text: expense.vendor }
        ]
      });
    }

    this.setState(
      {
        incomeRows: incomeRows,
        expensesRows: expensesRows,
        openModalAddCharges: false
      },
      () => {
        // Propagate event to parents
        this.props.handleChange(this.state);
      }
    );
  };

  onCloseChargesModal = () => {
    this.setState({
      openModalAddCharges: false
    });
  };

  render() {
    const { classes } = this.props;
    const { openModalAddCharges, expensesRows, incomeRows } = this.state;
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
          <AddCharges handleAdd={this.handleAddCharge} />
        </PPGModal>
      </>
    );
  }
}

export default withStyles(styles)(ChargesOption);
