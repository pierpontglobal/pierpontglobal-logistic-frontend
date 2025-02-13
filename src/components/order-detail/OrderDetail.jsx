import React, { Component } from "react";
import OrderPrincipalInfo from "./order-principal-info/OrderPrincipalInfo";
import BaseComponent from "../base-component/BaseComponent";
import TabsComponent from "../Tabs/TabsComponent";
import DetailsOption from "./details-option/DetailsOption";
import CommoditiesOption from "./commodities-option/CommoditiesOption";
import ChargesOption from "./charges-option/ChargesOption";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import ProgressStep from "../progress-step/ProgressStep";
import OrderSummary from "./order-summary/OrderSummary";
import { withRouter } from "react-router-dom";
import RouteDisplay from "../route-display/RouteDisplay";
import GoogleRouteDraw from "../google-route-draw/GoogleRouteDraw";
import axios from "axios";
import { ApiServer } from "../../Defaults";
import { NOTIFICATION_TYPES } from "../../constants/NotificationTypes";
import PPGModal from "../ppg-modal/PPGModal";
import AddAttachment from "./add-attachment/AddAttachment";

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
        agentAddress: "",
        agentName: "",
        consigneeAddress: "",
        consigneeName: "",
        date: "",
        destinationName: "",
        issuingCompany: "",
        orderNumber: "",
        originName: "",
        serviceType: "",
        shipperAddress: "",
        shipperName: "",
        transportationMode: "",
        agentId: -1,
        consigneeId: -1,
        issuingCompanyId: -1,
        shipperId: -1,
        transportationModeId: -1
      },
      chargesInfo: {},
      orderStates: [
        {
          label: "NEW",
          active: true
        },
        {
          label: "PRINCIPAL INFO",
          active: false
        },
        {
          label: "COMMODITIES",
          active: false
        },
        {
          label: "CHARGES",
          active: false
        },
        {
          label: "DISPATCHED",
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
      hasShippment: false,
      summary: {
        pcs: 0,
        weight: 0,
        volume: 0,
        volWeight: 0,
        income: 0,
        expense: 0,
        profit: 0
      },
      showAttachmentModal: false
    };
  }

  onDetailsChange = e => {
    this.setState({
      detailsInfo: e
    });
  };

  onChargesChange = e => {
    this.setState(
      {
        chargesInfo: e,
        charges: e
      },
      () => {
        this.calculateSummary();
      }
    );
  };

  componentDidMount = () => {
    const orderId = this.props.match.params.id;

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.props.cookies.get("token", { path: "/" })}`;

    axios.get(`${ApiServer}/api/v1/order_state`).then(data => {
      let order_states = data.data;
      this.setState({
        orderStates: order_states.map(state => {
          return {
            label: state.name,
            state_id: state.id,
            active: false
          };
        })
      });
    });

    axios.get(`${ApiServer}/api/v1/shippment/${orderId}`).then(data => {
      if (!!data && !!data.data) {
        let shippment = data.data.shippment_detail;
        let commodities = data.data.commodities;
        let charges = data.data.charges;
        let order = data.data.order;
        let hasshippment = true;

        if (!!shippment) {
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
            transportationModeId: shippment.mode_of_transportation_id
          };

          console.log("DETAILS INFO ::::  >>>>>>>>>>>>>");
          console.log(detailsInfo);

          this.setState(
            {
              detailsInfo: detailsInfo,
              commodities: commodities,
              charges: charges,
              shippId: !!shippment ? shippment.id : -1,
              hasShippment: hasshippment,
              order: order
            },
            () => {
              this.calculateCurrentStepProgress();
              this.calculateSummary();
            }
          );
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

  calculateCurrentStepProgress = () => {
    const { order, orderStates } = this.state;
    for (let i = 0; i < orderStates.length; i++) {
      let state = orderStates[i];
      orderStates[i].active = true;
      if (state.label === order.order_state_name) {
        break;
      }
    }
    this.setState({
      orderStates: orderStates
    });
  };

  calculateSummary = () => {
    const { commodities, charges, summary } = this.state;

    let summ = {
      pcs: 0,
      weight: 0,
      volume: 0,
      volWeight: 0,
      income: 0,
      expense: 0,
      profit: 0
    };

    if (!!commodities && commodities.length > 0) {
      console.log(commodities);
      for (let i = 0; i < commodities.length; i++) {
        let c = commodities[i];

        if (c.commodity.commodity_type_id == 1) {
        } else if (c.commodity.commodity_type_id == 2) {
          summ.weight += Number(c.artifact.total_weight);
          summ.volWeight += Number(c.artifact.vol_weight);
          summ.volume += Number(c.artifact.volume);
        }
        summ.pcs += parseInt(c.commodity.pieces);
      }
    }
    if (!!charges && charges.length > 0) {
      console.log(charges);
      let amount_income = 0;
      let amount_expense = 0;
      for (let i = 0; i < charges.length; i++) {
        let c = charges[i];
        if (c.custom_id === 1) {
          // Income
          amount_income += Number(c.rate) * Number(c.amount) + Number(c.amount);
        } else if (c.custom_id === 2) {
          // Expense
          amount_expense +=
            Number(c.rate) * Number(c.amount) + Number(c.amount);
        }
        summ.pcs += parseInt(c.quantity);
      }
      summ.income = amount_income;
      summ.expense = amount_expense;
      summ.profit = amount_income - amount_expense;
    }

    this.setState({
      summary: summ
    });
  };

  handleSaveShippment = () => {
    const { detailsInfo, commodities, orderId } = this.state;

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

        axios
          .post(`${ApiServer}/api/v1/order/create_shippment`, orderShippmentDto)
          .then(
            data => {
              console.log(data);
              this.props.addNotification(
                "Process has completed",
                "Shipment was saved sucessfully.",
                2000,
                NOTIFICATION_TYPES.SUCCESS
              );
              this.setState({
                isSavingShipment: false,
                hasShippment: true
              });
            },
            err => {
              this.props.addNotification(
                "Process has completed",
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

  handleAddAttachment = () => {
    this.setState({
      showAttachmentModal: true
    });
  };

  onCloseModal = modal => {
    this.setState({
      [modal]: false
    });
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
    this.setState(
      {
        commodities: commodities
      },
      () => {
        this.calculateSummary();
      }
    );
  };

  updateOrderStatus = step => {
    let state_id = step.state_id;
    const { orderId } = this.state;
    axios
      .patch(`${ApiServer}/api/v1/order?id=${orderId}&state_id=${state_id}`)
      .then(data => {
        this.props.addNotification(
          "Process has completed",
          "Order state was updated succesfully!",
          2000,
          NOTIFICATION_TYPES.SUCCESS
        );
      });
  };

  onSaveAttchments = attachments => {
    console.log(attachments);
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
      hasShippment,
      summary,
      showAttachmentModal
    } = this.state;

    const tabOptions = [
      {
        label: "Details",
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
        label: "Commodities",
        disabled: !hasShippment,
        item: (
          <CommoditiesOption
            cookies={this.props.cookies}
            commodities={commodities}
            orderId={orderId}
            shippId={shippId}
            addNotification={this.props.addNotification}
            onCommoditiesChange={this.onCommoditiesChange}
            recalculateSummary={this.calculateSummary}
          />
        )
      },
      {
        label: "Charges",
        disabled: !hasShippment,
        item: (
          <ChargesOption
            cookies={this.props.cookies}
            handleChange={this.onChargesChange}
            charges={charges}
            orderId={orderId}
            shippId={shippId}
            addNotification={this.props.addNotification}
            recalculateSummary={this.calculateSummary}
          />
        )
      },
      {
        label: "Road path",
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
              {" "}
              <CircularProgress />{" "}
            </LoadingWrapper>
          ) : (
            <>
              <OrderPrincipalInfo
                handleSaveShippment={this.handleSaveShippment}
                handleAddAttachment={this.handleAddAttachment}
                orderId={orderId}
              />
              <div
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  width: "100%"
                }}
              >
                <ProgressStep
                  updateOrderStatus={this.updateOrderStatus}
                  steps={this.state.orderStates}
                />
              </div>
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <div style={{ width: "70%", height: "auto" }}>
                  <TabsComponent options={tabOptions} />
                </div>
                <div style={{ width: "30%", margin: "15px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <OrderSummary summary={summary} />
                    {/* <RouteDisplay /> */}
                  </div>
                </div>
              </div>
              <PPGModal
                setOpen={showAttachmentModal}
                handleClose={() => this.onCloseModal("showAttachmentModal")}
                width="65%"
                height="75%"
              >
                <AddAttachment
                  handleCancel={() => this.onCloseModal("showAttachmentModal")}
                  handleSave={this.onSaveAttchments}
                />
              </PPGModal>
            </>
          )}
        </BaseComponent>
      </>
    );
  }
}

export default withRouter(OrderDetail);
