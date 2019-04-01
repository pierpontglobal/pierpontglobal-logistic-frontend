/* global google */
import React, { Component } from 'react';
import Script from 'react-load-script';
import { GOOGLE_API_KEY } from '../../Defaults';

class GooglePlaceSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      query: '',
      placeId: '',
      photos: [],
      geometry: {},
      icon: '',
      name: '',
      vicinity: '',
      website: ''
    };
  }

  componentDidMount = () => {
    var options = { types: [`establishment`, `geocode`] };

    // Initialize Google Autocomplete
    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById(`autocomplete`),
      options
    );
    // Fire Event when a suggested name is selected
    this.autocomplete.addListener(`place_changed`, this.handlePlaceSelect);
  };

  handlePlaceSelect = () => {
    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    console.log('Selected place:');
    console.log(addressObject);
    let address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      this.setState(
        {
          city: address[0].long_name,
          query: addressObject.formatted_address,
          placeId: addressObject.place_id,
          photos: !!addressObject.photos
            ? addressObject.photos.map(photo => photo.getUrl())
            : [],
          geometry: addressObject.geometry,
          icon: addressObject.icon,
          name: addressObject.name,
          vicinity: addressObject.vicinity,
          website: addressObject.website
        },
        () => {
          // Propagate state to parent
          this.props.handleSelectedPlace(this.state);
        }
      );
    }
  };

  handleChange = e => {
    this.setState({
      query: e.target.value
    });
  };

  render() {
    return (
      <>
        <input
          id="autocomplete"
          placeholder=""
          placeholder="Search Place"
          value={this.state.query}
          onChange={this.handleChange}
          style={{
            margin: '0 auto',
            padding: '8px',
            width: '400px',
            maxWidth: '1200'
          }}
        />
      </>
    );
  }
}

export default GooglePlaceSearch;
