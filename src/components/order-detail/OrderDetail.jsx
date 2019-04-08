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
import axios from 'axios';
import { ApiServer } from '../../Defaults';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const NOTIFICATION_TYPES = {
  ERROR: 'danger',
  SUCCESS: 'success'
};

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
      shippId: -1,
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
        serviceType: '',
        shipperAddress: '',
        shipperName: '',
        transportationMode: '',
        agentId: -1,
        consigneeId: -1,
        issuingCompanyId: -1,
        shipperId: -1,
        transportationModeId: -1
      },
      chargesInfo: {},
      orderStates: [
        {
          label: 'NEW',
          active: false
        },
        {
          label: 'PRINCIPAL INFO',
          active: false
        },
        {
          label: 'COMMODITIES',
          active: false
        },
        {
          label: 'CHARGES',
          active: false
        },
        {
          label: 'DISPATCHED',
          active: false
        }
      ],
      issuingCompanies: [],
      shippers: [],
      agents: [],
      consignees: [],
      transports: [],
      isSavingShipment: false,
      commodities: [],
      charges: [],
      hasShippment: false
    };

    this.notificationDOMRef_info = React.createRef();
    this.notificationDOMRef_sucess = React.createRef();
    this.notificationDOMRef_error = React.createRef();
  }

  addNotification = (title, message, duration, type) => {
    let obj = this.notificationDOMRef_info;
    if (type === NOTIFICATION_TYPES.SUCCESS)
      obj = this.notificationDOMRef_sucess;
    else if (type === NOTIFICATION_TYPES.ERROR)
      obj = this.notificationDOMRef_error;

    obj.current.addNotification({
      title: title,
      message: message,
      type: type,
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: duration },
      dismissable: { click: true }
    });
  };

  onDetailsChange = e => {
    this.setState({
      detailsInfo: e
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

      if (!!data && !!data.data) {
        let shippment = data.data.shippment_detail;
        let commodities = data.data.commodities;
        let charges = data.data.charges;
        let hasshippment = true;

        if (!!shippment) {
          let detailsInfo = {
            agent_address: shippment.agent_address,
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
            transportationModeId: shippment.mode_of_transportation_id
          };

          this.setState({
            detailsInfo: detailsInfo,
            commodities: commodities,
            charges: charges,
            shippId: !!shippment ? shippment.id : -1,
            hasShippment: hasshippment
          });
        }
      }

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
        orderId: orderId
      });
    });
  };

  handleSaveShippment = () => {
    console.log(this.state);
    const { detailsInfo, commodities, orderId } = this.state;

    // this.addNotification('Process has started', 'We\'ll notify you when it\'s completed.', 1500, 'info');
    this.setState(
      {
        isSavingShipment: true
      },
      () => {
        let detailsInfoDto = {
          agent_id: detailsInfo.agentId,
          consignee_id: detailsInfo.consigneeId,
          issuing_company_id: detailsInfo.issuingCompanyId,
          shipper_id: detailsInfo.shipperId,
          mode_of_transportation_id: detailsInfo.transportationModeId,
          service_type: detailsInfo.serviceType,
          destination_name: detailsInfo.destinationName,
          origin_name: detailsInfo.originName,
          order_number: parseInt(orderId)
        };

        let orderShippmentDto = {
          order_detail: detailsInfoDto,
          order_number: orderId // WARNING, this should always be sent!!
        };
        console.log('DTO:   ::');
        console.log(orderShippmentDto);
        axios
          .post(`${ApiServer}/api/v1/order/create_shippment`, orderShippmentDto)
          .then(
            data => {
              console.log(data);
              this.addNotification(
                'Process has completed',
                'Shipment was saved sucessfully.',
                2000,
                NOTIFICATION_TYPES.SUCCESS
              );
              this.setState({
                isSavingShipment: false,
                hasShippment: true
              });
            },
            err => {
              this.addNotification(
                'Process has completed',
                "There was an error in the process, coudln't saved the shipment",
                2500,
                NOTIFICATION_TYPES.ERROR
              );
              this.setState({
                isSavingShipment: false
              });
            }
          );
      }
    );
  };

  shipperChange = e => {
    const { detailsInfo } = this.state;
    detailsInfo.shipperAddress = e.address;
    detailsInfo.shipperName = e.name;
    detailsInfo.shipperId = e.id;
    this.setState({
      detailsInfo: detailsInfo
    });
  };

  consigneeChange = e => {
    const { detailsInfo } = this.state;
    detailsInfo.consigneeAddress = e.address;
    detailsInfo.consigneeName = e.name;
    detailsInfo.consigneeId = e.id;
    this.setState({
      detailsInfo: detailsInfo
    });
  };

  agentChange = e => {
    const { detailsInfo } = this.state;
    detailsInfo.agentAddress = e.address;
    detailsInfo.agentName = e.name;
    detailsInfo.agentId = e.id;
    this.setState({
      detailsInfo: detailsInfo
    });
  };

  transportChange = e => {
    console.log(e);
    const { detailsInfo } = this.state;
    detailsInfo.transportationMode = e.name;
    detailsInfo.transportationModeId = e.id;
    this.setState({
      detailsInfo: detailsInfo
    });
  };

  issuingCompanyChange = e => {
    const { detailsInfo } = this.state;
    detailsInfo.issuingCompany = e.company_name;
    detailsInfo.issuingCompanyId = e.id;
    this.setState({
      detailsInfo: detailsInfo
    });
  };

  onCommoditiesChange = commodities => {
    this.setState({
      commodities: commodities
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
      transports,
      containerCommodity,
      vehicleCommodity,
      commodities,
      shippId,
      charges,
      hasShippment
    } = this.state;

    const tabOptions = [
      {
        label: 'Details',
        item: (
          <DetailsOption
            handleChange={this.onDetailsChange}
            shipperChange={this.shipperChange}
            consigneeChange={this.consigneeChange}
            agentChange={this.agentChange}
            transportChange={this.transportChange}
            issuingCompanyChange={this.issuingCompanyChange}
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
        disabled: !hasShippment,
        item: (
          <CommoditiesOption
            cookies={this.props.cookies}
            commodities={commodities}
            orderId={orderId}
            shippId={shippId}
            addNotification={this.addNotification}
            onCommoditiesChange={this.onCommoditiesChange}
          />
        )
      },
      {
        label: 'Charges',
        disabled: !hasShippment,
        item: (
          <ChargesOption
            cookies={this.props.cookies}
            handleChange={this.onChargesChange}
            charges={charges}
            orderId={orderId}
            shippId={shippId}
            addNotification={this.addNotification}
          />
        )
      },
      {
        label: 'Road path',
        disabled: !hasShippment,
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
        <BaseComponent cookies={this.props.cookies}>
          {isLoading ? (
            <LoadingWrapper>
              {' '}
              <CircularProgress />{' '}
            </LoadingWrapper>
          ) : (
            <>
              <ReactNotification ref={this.notificationDOMRef_info} />
              <ReactNotification ref={this.notificationDOMRef_error} />
              <ReactNotification ref={this.notificationDOMRef_sucess} />
              <OrderPrincipalInfo
                handleSaveShippment={this.handleSaveShippment}
                orderId={orderId}
              />
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
      </>
    );
  }
}

export default withRouter(OrderDetail);
