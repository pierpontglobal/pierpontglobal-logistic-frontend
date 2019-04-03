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
import GoogleRouteDraw from '../google-route-draw/GoogleRouteDraw';
import Script from 'react-load-script';
import { GOOGLE_API_KEY } from '../../Defaults';
import axios from 'axios';
import { ApiServer } from '../../Defaults';

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
      scriptisLoaded: false,
      isLoading: true,
      orderId: -1,
      detailsInfo: {
        agentAddress: '',
        agentName: '',
        consigneeAddress: '',
        consigneeName: '',
        date: '',
        destinationName: '',
        issuingCompany: '',
        orderNumber: '',
        originName: '',
        serviceType: 't',
        shipperAddress: '',
        shipperName: '',
        transportationMode: '',
        agentId: -1,
        consigneeId: -1,
        issuingCompanyId: -1,
        shipperId: -1,
        transportationModeId: -1
      },
      commoditiesInfo: {},
      chargesInfo: {},
      orderStates: [
        {
          label: 'Step 1',
          active: false
        },
        {
          label: 'Step 2',
          active: false
        },
        {
          label: 'Step 34',
          active: false
        },
        {
          label: 'Step 4',
          active: false
        },
        {
          label: 'Step 5',
          active: false
        },
        {
          label: 'Step 6',
          active: false
        }
      ],
      issuingCompanies: [],
      shippers: [],
      agents: [],
      consignees: [],
      transports: []
    };
  }

  onDetailsChange = e => {
    this.setState({
      detailsInfo: e
    });
  };

  onCommoditiesChange = e => {
    this.setState({
      commoditiesInfo: e
    });
  };

  onChargesChange = e => {
    this.setState({
      chargesInfo: e
    });
  };

  componentDidMount = () => {
    const orderId = this.props.match.params.id;
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${this.props.cookies.get('token', { path: '/' })}`;

    axios.get(`${ApiServer}/api/v1/shippment/${orderId}`).then(data => {
      console.log('Fetching...');
      console.log(data);

      let shippment = data.data;
      let detailsInfo = {
        agentAddress: shippment.agent_address,
        agentName: shippment.agent_name,
        consigneeAddress: shippment.consignee_address,
        consigneeName: shippment.consignee_name,
        date: shippment.created_at,
        destinationName: shippment.destination_name,
        issuingCompany: shippment.issuing_company_name,
        orderNumber: shippment.order_number,
        originName: shippment.origin_name,
        serviceType: shippment.service_type,
        shipperAddress: shippment.shipper_address,
        shipperName: shippment.shipper_name,
        transportationMode: shippment.mode_of_transportation_name,
        agentId: shippment.agent_id,
        consigneeId: shippment.consignee_id,
        issuingCompanyId: shippment.issuing_company_id,
        shipperId: shippment.shipper_id,
        transportationModeId: shippment.transportation_mode_id
      };

      // Get options for Details Main Tab
      axios.get(`${ApiServer}/api/v1/order/options`).then(data => {
        let options = data.data;
        this.setState({
          issuingCompanies: options.issuing_companies.map(item => ({
            value: item.id,
            label: item.company_name
          })),
          shippers: options.shippers.map(item => ({
            value: item.id,
            label: item.name
          })),
          agents: options.agents.map(item => ({
            value: item.id,
            label: item.name
          })),
          consignees: options.consignees.map(item => ({
            value: item.id,
            label: item.name
          })),
          transports: options.transports.map(item => ({
            value: item.id,
            label: item.name
          }))
        });
      });

      this.setState({
        isLoading: false,
        orderId: data.data.order_number,
        detailsInfo: detailsInfo
      });
    });
  };

  handleOnLoad = () => {
    this.setState({
      scriptisLoaded: true
    });
  };

  render() {
    const {
      isLoading,
      orderId,
      detailsInfo,
      scriptisLoaded,
      issuingCompanies,
      shippers,
      consignees,
      agents,
      transports
    } = this.state;

    const tabOptions = [
      {
        label: 'Details',
        item: (
          <DetailsOption
            handleChange={this.onDetailsChange}
            detailsInfo={detailsInfo}
            orderId={orderId}
            issuingCompanies={issuingCompanies}
            shippers={shippers}
            consignees={consignees}
            agents={agents}
            transports={transports}
          />
        )
      },
      {
        label: 'Commodities',
        item: (
          <CommoditiesOption
            cookies={this.props.cookies}
            handleChange={this.onCommoditiesChange}
          />
        )
      },
      {
        label: 'Charges',
        item: (
          <ChargesOption
            cookies={this.props.cookies}
            handleChange={this.onChargesChange}
          />
        )
      },
      {
        label: 'Road path',
        item: (
          <GoogleRouteDraw
            from="Chicago, IL"
            to="Los Angeles, CA"
            wayPoints={[]}
          />
        )
      }
    ];

    return (
      <>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
          onLoad={this.handleOnLoad}
        />
        {scriptisLoaded ? (
          <BaseComponent cookies={this.props.cookies}>
            {isLoading ? (
              <LoadingWrapper>
                {' '}
                <CircularProgress />{' '}
              </LoadingWrapper>
            ) : (
              <>
                <OrderPrincipalInfo orderId={orderId} />
                <div
                  style={{
                    marginTop: '15px',
                    marginBottom: '15px',
                    width: '100%'
                  }}
                >
                  <ProgressStep steps={this.state.orderStates} />
                </div>
                <div
                  style={{
                    marginTop: '15px',
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <div style={{ width: '70%', height: 'auto' }}>
                    <TabsComponent options={tabOptions} />
                  </div>
                  <div style={{ width: '30%', margin: '15px' }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <OrderSummary />
                      <RouteDisplay />
                    </div>
                  </div>
                </div>
              </>
            )}
          </BaseComponent>
        ) : null}
      </>
    );
  }
}

export default withRouter(OrderDetail);
