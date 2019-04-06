import React from 'react';
import styled from 'styled-components';
import { hidden, white } from 'ansi-colors';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@material-ui/core/TextField';

const IconTitledInput = styled.div`
  background: white;
  flex-grow: 2;
  height: 100%;
  display: flex;
  padding: 2px 10px;
  flex-direction: column;
`;

const LabelInput = styled.p`
  color: rgb(68, 39, 95);
  font-weight: 200;
  justify-self: flex-start;
  margin: 0;
  text-align: left;
`;

const InputHolder = styled.div`
  margin-top: 24px;
  border-radius: 7px;
  overflow: hidden;
  width: 150%;
  height: 50px;
  display: flex;
`;

const Point = styled.i`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
  font-weight: 600;
  color: ${props => props.color};
  height: 35px;
  line-height: 35px;
  font-style: normal;
  width: 20%;
`;

const InputText = styled.input`
  outline: none;
  width: 80%;
  border: none;
  font-family: Rubik;
  font-weight: 100;
`;

function InputComplete(props) {
  return (
    <IconTitledInput style={props.style}>
      <InputText style={{ width: '100%' }} placeholder={props.placeholder} />
    </IconTitledInput>
  );
}

const DatePicker = styled(TextField)``;

function InputDate(props) {
  return (
    <IconTitledInput style={props.style}>
      <TextField
        id="date"
        label="Ready to load"
        type="date"
        defaultValue="2017-05-24"
        disableUnderline={true}
        InputLabelProps={{
          shrink: true
        }}
      />
    </IconTitledInput>
  );
}

function InputDeliveryType(props) {
  return (
    <IconTitledInput style={props.style}>
      <TextField
        label="Type of container"
        select
        value={1}
        InputLabelProps={{
          shrink: true
        }}
      >
        <option key={1} value={1}>
          Container 1
        </option>
        <option key={2} value={2}>
          Container 2
        </option>
        <option key={3} value={3}>
          Container 3
        </option>
      </TextField>
    </IconTitledInput>
  );
}

class OriginDestination extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <InputHolder>
        <InputComplete
          placeholder="Origin of shipment"
          icon="A"
          color="limegreen"
          label="ORIGIN OF SHIPMENT"
          style={{
            borderRight: 'solid 1px rgb(68, 39, 95)',
            display: 'flex',
            justifyContent: 'center'
          }}
        />
        <InputComplete
          placeholder="Destination of shipment"
          icon="B"
          color="orangered"
          label="DESTINATION OF SHIPMENT"
          style={{
            borderRight: 'solid 1px rgb(68, 39, 95)',
            display: 'flex',
            justifyContent: 'center'
          }}
        />
        <InputDate
          label="READY TO LOAD"
          style={{ borderRight: 'solid 1px rgb(68, 39, 95)', flexGrow: 1.5 }}
        />
        <InputDeliveryType label="TYPE OF DELIVERY" />

        <button
          type="button"
          style={{
            borderRadius: '0',
            paddingLeft: '30px',
            paddingRight: '30px'
          }}
          className=" btn-custom navbar-btn"
        >
          <i style={{ color: 'white' }} className="pe-7s-search" /> Search
        </button>
      </InputHolder>
    );
  }
}

export default OriginDestination;
