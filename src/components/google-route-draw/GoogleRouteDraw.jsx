/* global google */
import React, { Component } from 'react';
import Script from 'react-load-script';
import { GOOGLE_API_KEY } from '../../Defaults';
import AUTO_ICON from '../../assets/images/auto_marker_image.png';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const DirectionsPanelInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

class GoogleRouteDraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: this.props.from,
      to: this.props.to,
      fromLoc: {
        lat: 45.89,
        lng: 49.78
      },
      toLoc: {
        lat: 78.98,
        lng: 99.87
      },
      wayPoints: this.props.wayPoints,
      travelMode: 'DRIVING',
      autoDriveSteps: [],
      copyAutoDriveSteps: []
    };

    this.map = null;
    this.directionsService = null;
    this.directionsDisplay = null;

    // Speed of the animated marker. This will determine the quantity of points grabbed between
    // Origin and destination. The minor it is, the more points it gets, but slower it's
    this.speedFactor = 300;

    // This value is the animation framer for the marker
    this.markerDelay = 65;

    this.marker = null;

    this.autoDriveTimer = null;
  }

  componentWillUnmount = () => {
    clearInterval(this.autoDriveTimer);
  };

  handleScriptLoad = () => {
    const { fromLoc, toLoc } = this.state;
    /*global google*/
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.map = new google.maps.Map(document.getElementById('maporders'), {
      zoom: 6,
      center: { lat: 41.85, lng: -87.65 }
    });
    this.directionsDisplay.setMap(this.map);

    this.calculateAndDisplayRoute(
      this.directionsService,
      this.directionsDisplay
    );

    if ((!!fromLoc, toLoc)) {
      this.throwMarker();
      setTimeout(() => {
        this.startRouteAnimation(this.marker, this.state.autoDriveSteps);
      }, 3000);
    }
  };

  throwMarker = () => {
    /*global google*/
    let icon = {
      url: AUTO_ICON,
      scaledSize: new google.maps.Size(30, 30)
    };
    this.marker = new google.maps.Marker({
      map: this.map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      icon: icon
    });
    this.marker.addListener('click', this.toggleBounce(this.marker));
  };

  toggleBounce = marker => {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  };

  calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
    const { from, to, wayPoints, travelMode, autoDriveSteps } = this.state;
    let waypts = wayPoints;

    console.log(this.state);

    directionsService.route(
      {
        origin: from,
        destination: to,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: travelMode
      },
      (response, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          let route = response.routes[0];

          // Get routes points for marker animation
          // calculate positions for the animation steps
          // the result is an array of LatLng, stored in autoDriveSteps
          let remainingSeconds = 0;
          let leg = route.legs[0]; // supporting single route, single legs currently
          leg.steps.forEach(step => {
            var stepSeconds = step.duration.value;
            var nextStopSeconds = this.speedFactor - remainingSeconds;
            while (nextStopSeconds <= stepSeconds) {
              let nextStopLatLng = this.getPointBetween(
                step.start_location,
                step.end_location,
                nextStopSeconds / stepSeconds
              );
              autoDriveSteps.push(nextStopLatLng);
              nextStopSeconds += this.speedFactor;
            }
            remainingSeconds = stepSeconds + this.speedFactor - nextStopSeconds;
          });
          if (remainingSeconds > 0) {
            autoDriveSteps.push(leg.end_location);
          }

          // Fill panel below map
          let summaryPanel = document.getElementById('directions-panel');
          if (!!summaryPanel) {
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
              var routeSegment = i + 1;
              summaryPanel.innerHTML +=
                '<b>Route Segment: ' + routeSegment + '</b><br>';
              summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
              summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
              summaryPanel.innerHTML +=
                route.legs[i].distance.text + '<br><br>';
            }
          }
          this.setState({
            autoDriveSteps: autoDriveSteps,
            copyAutoDriveSteps: [...autoDriveSteps]
          });
        } else {
          console.log('Directions request failed due to ' + status);
        }
      }
    );
  };

  // helper method to calculate a point between A and B at some ratio
  getPointBetween = (a, b, ratio) => {
    /*global google*/
    return new google.maps.LatLng(
      a.lat() + (b.lat() - a.lat()) * ratio,
      a.lng() + (b.lng() - a.lng()) * ratio
    );
  };

  repeatAnimation = () => {
    this.startRouteAnimation(this.marker, [...this.state.copyAutoDriveSteps]);
  };

  // start the route simulation
  startRouteAnimation = async (marker, autoDriveSteps) => {
    this.autoDriveTimer = setInterval(() => {
      if (autoDriveSteps.length === 0) {
        clearInterval(this.autoDriveTimer);
        this.repeatAnimation();
      } else {
        let position = new google.maps.LatLng(
          autoDriveSteps[0].lat(),
          autoDriveSteps[0].lng()
        );
        marker.setPosition(position);
        autoDriveSteps.shift();
      }
      this.setState({
        autoDriveSteps: [...autoDriveSteps]
      });
    }, this.markerDelay);
  };

  render() {
    return (
      <>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
          onLoad={this.handleScriptLoad}
        />
        <Paper style={{ padding: '12px', marginBottom: '8px' }}>
          <div
            id="maporders"
            style={{ width: '100%', overflow: 'scroll', height: '400px' }}
          />
          <DirectionsPanelInfo id="directions-panel" />
        </Paper>
      </>
    );
  }
}

export default GoogleRouteDraw;
