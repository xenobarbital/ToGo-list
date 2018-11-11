import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
  height: '100vh',
  width: '60vw'
}

class MapContainer extends Component {
  drawDiv () {
    return (
      <div style={{position: 'absolute', zInde: 999, top: '48%', left: '48%'}}>
        OLOLO
      </div>
    )
  }

  render() {
    return (
      <Map
        style={mapStyles}
        google={this.props.google}
        zoom={14}
        onClick={(p, m, e) => console.log('Event!', e)}
      >
        {this.drawDiv()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCFk0soJVUBdIknCgeuz7qWxEx90y9LyOs'
})(MapContainer)
