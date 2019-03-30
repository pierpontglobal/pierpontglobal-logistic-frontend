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
  flex-direction: row;
  justify-content: center;
  align-items: center;
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

const columns = [
  {
    title: 'Status'
  },
  {
    title: 'Code'
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
    title: 'Bill to'
  },
  {
    title: 'Invoice'
  },
  {
    title: 'QTY Expense'
  }
];

class ChargesOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        {
          id: 1,
          content: [
            { text: 'Pending' },
            { text: 'Off' },
            { text: 'OCEAN FREIGHT' },
            { text: '101' },
            { text: 'Each' },
            { text: '15.00' },
            { text: '1515.00 USD' },
            { text: '909.00 USD' },
            { text: 'PierPont Global' },
            { text: '' },
            { text: '0' }
          ]
        }
      ],
      onCloseChargesModal: false
    };
  }

  addCharge = () => {
    this.setState({
      openModalAddCharges: true
    });
  };

  handleAddCharge = e => {
    const { rows } = this.state;
    console.log(e);
    this.setState(
      {
        rows: [
          ...rows,
          {
            id: 2,
            content: [
              { text: 'Pending' },
              { text: 'Off' },
              { text: 'OCEAN FREIGHT' },
              { text: '101' },
              { text: 'Each' },
              { text: '15.00' },
              { text: '1515.00 USD' },
              { text: '909.00 USD' },
              { text: 'PierPont Global' },
              { text: '' },
              { text: '0' }
            ]
          }
        ],
        openModalAddCharges: false
      },
      () => {
        // Propagate event to parents
        this.props.handleChange(this.state.rows);
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
    const { rows, openModalAddCharges } = this.state;
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
          <PPGTable columns={columns} rows={rows} />
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
