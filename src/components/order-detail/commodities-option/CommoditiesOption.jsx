import React, { Component } from 'react';
import PPGTable from '../../ppg-table/PPGTable';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import Button from '@material-ui/core/Button';
import PPGModal from '../../ppg-modal/PPGModal';
import TYPES from '../../../constants/CommodityTypes';
import AddCommodity from './add-commodity/AddCommodity';

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
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
  menuList: {
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const columns = [
  {
    title: 'Status'
  },
  {
    title: 'Reference'
  },
  {
    title: 'Pieces'
  },
  {
    title: 'Package'
  },
  {
    title: 'Description'
  },
  {
    title: 'Dimension'
  },
  {
    title: 'Weight'
  },
  {
    title: 'Volumne'
  }
];

class CommoditiesOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        {
          id: 1,
          content: [
            { text: 'Received' }, { text: 'WRI0089' }, { text: '1' }, { text: '45 ft. Standard Container' }, { text: 'NONE' },
            { text: '0 x 0 x 0 in' }, { text: '0.000 kg' }, { text: '0.000 m3' }
          ]
        }
      ],
      openModalAddVehicle: false,
      openModalAddContainer: false,
    }
  }

  addVehicle = () => {
    this.setState({
      openModalAddVehicle: true,
    });
  }

  onCloseVehicleModal = () => {
    this.setState({
      openModalAddVehicle: false,
    });
  }

  addContainer = () => {
    this.setState({
      openModalAddContainer: true,
    });
  }

  onCloseContainerMocal = () => {
    this.setState({
      openModalAddContainer: false,
    });
  }

  handleAddVehicle = (e) => {
    const { rows } = this.state;
    this.setState({
      rows: [...rows, {id: 2, content: [
        { text: 'Pending' }, { text: e.vin }, { text: e.vin }, { text: '40 ft. Standard Container' }, { text: 'NONE' },
        { text: '0 x 2 x 0 in' }, { text: '0.000 kg' }, { text: '0.000 m3' }
      ]}],
      openModalAddVehicle: false,
    }, () => {
      // Propagate event to parents
      this.props.handleChange(this.state.rows);
    });
  }

  handleAddContainer = (e) => {
    const { rows } = this.state;
    this.setState({
      rows: [...rows, {id: 2, content: [
        { text: 'Pending' }, { text: e.vin }, { text: e.vin }, { text: '40 ft. Standard Container' }, { text: 'NONE' },
        { text: '0 x 2 x 0 in' }, { text: '0.000 kg' }, { text: '0.000 m3' }
      ]}],
      openModalAddContainer: false,
    }, () => {
      // Propagate event to parents
      this.props.handleChange(this.state.rows);
    });
  }

  render() {
    const { classes } = this.props;
    const { rows, openModalAddVehicle, openModalAddContainer } = this.state;

    return(
      <>
        <Paper style={{ marginBottom: '8px' }}>
          <TitleWrapper>
            <div style={{ margin: '10px', padding: '5px' }}>
              <span style={{ fontWeight: '600', fontSize: '1.25rem', color: 'darkgray' , padding: '10px'}}>Commodities </span>
            </div>
            <div>
              <MenuList className={classes.menuList}>
                <Button variant="outlined" className={classes.button} onClick={this.addVehicle}>
                  + Vehicle
                </Button>
                <Button variant="outlined" className={classes.button} onClick={this.addContainer}>
                  + Container
                </Button>
              </MenuList>
            </div>
          </TitleWrapper>
        </Paper>
        <TableWrapper>
          <PPGTable columns={columns} rows={rows} />
        </TableWrapper>
        <PPGModal setOpen={openModalAddVehicle} handleClose={this.onCloseVehicleModal} width='765px' height='400px' >
          <AddCommodity handleAdd={this.handleAddVehicle} type={TYPES.VEHICLE} />
        </PPGModal>
        <PPGModal setOpen={openModalAddContainer} handleClose={this.onCloseContainerMocal} width='765px' height='400px' >
          <AddCommodity handleAdd={this.handleAddContainer} type={TYPES.CONTAINER} />
        </PPGModal>
      </>
    );
  }
}

export default withStyles(styles)(CommoditiesOption);