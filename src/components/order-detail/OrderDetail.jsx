import React, { Component } from 'react';
import OrderPrincipalInfo from './order-principal-info/OrderPrincipalInfo';
import BaseComponent from '../base-component/BaseComponent';
import TabsComponent from '../Tabs/TabsComponent';
import DetailsOption from './details-option/DetailsOption';
import CommoditiesOption from './commodities-option/CommoditiesOption';
import ChargesOption from './charges-option/ChargesOption';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import ProgressStep from '../progress-step/ProgressStep';
import OrderSummary from './order-summary/OrderSummary';
import { withRouter } from 'react-router-dom';
import RouteDisplay from '../route-display/RouteDisplay';


const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      orderId: -1,
      detailsInfo: {
        agentAddress: 'initial value test',
        agentName: '',
        consigneeAddress: '',
        consigneeName: '',
        date: '',
        destinationName: '',
        issuingCompany: '',
        orderNumber: '',
        originName: '',
        serviceType: 'test initial service type value',
        shipperAddress: '',
        shipperName: '',
        transportationMode: '',
      },
      commoditiesInfo: {},
      chargesInfo: {},
      orderStates: [
        {
          label: 'Step 1',
          active: false,
        },
        {
          label: 'Step 2',
          active: false,
        },
        {
          label: 'Step 34',
          active: false,
        },
        {
          label: 'Step 4',
          active: false,
        },
        {
          label: 'Step 5',
          active: false
        },
        {
          label: 'Step 6',
          active: false
        }
      ]
    };
  }

  onDetailsChange = (e) => {
    this.setState({
      detailsInfo: e
    });
  }

  onCommoditiesChange = (e) => {
    this.setState({
      commoditiesInfo: e
    });
  }

  onChargesChange = (e) => {
    this.setState({
      chargesInfo: e
    });
  }

  componentDidMount = () => {
    const orderId = this.props.match.params.id;
    // Call the API for shipment information about this order by  "orderId" CALL_API
    // ....
    setTimeout(() => {
      this.setState({
        isLoading: false,
        orderId: orderId
      });
    }, 2000);
  }

  render() {
    const { isLoading, orderId, detailsInfo } = this.state;

    const tabOptions = [
      {
        label: 'Details',
        item: <DetailsOption handleChange={this.onDetailsChange} detailsInfo={detailsInfo} orderId={orderId} />,
      },
      {
        label: 'Commodities',
        item: <CommoditiesOption handleChange={this.onCommoditiesChange} />,
      },
      {
        label: 'Charges',
        item: <ChargesOption handleChange={this.onChargesChange} />,
      },
    ];

    return (
      <>
        <BaseComponent cookies={this.props.cookies}>
          { isLoading ? <LoadingWrapper> <CircularProgress /> </LoadingWrapper> : 
            <>
              <OrderPrincipalInfo orderId={orderId} />
              <div style={{ marginTop: '15px', marginBottom: '15px', width: '100%' }}>
                <ProgressStep steps={this.state.orderStates} />
              </div>
              <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '70%', height: 'auto' }}>
                  <TabsComponent options={tabOptions} />
                </div>
                <div style={{ width: '30%', margin: '15px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <OrderSummary />
                    <RouteDisplay />
                  </div>
                </div>
              </div>
            </>
          }
        </BaseComponent>
      </>
    );
  }
}

export default withRouter(OrderDetail);
