/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import produce from 'immer';
import {
  GoogleMap, LoadScript, Marker, InfoWindow,
} from '@react-google-maps/api';
import { IconButton } from '@chakra-ui/react';
import { FaLocationArrow } from 'react-icons/fa';
import Geocode from 'react-geocode';

const API_KEY = 'AIzaSyAHhZ91pAYs8u91Jeqk7bsLI5QmpuwBjCc';
Geocode.setApiKey(API_KEY);
Geocode.setLanguage('en');
Geocode.setRegion('us');
Geocode.setLocationType('ROOFTOP');
Geocode.enableDebug();

// useJsApiLoader provides us a hook with a variable called is loaded which tells us whether the
// map script is loaded on the browser r not
// eslint-disable-next-line no-multi-assign
const google = window.google = window.google ? window.google : {};

const containerStyle = {
  width: window.width,
  height: window.innerHeight,
};

const mystyle = [
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

// const { google } = window;
// let maps;

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 43.700859,
      longitude: -72.289398,
      map: (/** @type google.maps.Map */ null),
      places: [],
      // eslint-disable-next-line react/no-unused-state
      first: 0,
      searchText: '',

    };
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState(
        produce((draftstate) => {
          draftstate.latitude = position.coords.latitude;
          draftstate.longitude = position.coords.longitude;
        }),
      );
    });
  }

  moveMap = () => {
    console.log(this.state.latitude, this.state.longitude);
    this.state.map.panTo({ lat: this.state.latitude, lng: this.state.longitude });
    this.state.map.setZoom(15);
  };

  render() {
    if (this.props.searchText !== this.state.searchText) {
      this.setState(
        produce((draftstate) => {
          draftstate.searchText = this.props.searchText;
          draftstate.places = [];
          draftstate.first = 0;
        }),
      );
    }

    const findLoc = (location, price) => {
      Geocode.fromAddress(location).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          if (typeof lat === 'number' && !Number.isNaN(lat) && !Number.isInteger(lat)) {
            if (typeof lng === 'number' && !Number.isNaN(lng) && !Number.isInteger(lng)) {
              if (this.state.places.length < this.props.searched.length) {
                this.setState(
                  produce((draftstate) => {
                    console.log('arrived herer');
                    draftstate.places = [...draftstate.places, { lat, lng, price }];
                  }),
                );
              }
            }
          }
        },
      );

      // eslint-disable-next-line array-callback-return
      // this.state.places.map((place) => {
      //   console.log('after done ', place.lat, place.lng);
      // });
      // console.log('after done ', this.state.places.length);
    };

    const start = () => {
      return (Array.isArray(this.props.searched));
    };

    if (start() && this.props.searched.length > 0) {
      this.props.searched.map((post) => {
        const location = `${post.street} ${post.city} ${post.state} USA ${post.zipcode}`;
        findLoc(location, post.price);

        return null;
      });
    }

    const nodes = this.state.places.map((place) => {
      if (typeof place.lat === 'number' && !Number.isNaN(place.lat) && !Number.isInteger(place.lat)) {
        if (typeof place.lng === 'number' && !Number.isNaN(place.lng) && !Number.isInteger(place.lng)) {
          return (

            <InfoWindow
              position={{ lat: place.lat, lng: place.lng }}
            >
              <div className="nods">
                <p className="price">${place.price}</p>
              </div>
            </InfoWindow>

          );
        }
        return null;
      } else {
        return null;
      }
    });

    if (this.state.first < 10 && this.state.map !== null) {
      this.moveMap();
      this.setState(
        produce((draftstate) => {
          draftstate.first += draftstate.first + 1;
        }),
      );
    }
    return (

      <div className="map">
        <IconButton
          aria-label="center back"
          icon={<FaLocationArrow />}
          isRound
          onClick={this.moveMap}
        />

        <LoadScript
          googleMapsApiKey={API_KEY}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: this.state.latitude, lng: this.state.longitude }}
            zoom={14}
            options={{
              zoomControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              streetViewControl: false,
              styles: mystyle,

            }}
            onLoad={(map) => this.setState(
              produce((draftstate) => {
                draftstate.map = map;
              }),
            )}
          >

            <Marker position={{ lat: this.state.latitude, lng: this.state.longitude }} />
            {nodes}

          </GoogleMap>
        </LoadScript>
      </div>

    );
  }
}

const mapStateToProps = (reduxState) => ({
  searched: reduxState.posts.searched,
  searchText: reduxState.posts.searchText,
}
);

export default connect(mapStateToProps, null)(Location);
