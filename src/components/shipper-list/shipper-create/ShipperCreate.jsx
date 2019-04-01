import React, { Component } from 'react';
import GooglePlaceSearch from '../../google-place-search/GooglePlaceSearch';
import BaseComponent from '../../base-component/BaseComponent';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Paper, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { ApiServer } from '../../../Defaults';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class ShipperCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeSelected: false,
      place: {},
      customPlaceName: ''
    };
  }

  componentDidMount = () => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${this.props.cookies.get('token', { path: '/' })}`;
  };

  selectedPlace = place => {
    console.log('Selected place::::    >>>');
    console.log(place);
    if (!!place) {
      this.setState({
        placeSelected: true,
        place: place
      });
    }
  };

  goBack = () => {
    this.props.history.push('/shippers');
  };

  createShipper = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        // MAKE API CALL TO SAVE SHIPPER TO LOGISTICS DATABASE
        const { place, customPlaceName } = this.state;
        let placeLocation =
          place.geometry.location.lat() + ',' + place.geometry.location.lng();
        axios
          .post(`${ApiServer}/api/v1/shipper`, {
            shipper: {
              name: place.name,
              location: placeLocation,
              address: place.query,
              website: place.website,
              vicinity: place.vicinity,
              custom_name: customPlaceName,
              city: place.city,
              place_id: place.placeId
            }
          })
          .then(data => {
            this.setState(
              {
                isLoading: false,
                customPlaceName: ''
              },
              () => {
                this.props.history.push('/shippers');
              }
            );
          });
      }
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <BaseComponent>
        <div style={{ minHeight: '300px' }}>
          <div>
            <span style={{ fontSize: '1.3rem', fontWeight: '600' }}>
              Add a new shipper
            </span>
          </div>
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div style={{ marginBottom: '12px' }}>
              <span
                style={{
                  fontWeight: '600',
                  fontSize: '1.05rem',
                  marginRight: '13px'
                }}
              >
                Locate Shipper
              </span>
            </div>
            <GooglePlaceSearch handleSelectedPlace={this.selectedPlace} />
          </div>
          {this.state.placeSelected && !!this.state.place ? (
            <div
              style={{
                marginTop: '25px',
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between'
              }}
            >
              <Paper
                style={{
                  width: '100%',
                  padding: '12px',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>
                      Place information
                    </span>
                  </div>
                  <div style={{ maxWidth: '600px', overflow: 'scroll' }}>
                    <div>{this.state.place.placeId}</div>
                    <div>{this.state.place.query}</div>
                    <div>{this.state.place.city}</div>
                    <div>
                      <img
                        width="30px"
                        height="30px"
                        src={this.state.place.icon}
                      />
                    </div>
                    <div>
                      {this.state.place.geometry.location.lat()}
                      {this.state.place.geometry.location.lng()}
                    </div>
                    <div>{this.state.place.name}</div>
                    <div>{this.state.place.vicinity}</div>
                    <div>{this.state.place.website}</div>
                  </div>
                </div>
              </Paper>
              <Paper>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignContent: 'center'
                    }}
                  >
                    <div
                      style={{ margin: '12px' }}
                      style={{ width: '220px', height: '210px' }}
                    >
                      {!!this.state.place.photos ? (
                        <Carousel
                          showThumbs={false}
                          showIndicators={false}
                          style={{ width: '100%', height: '100%' }}
                        >
                          {this.state.place.photos.map((placeImg, index) => (
                            <div key={index} style={{ width: '100%' }}>
                              <img
                                src={placeImg}
                                style={{ maxHeight: '210px' }}
                              />
                            </div>
                          ))}
                        </Carousel>
                      ) : (
                        'No photos to show for this place'
                      )}
                    </div>
                  </div>
                </div>
              </Paper>
            </div>
          ) : null}
          <div
            style={{
              width: '100%',
              margin: '18px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.goBack}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!this.state.placeSelected}
              className={classes.button}
              onClick={this.createShipper}
            >
              Save
            </Button>
          </div>
        </div>
      </BaseComponent>
    );
  }
}

export default withStyles(styles)(withRouter(ShipperCreate));
