import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const styles = {
  map: {
    height: '100vh',
    width: '60vw'
  },
  form: {
    position: 'absolute'
  }
}

class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      clickPoint: {}
    }
  }

  drawDiv () {
    const {clickPoint} = this.state;
    return (
      <div style={{
        position: 'absolute',
        left: clickPoint.x,
        top: clickPoint.y,
        zIndex: 999
      }}>
        <form>
          <input type="text" />
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

  render() {
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

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCFk0soJVUBdIknCgeuz7qWxEx90y9LyOs'
})(MapContainer)
