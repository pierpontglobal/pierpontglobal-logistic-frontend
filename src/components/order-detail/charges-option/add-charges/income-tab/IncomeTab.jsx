import React, { Component } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  input: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing * 0.8,
    marginRight: theme.spacing.unit * 0.8
  },
  resize: {
    fontSize: '0.5rem'
  }
});

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  margin: 5px 10px;
  justify-content: space-between;
  align-items: 'center';
  flex-wrap: wrap;
`;

const CustomInput = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: solid gray 1px;
  background-color: white;
`;

class IncomeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: '',
      units: '',
      rate: '',
      amount: '',
      currency: '',
      payment: '',
      billTo: '',
      billToName: '',
      date: ''
    };
  }

  handleChangeInput = e => {
    this.setState(
      {
        [e.target.id]: e.target.value
      },
      () => {
        this.props.hanleData(this.state);
      }
    );
  };

  render() {
    const { classes } = this.props;
    const {
      quantity,
      units,
      rate,
      amount,
      currency,
      payment,
      billTo,
      billToName,
      date,
      serviceFound
    } = this.state;
    return (
      <Paper style={{ padding: '18px' }}>
        <Grid container spacing={12}>
          <Grid item xs={2}>
            <TextField
              id="quantity"
              label="Quantity"
              type="number"
              className={classes.textField}
              margin="normal"
              onChange={this.handleChangeInput}
              variant="outlined"
              value={quantity}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="units"
              label="Units"
              className={classes.textField}
              margin="normal"
              onChange={this.handleChangeInput}
              variant="outlined"
              value={units}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="rate"
              label="Rate"
              type="number"
              className={classes.textField}
              margin="normal"
              value={rate}
              onChange={this.handleChangeInput}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="amount"
              label="Amount"
              type="number"
              className={classes.textField}
              margin="normal"
              value={amount}
              onChange={this.handleChangeInput}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="currency"
              label="Currency"
              className={classes.textField}
              margin="normal"
              value={currency}
              onChange={this.handleChangeInput}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="payment"
              label="Payment"
              className={classes.textField}
              margin="normal"
              type="number"
              value={payment}
              onChange={this.handleChangeInput}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container spacing={12}>
          <Grid item xs={2} />
          <Grid item xs={2} />
          <Grid item xs={2}>
            <TextField
              id="show-rate"
              label="Show rate"
              className={classes.textField}
              margin="normal"
              type="number"
              value={rate}
              disabled={true}
              onChange={this.handleChangeInput}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="show-amount"
              label="Amount"
              disabled={true}
              className={classes.textField}
              margin="normal"
              value={amount}
              type="number"
              onChange={this.handleChangeInput}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2} />
          <Grid item xs={2} />
        </Grid>
        <Grid container spacing={12} style={{ marginTop: '38px' }}>
          <Grid item xs={5}>
            <TextField
              id="billTo"
              label="Bill to"
              className={classes.textField}
              margin="normal"
              value={billTo}
              onChange={this.handleChangeInput}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={3}>
            <TextField
              id="billToName"
              label="Bill to name"
              className={classes.textField}
              margin="normal"
              value={billToName}
              onChange={this.handleChangeInput}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="date"
              type="date"
              label="Date"
              className={classes.textField}
              margin="normal"
              value={date}
              onChange={this.handleChangeInput}
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(IncomeTab);
