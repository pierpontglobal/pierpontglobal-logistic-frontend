import React from 'react';
import MainOptionTab from './main-option-tab/MainOptionTab';

function DetailsOption(props) {
  const { orderId, detailsInfo } = props;
  return (
    <>
      <MainOptionTab
        handleChange={props.handleChange}
        detailsInfo={detailsInfo}
        orderId={orderId}
      />
    </>
  );
}

export default DetailsOption;
