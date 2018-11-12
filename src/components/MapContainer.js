import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {connect} from 'react-redux';
import ActionCreators from '../redux/actions';
import uuidv1 from 'uuid/v1';

const mapStateToProps = state => ({state});

const mapDispatchToProps = dispatch => ({
  addPlace: place => dispatch(ActionCreators.addPlace(place)),
});

const styles = {
  map: {
    height: '100vh',
    width: '60vw'
  },
  form: {
    position: 'absolute'
  }
}

class ConnectedMap extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      clickPoint: {},
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
    console.log('Event!', e.oa, e.pixel);
    if (!this.state.showForm) {
      this.setState({
        showForm: true,
        clickPoint: {...e.pixel},
      })
    } else {
      this.setState({
        showForm: false,
        clickPoint: {}
      })
    }
  }

  handleChange = e => {

  }

  handleSubmit = e => {
    e.preventDefault();
  }

  render = () => {
    const {showForm} = this.state;
    return (
      <Map
        style={styles.map}
        google={this.props.google}
        zoom={14}
        onClick={this.handleClick}
      >
        {showForm ? this.drawDiv() : 0}
      </Map>
    );
  }
}

const MapContainer = connect(mapStateToProps, mapDispatchToProps)(ConnectedMap);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCFk0soJVUBdIknCgeuz7qWxEx90y9LyOs'
})(MapContainer)
