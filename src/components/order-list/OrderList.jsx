import React, { Component } from 'react';
import BaseComponent from '../base-component/BaseComponent';
import PPGTable from '../ppg-table/PPGTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import { withRouter } from 'react-router-dom';
import PPGTableEnhanced from '../ppg-table-enhanced/PPGTableEnhanced';
import axios from 'axios';
import { ApiServer } from '../../Defaults';

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const columns = [
  {
    title: '',
    isIcon: true
  },
  {
    title: 'Number'
  },
  {
    title: 'Amount'
  },
  {
    title: 'Created at'
  },
  {
    title: 'Status'
  },
  {
    title: 'Submitted'
  },
  {
    title: 'Created by'
  },
  {
    title: 'Has shippment?'
  }
];

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      rows: []
    };
  }

  componentDidMount = () => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${this.props.cookies.get('token', { path: '/' })}`;

    // DEALERS FROM PierPont Global already registered should be retrieved here.
    const examples = [
      {
        id: 1,
        amount: 26990,
        created_at: 'May, 27 2019',
        status: 'NEW',
        submitted: 'YES',
        user_name: 'Daniel Pena',
        has_shippment: 'YES'
      }
    ];
    axios.get(`${ApiServer}/api/v1/shipper`).then(data => {
      console.log('Fetching...');
      console.log(data);
      const rowData = examples; // omitting retrieved data, since the backend for this is not created yet, putting examples though.
      let mappedData = rowData.map(row => {
        let rowObj = {
          id: row.id,
          content: [
            { isIcon: true, icon: <RemoveRedEye /> },
            { text: row.id },
            { text: row.amount },
            { text: row.created_at },
            { text: row.status },
            { text: row.submitted },
            { text: row.user_name },
            { text: row.has_shippment }
          ]
        };
        return rowObj;
      });
      this.setState({
        rows: mappedData,
        isLoading: false
      });
    });
  };

  onRowClick = (e, rowId) => {
    // Got to detail page of selected order
    this.props.history.push(`order/${rowId}`);
  };

  render() {
    const { isLoading, rows } = this.state;
    console.log(this.props);
    return (
      <>
        <BaseComponent cookies={this.props.cookies}>
          {isLoading ? (
            <LoadingWrapper>
              {' '}
              <CircularProgress />{' '}
            </LoadingWrapper>
          ) : (
            <>
              {/*<PPGTable handleOnRowClick={this.onRowClick} columns={columns} rows={rows} />*/}
              <PPGTable
                columns={columns}
                rows={rows}
                handleOnRowClick={this.onRowClick}
              />
            </>
          )}
        </BaseComponent>
      </>
    );
  }
}

export default withRouter(OrderList);
