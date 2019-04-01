import React, { Component } from 'react';
import BaseComponent from '../base-component/BaseComponent';
import PPGTable from '../ppg-table/PPGTable';
import { withRouter } from 'react-router-dom';
import PPGModal from '../ppg-modal/PPGModal';
import { Paper, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ShipperCreate from './shipper-create/ShipperCreate';
import axios from 'axios';
import { ApiServer } from '../../Defaults';
import { withCookies } from 'react-cookie';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

const columns = [
  {
    title: 'Name'
  },
  {
    title: 'Address'
  },
  {
    title: 'Location'
  },
  {
    title: 'City'
  },
  {
    title: 'Place ID'
  },
  {
    title: 'Vicinity'
  }
];

class ShipperList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }

  componentDidMount = () => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${this.props.cookies.get('token', { path: '/' })}`;

    axios.get(`${ApiServer}/api/v1/shipper`).then(data => {
      console.log('Fetching...');
      console.log(data);
      const rowData = data.data;
      let mappedData = rowData.map(row => {
        let rowObj = {
          id: row.id,
          content: [
            { text: row.name },
            { text: row.address },
            { text: row.location },
            { text: row.city },
            { text: row.place_id },
            { text: row.vicinity }
          ]
        };
        return rowObj;
      });
      this.setState({
        rows: mappedData
      });
    });
  };

  createShipper = () => {
    this.props.history.push('shippers/create');
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <BaseComponent cookies={this.props.cookies}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'space-between',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ marginTop: '15px', marginBottom: '10px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                Available Shippers
              </span>
            </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.createShipper}
            >
              Create shipper
            </Button>
          </div>
          <PPGTable rows={this.state.rows} columns={columns} />
        </BaseComponent>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(withCookies(ShipperList)));
