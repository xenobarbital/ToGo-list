import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import {connect} from 'react-redux';
import ActionCreators, {VisibilityFilters} from '../redux/actions';
import uuidv1 from 'uuid/v1';

const mapStateToProps = state => ({state});
const mapDispatchToProps = dispatch => ({
  addPlace: place => dispatch(ActionCreators.addPlace(place)),
});
const {SHOW_ALL, SHOW_VISITED, SHOW_UNVISITED} = VisibilityFilters;

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
      }, () => console.log('State updated', this.props.state))
    }
  }

  renderMarkers = arr => {
    return arr.map(e => (
      <Marker
        style={{color: 'blue'}}
        title={e.description}
        position={{lat: e.lat, lng: e.lng}}
        key={e.id}
      />
    ));
  }

  filterPlaces = () => {
    const {state} = this.props;
    if (state.highlighted) {
      const list = state.places.filter(e => e.id === state.highlighted);
      return this.renderMarkers(list);
    } else if (state.filterKey) {
      const list = state.places.filter(e => {
        return e.description.includes(state.filterKey)
      });
      return this.renderMarkers(list);
    } else if (state.visibilityFilter !== SHOW_ALL) {
      const list = state.places.filter(e => {
        if (state.visibilityFilter === SHOW_VISITED) {
          return e.visited;
        }
        return !e.visited;
      });
      return this.renderMarkers(list);
    } else {
      return this.renderMarkers(state.places);
    }
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
