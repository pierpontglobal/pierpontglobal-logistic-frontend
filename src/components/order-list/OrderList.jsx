import React, { Component } from 'react';
import BaseComponent from '../base-component/BaseComponent';
import PPGTable from '../ppg-table/PPGTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import { withRouter } from 'react-router-dom';
import PPGTableEnhanced from '../ppg-table-enhanced/PPGTableEnhanced';

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      columns: [
        {
          title: '',
          isIcon: true
        },
        {
          title: 'ID'
        },
        {
          title: 'NAME'
        },
        {
          title: 'NUMBER'
        }
      ],
      rows: [
        {
          id: 998,
          content: [
            { icon: <RemoveRedEye /> },
            { text: '998' },
            { text: 'JUlian order' },
            { text: '987' }
          ]
        },
        {
          id: 1001,
          content: [
            { icon: <RemoveRedEye /> },
            { text: '1001' },
            { text: 'Toyota Camrry' },
            { text: '9899' }
          ]
        },
        {
          id: 1003,
          content: [
            { icon: <RemoveRedEye /> },
            { text: '1003' },
            { text: 'Toyota Ford Runner' },
            { text: '675' }
          ]
        }
      ]
    };
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 2000);
  };

  onRowClick = (e, rowId) => {
    // Got to detail page of selected order
    this.props.history.push(`order/${rowId}`);
  };

  render() {
    const { isLoading, columns, rows } = this.state;
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
              <div
                style={{
                  width: '100%',
                  marginTop: '15px',
                  marginBottom: '15px'
                }}
              >
                <span
                  style={{
                    fontWeight: '600',
                    fontSize: '1.45rem',
                    color: 'black',
                    padding: '10px'
                  }}
                >
                  Order List{' '}
                </span>
              </div>
              {/*<PPGTable handleOnRowClick={this.onRowClick} columns={columns} rows={rows} />*/}
              <PPGTableEnhanced handleOnRowClick={this.onRowClick} />
            </>
          )}
        </BaseComponent>
      </>
    );
  }
}

export default withRouter(OrderList);
