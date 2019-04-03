import React, { Component } from 'react';
import BaseComponent from '../base-component/BaseComponent';
import axios from 'axios';
import { ApiServer } from '../../Defaults';
import PPGTable from '../ppg-table/PPGTable';
import { Paper, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
  }
];

class AgentList extends Component {
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
    axios.get(`${ApiServer}/api/v1/agent`).then(data => {
      let mappedData = data.data.map(row => {
        let mappedRow = {
          id: row.id,
          content: [{ text: row.name }, { text: row.address }]
        };
        return mappedRow;
      });
      this.setState({
        rows: mappedData
      });
    });
  };

  createAgent = () => {};

  render() {
    const { rows } = this.state;
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
                Available Agents
              </span>
            </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.createAgent}
            >
              Create Agent
            </Button>
          </div>
          <PPGTable rows={rows} columns={columns} />
        </BaseComponent>
      </>
    );
  }
}

export default withStyles(styles)(AgentList);
