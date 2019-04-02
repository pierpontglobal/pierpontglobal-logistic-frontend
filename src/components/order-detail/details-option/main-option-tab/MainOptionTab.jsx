import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import PPGSimpleSelect from '../../../ppg-simple-select/PPGSimpleSelect';
import axios from 'axios';
import { ApiServer } from '../../../../Defaults';
import { withCookies } from 'react-cookie';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  input: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  }
});

class MainOptionTab extends Component {
  constructor(props) {
    super(props);
    const { orderId, detailsInfo } = this.props;
    this.state = {
      orderNumber: orderId,
      serviceType: detailsInfo.serviceType,
      date: detailsInfo.date,
      issuingCompany: detailsInfo.issuingCompany,
      shipperName: detailsInfo.shipperName,
      shipperAddress: detailsInfo.shipperAddress,
      consigneeName: detailsInfo.consigneeName,
      consigneeAddress: detailsInfo.consigneeAddress,
      agentName: detailsInfo.agentName,
      agentAddress: detailsInfo.agentAddress,
      transportationMode: detailsInfo.transportationMode,
      destinationName: detailsInfo.destinationName,
      originName: detailsInfo.originName,
      agentId: -1,
      consigneeId: -1,
      issuingCompanyId: -1,
      shipperId: -1,
      transportationModeId: -1,
      isFetchingShipper: false,
      isFetchingIssuingComp: false,
      isFetchingConsignee: false,
      isFetchingAgent: false
    };
  }

  componentDidMount = () => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${this.props.cookies.get('token', { path: '/' })}`;
  };

  onInputValueChange = e => {
    this.setState(
      {
        [e.target.id]: e.target.value
      },
      () => {
        // Propagate state to parents
        this.props.handleChange(this.state);
      }
    );
  };

  onSelectShipperChange = e => {
    let id = e.value;
    this.setState(
      {
        isFetchingShipper: true
      },
      () => {
        axios.get(`${ApiServer}/api/v1/shipper/${id}`).then(data => {
          let shipp = data.data;
          this.setState({
            isFetchingShipper: false,
            shipperId: shipp.id,
            shipperName: shipp.name,
            shipperAddress: shipp.address
          });
        });
      }
    );
  };

  onSelectConsigneeChange = e => {
    let id = e.value;
    this.setState(
      {
        isFetchingConsignee: true
      },
      () => {
        axios.get(`${ApiServer}/api/v1/consignee/${id}`).then(data => {
          let consig = data.data;
          this.setState({
            isFetchingConsignee: false,
            consigneeId: consig.id,
            consigneeName: consig.name,
            consigneeAddress: consig.address
          });
        });
      }
    );
  };

  onSelectAgentChange = e => {
    let id = e.value;
    this.setState(
      {
        isFetchingAgent: true
      },
      () => {
        axios.get(`${ApiServer}/api/v1/agent/${id}`).then(data => {
          let agent = data.data;
          this.setState({
            isFetchingAgent: false,
            agentId: agent.id,
            agentName: agent.name,
            agentAddress: agent.address
          });
        });
      }
    );
  };

  onSelectIssuingCompanyChange = e => {
    let id = e.value;
    this.setState(
      {
        isFetchingIssuingComp: true
      },
      () => {
        axios.get(`${ApiServer}/api/v1/issuing_company/${id}`).then(data => {
          let issuComp = data.data;
          this.setState({
            isFetchingIssuingComp: false,
            issuingCompanyId: issuComp.id,
            issuingCompany: issuComp.name
          });
        });
      }
    );
  };

  onSelectTransportChange = e => {
    console.log(e);
  };

  render() {
    const {
      classes,
      orderId,
      issuingCompanies,
      shippers,
      agents,
      consignees,
      transports
    } = this.props;
    const {
      serviceType,
      date,
      issuingCompany,
      shipperName,
      shipperAddress,
      consigneeName,
      consigneeAddress,
      agentName,
      agentAddress,
      transportationMode,
      destinationName,
      originName,
      issuingCompanyId,
      shipperId,
      isFetchingShipper,
      isFetchingIssuingComp,
      isFetchingConsignee,
      isFetchingAgent
    } = this.state;
    return (
      <Paper style={{ padding: '15px' }}>
        <div style={{ width: '100%' }}>
          <span
            style={{
              fontWeight: '600',
              fontSize: '1.25rem',
              color: 'darkgray',
              padding: '10px'
            }}
          >
            Main information{' '}
          </span>
        </div>
        <div
          style={{
            padding: '15px',
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ width: '45%' }}>
            <TextField
              disabled
              id="order-number"
              label="Order Number"
              defaultValue={orderId}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div style={{ width: '45%' }}>
            <TextField
              id="serviceType"
              label="Service type"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.onInputValueChange}
              defaultValue={serviceType}
            />
          </div>
        </div>
        <div
          style={{
            padding: '15px',
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ width: '45%' }}>
            <TextField
              id="date"
              label="Date"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              onChange={this.onInputValueChange}
              defaultValue={date}
            />
          </div>
          <div style={{ width: '45%' }}>
            <label>Issuing company</label>
            <PPGSimpleSelect
              isLoading={isFetchingIssuingComp}
              handleChange={this.onSelectIssuingCompanyChange}
              defaultValue={{ label: issuingCompany, value: issuingCompanyId }}
              options={issuingCompanies}
            />
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <span
            style={{
              fontWeight: '600',
              fontSize: '1.25rem',
              color: 'darkgray',
              padding: '10px'
            }}
          >
            Entities{' '}
          </span>
        </div>
        <div
          style={{
            padding: '15px',
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ width: '45%' }}>
            <label>Shipper</label>
            <PPGSimpleSelect
              isLoading={isFetchingShipper}
              handleChange={this.onSelectShipperChange}
              defaultValue={{ label: shipperName, value: shipperId }}
              options={shippers}
            />
          </div>
          <div style={{ width: '45%' }}>
            <TextField
              id="shipperAddress"
              label="Shipper address"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              disabled={true}
              value={shipperAddress}
            />
          </div>
        </div>
        <div
          style={{
            padding: '15px',
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ width: '45%' }}>
            <label>Consignee</label>
            <PPGSimpleSelect
              isLoading={isFetchingConsignee}
              handleChange={this.onSelectConsigneeChange}
              defaultValue={{ label: consigneeName, value: consigneeAddress }}
              options={consignees}
            />
          </div>
          <div style={{ width: '45%' }}>
            <TextField
              id="consigneeAddress"
              label="Consignee address"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              disabled={true}
              value={consigneeAddress}
            />
          </div>
        </div>
        <div
          style={{
            padding: '15px',
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ width: '45%' }}>
            <label>Agent</label>
            <PPGSimpleSelect
              isLoading={isFetchingAgent}
              handleChange={this.onSelectAgentChange}
              defaultValue={{ label: agentName, value: agentAddress }}
              options={agents}
            />
          </div>
          <div style={{ width: '45%' }}>
            <TextField
              id="agentAddress"
              label="Agent address"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              disabled={true}
              value={agentAddress}
            />
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <span
            style={{
              fontWeight: '600',
              fontSize: '1.25rem',
              color: 'darkgray',
              padding: '10px'
            }}
          >
            Itenerary{' '}
          </span>
        </div>
        <div
          style={{
            padding: '15px',
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ width: '45%' }}>
            <label>Mode of transportation</label>
            <PPGSimpleSelect
              isMulti={true}
              handleChange={this.onSelectTransportChange}
              defaultValue={[
                { label: 'air', value: 1 },
                { label: 'land', value: 2 }
              ]}
              options={transports}
            />
          </div>
          <div style={{ width: '45%' }}>
            <TextField
              id="destinationName"
              label="Destination name"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.onInputValueChange}
              defaultValue={destinationName}
            />
          </div>
        </div>
        <div
          style={{
            padding: '15px',
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ width: '45%' }}>
            <TextField
              id="originName"
              label="Origin name"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.onInputValueChange}
              defaultValue={originName}
            />
          </div>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(withCookies(MainOptionTab));
