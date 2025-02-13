import React from 'react';
import MainOptionTab from './main-option-tab/MainOptionTab';

function DetailsOption(props) {
  const {
    orderId,
    detailsInfo,
    issuingCompanies,
    shippers,
    consignees,
    agents,
    transports
  } = props;
  return (
    <>
      <MainOptionTab
        handleChange={props.handleChange}
        handleShipperChange={props.shipperChange}
        handleConsigneeChange={props.consigneeChange}
        handleAgentChange={props.agentChange}
        handleTransportChange={props.transportChange}
        handleIssuingCompanyChange={props.issuingCompanyChange}
        detailsInfo={detailsInfo}
        orderId={orderId}
        issuingCompanies={issuingCompanies}
        shippers={shippers}
        consignees={consignees}
        agents={agents}
        transports={transports}
      />
    </>
  );
}

export default DetailsOption;
