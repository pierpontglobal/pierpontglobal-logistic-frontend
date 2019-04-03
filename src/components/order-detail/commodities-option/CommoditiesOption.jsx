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
import axios from 'axios';
import { ApiServer } from '../../../Defaults';

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

const containerColumns = [
  {
    title: 'Reference'
  },
  {
    title: 'Description'
  },
  {
    title: 'Pieces'
  },
  {
    title: 'Length'
  },
  {
    title: 'Width'
  },
  {
    title: 'Height'
  },
  {
    title: 'Tare weight'
  },
  {
    title: 'Next weight'
  },
  {
    title: 'Total weigth'
  },
  {
    title: 'Volume'
  },
  {
    title: 'Vol weight'
  },
  {
    title: 'Square Pt'
  }
];

const carColumns = [
  {
    title: 'Vin'
  },
  {
    title: 'Pieces'
  },
  {
    title: 'Year'
  },
  {
    title: 'Model'
  },
  {
    title: 'Maker'
  },
  {
    title: 'Engine'
  },
  {
    title: 'Trim'
  },
  {
    title: 'Fuel'
  },
  {
    title: 'Body'
  },
  {
    title: 'Type code'
  }
];

class CommoditiesOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerRows: [],
      carRows: [],
      openModalAddVehicle: false,
      openModalAddContainer: false
    };
  }

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

  handleAddVehicle = e => {
    const { carRows } = this.state;
    this.setState(
      {
        carRows: [
          ...carRows,
          {
            id: 2,
            content: [
              { text: e.vin },
              { text: 1 },
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
        openModalAddVehicle: false
      },
      () => {
        // Propagate event to parents
        this.props.handleChange(this.state.carRows);
      }
    );
  };

  handleAddContainer = container => {
    const { containerRows } = this.state;
    this.setState(
      {
        containerRows: [
          ...containerRows,
          {
            id: container.id,
            content: [
              { text: container.id },
              { text: container.containerType },
              { text: 1 },
              { text: container.length },
              { text: container.width },
              { text: container.height },
              { text: container.tareWeight },
              { text: container.nextWeight },
              { text: container.totalWeight },
              { text: container.volumne },
              { text: container.volWeigth },
              { text: container.squarePt }
            ]
          }
        ],
        openModalAddContainer: false
      },
      () => {
        // Propagate event to parents
        this.props.handleChange(this.state.containerRows);
      }
    );
  };

  render() {
    const { classes } = this.props;
    const {
      carRows,
      containerRows,
      openModalAddVehicle,
      openModalAddContainer
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
                Commodities{' '}
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
                  fontWeight: '600',
                  fontSize: '1.05rem',
                  color: 'darkgray',
                  padding: '10px'
                }}
              >
                Vehicles{' '}
              </span>
            </div>
            <PPGTable columns={carColumns} rows={carRows} />
          </TableWrapper>
        ) : null}
        {containerRows.length > 0 ? (
          <TableWrapper>
            <div>
              <span
                style={{
                  fontWeight: '600',
                  fontSize: '1.05rem',
                  color: 'darkgray',
                  padding: '10px'
                }}
              >
                Containers{' '}
              </span>
            </div>
            <PPGTable columns={containerColumns} rows={containerRows} />
          </TableWrapper>
        ) : null}
        {carRows.length === 0 && containerRows.length === 0
          ? 'No commodities has been added'
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
      </>
    );
  }
}

export default withStyles(styles)(CommoditiesOption);
