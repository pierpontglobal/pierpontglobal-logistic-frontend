import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
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
    }
  }

  onInputValueChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    }, () => {
      // Propagate state to parents
      this.props.handleChange(this.state);
    });
  }

  render() {
    const { classes, orderId } = this.props;
    const { serviceType, date, issuingCompany, shipperName, shipperAddress, consigneeName, consigneeAddress,
    agentName, agentAddress, transportationMode, destinationName, originName } = this.state;
    return(
      <Paper style={{ padding: '15px' }}>
        <div style={{ width: '100%' }}>
          <span style={{ fontWeight: '600', fontSize: '1.25rem', color: 'darkgray' , padding: '10px'}}>Main information </span>
        </div>
        <div style={{ padding: '15px', display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
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
        <div style={{ padding: '15px', display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
          <div style={{ width: '45%' }}>
            <TextField
              id="date"
              label="Date"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.onInputValueChange}
              defaultValue={date}
            />
          </div>
          <div style={{ width: '45%' }}>
            <TextField
              id="issuingCompany"
              label="Issuing company name"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.onInputValueChange}
              defaultValue={issuingCompany}
            />
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <span style={{ fontWeight: '600', fontSize: '1.25rem', color: 'darkgray' , padding: '10px'}}>Entities </span>
        </div>
        <div style={{ padding: '15px', display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
          <div style={{ width: '45%' }}>
            <TextField
              id="shipperName"
              label="Shipper name"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.onInputValueChange}
              defaultValue={shipperName}
            />
          </div>
          <div style={{ width: '45%' }}>
            <TextField
              id="shipperAddress"
              label="Shipper address"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.onInputValueChange}
              defaultValue={shipperAddress}
            />
          </div>
        </div>
        <div style={{ padding: '15px', display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
          <div style={{ width: '45%' }}>
            <TextField
              id="consigneeName"
              label="Consignee name"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.onInputValueChange}
              defaultValue={consigneeName}
            />
          </div>
          <div style={{ width: '45%' }}>
            <TextField
              id="consigneeAddress"
              label="Consignee address"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.onInputValueChange}
              defaultValue={consigneeAddress}
            />
          </div>
        </div>
        <div style={{ padding: '15px', display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
          <div style={{ width: '45%' }}>
            <TextField
              id="agentName"
              label="Agent name"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.onInputValueChange}
              defaultValue={agentName}
            />
          </div>
          <div style={{ width: '45%' }}>
            <TextField
              id="agentAddress"
              label="Agent address"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.onInputValueChange}
              defaultValue={agentAddress}
            />
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <span style={{ fontWeight: '600', fontSize: '1.25rem', color: 'darkgray' , padding: '10px'}}>Itenerary </span>
        </div>
        <div style={{ padding: '15px', display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
          <div style={{ width: '45%' }}>
            <TextField
              id="transportationMode"
              label="Mode of transportation name"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.onInputValueChange}
              defaultValue={transportationMode}
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
        <div style={{ padding: '15px', display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
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

export default withStyles(styles)(MainOptionTab);