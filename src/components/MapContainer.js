import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import {connect} from 'react-redux';
import ActionCreators from '../redux/actions';
import uuidv1 from 'uuid/v1';

const mapStateToProps = state => ({state});
const mapDispatchToProps = dispatch => ({
  addPlace: place => dispatch(ActionCreators.addPlace(place)),
});

class ConnectedMap extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      clickPoint: {},
      lat: 0,
      lng: 0,
      value: ''
    }
  }

  drawDiv = () => {
    const {clickPoint} = this.state;
    return (
      <div style={{
        position: 'absolute',
        left: clickPoint.x,
        top: clickPoint.y,
        zIndex: 999
      }}>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            placeholder={'Input description'}
            value={this.state.value}
            autoFocus
          />
        </form>
      </div>
    )
  }

  handleClick = (p, m, e) => {
    if (!this.state.showForm) {
      this.setState({
        showForm: true,
        clickPoint: {...e.pixel},
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      })
    } else {
      this.setState({
        showForm: false,
        clickPoint: {},
        clickLocation: {}
      })
    }
  }

  handleChange = e => {
    this.setState({value: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value){
      const place = {
        description: this.state.value,
        lng: this.state.lng,
        lat: this.state.lat,
        id: uuidv1(),
        visited: false
      };
      this.props.addPlace(place);
      this.setState({
        showForm: false,
        value: ''
      })
    }
  }

  renderMarkers = arr => {
    return arr.map(e => (
      <Marker
        style={{color: 'blue'}}
        title={e.description}
        position={{lat: e.lat, lng: e.lng}}
      />
    ));
  }

  filterPlaces = () => {
    const {state} = this.props;
    if (state.highlighted) {
      const list = state.places.filter(e => e.id === state.highlighted);
      return this.renderMarkers(list);
    } else {
      return this.renderMarkers(state.places);
    }
  }

  //diagnostics
  componentDidUpdate() {
    // console.log('State', this.props.state)
  }

  render = () => {
    const {showForm} = this.state;
    // const {google} = this.props;
    return (
      <Map
        google={this.props.google}
        zoom={14}
        onClick={this.handleClick}
      >
        {showForm ? this.drawDiv() : 0}
        {this.filterPlaces()}
      </Map>
    );
  }
}

const MapContainer = connect(mapStateToProps, mapDispatchToProps)(ConnectedMap);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCFk0soJVUBdIknCgeuz7qWxEx90y9LyOs'
})(MapContainer)
