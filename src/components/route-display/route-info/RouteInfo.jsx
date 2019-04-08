/* global google */
import React, { Component } from "react";

const RouteSelector = ({ addresses, onAddressChanged }) => {
  return (
    <div>
      <strong>Start: </strong>
      <select
        onChange={e =>
          onAddressChanged({ type: "start", value: e.target.value })
        }
      >
        <option>-- Select start address--</option>
        {addresses.map((address, i) => {
          return (
            <option key={`${i}_start`} value={address.value}>
              {address.text}
            </option>
          );
        })}
      </select>
      <strong>End: </strong>
      <select
        onChange={e => onAddressChanged({ type: "end", value: e.target.value })}
      >
        <option>-- Select end address--</option>
        {addresses.map((address, i) => {
          return (
            <option key={`${i}_end`} value={address.value}>
              {address.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

class RouteInfo extends Component {
  constructor(props) {
    super(props);
    this.directionsPanelRef = React.createRef();
  }

  componentDidMount() {
    /* global google */
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsService = new google.maps.DirectionsService();

    this.directionsDisplay.setPanel(this.directionsPanelRef.current);

    this.request = {
      origin: "",
      destination: "",
      travelMode: google.maps.TravelMode.DRIVING
    };
  }

  calcRoute(changedAddress) {
    if (changedAddress.type === "start")
      this.request.origin = changedAddress.value;
    else this.request.destination = changedAddress.value;

    this.directionsService.route(this.request, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        console.log("Directions request failed due to " + status);
      }
    });
  }

  render() {
    return (
      <div>
        <RouteSelector
          addresses={this.props.addresses}
          onAddressChanged={this.calcRoute.bind(this)}
        />
        <div style={{ maxHeight: "350px", overflowY: "scroll" }}>
          <div ref={this.directionsPanelRef} />
        </div>
      </div>
    );
  }
}

export default RouteInfo;
