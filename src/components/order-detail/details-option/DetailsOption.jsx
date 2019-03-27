import React from 'react';
import MainOptionTab from './main-option-tab/MainOptionTab';

function DetailsOption(props) {
  const { orderId } = props;
  return(
    <>
      <MainOptionTab handleChange={props.handleChange} orderId={orderId} />
    </>
  );
}

export default DetailsOption;