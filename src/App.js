import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import List from './components/List';

const styles = {
  map: {
    height: '100vh',
    width: '60vw',
    overflow: 'hidden',
    position: 'relative'
  }
}

export default class App extends Component {
  render() {
    return (
      <div id="blagaga">
        <div id="map" style={styles.map}>
          <MapContainer />
        </div>
        <List />
      </div>
    );
  }
}
