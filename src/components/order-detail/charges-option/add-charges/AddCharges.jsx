import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TabsComponent from '../../../Tabs/TabsComponent';
import IncomeTab from './income-tab/IncomeTab';
import ExpenseTab from './expense-tab/ExpenseTab';
import { Button, IconButton } from '@material-ui/core';
import PPGSimpleSelect from '../../../ppg-simple-select/PPGSimpleSelect';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  input: {
    margin: theme.spacing.unit,
    height: '5px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 140
  }
});

class AddCharges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceTypes: [
        {
          id: 1,
          label: 'Sample service type #1',
          description: 'Sample service #1 description here....'
        },
        {
          id: 2,
          label: 'Sample service #2',
          description: 'Hola daniel k ases'
        }
      ],
      service: {
        serviceTypeId: '',
        serviceTypeName: '',
        serviceTypeDescription: ''
      },
      serviceFound: false,
      income: {},
      expense: {},
      isFetchingService: false
    };
  }

  componentDidMount = () => {};

  handleChange = srv => {
    console.log(srv);
    const serviceId = srv.id;

    if (!!serviceId) {
      const service = this.state.serviceTypes.find(x => x.id === serviceId);

      const obj = {
        serviceTypeId: service.id,
        serviceTypeName: service.label,
        serviceTypeDescription: service.description
      };

      this.setState({
        service: obj,
        serviceFound: true
      });
    }
  };

  addChargeToShipment = e => {
    this.props.handleAdd(this.state);
  };

  handleIncomeData = incomeTabState => {
    this.setState({
      income: incomeTabState
    });
  };

  handleExpenseData = expenseTabState => {
    this.setState({
      expense: expenseTabState
    });
  };

  render() {
    const { classes } = this.props;
    const {
      service,
      serviceTypes,
      serviceFound,
      isFetchingService
    } = this.state;

    const tabOptions = [
      {
        label: 'INCOME',
        item: <IncomeTab hanleData={this.handleIncomeData} />
      },
      {
        label: 'EXPENSES',
        item: <ExpenseTab handleData={this.handleExpenseData} />
      }
    ];

    return (
      <>
        <div>
          <span style={{ fontWeight: '600' }}>Add Charge</span>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ width: '40%' }}>
            <PPGSimpleSelect
              isLoading={isFetchingService}
              handleChange={this.handleChange}
              options={serviceTypes}
            />
            {/* <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Service type</InputLabel>
              <Select
                value={this.state.service.serviceTypeName}
                onChange={this.handleChange}
                inputProps={{
                  name: 'containerType',
                  id: 'containerType'
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {serviceTypes.map(item => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
          </div>
          <div style={{ width: '50%' }}>
            <TextField
              disabled
              id="standard-disabled"
              label="Description"
              value={service.serviceTypeDescription}
              className={classes.textField}
              margin="normal"
            />
          </div>
        </div>
        <div style={{ width: '100%', padding: '7px' }}>
          <TabsComponent options={tabOptions} />
        </div>
        <div style={{ width: '100%', marginTop: '18px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <Button
              disabled={!serviceFound}
              onClick={this.addChargeToShipment}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Add charge
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(AddCharges);
