import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const mapStyle = {
  height: "100%",
  width: "100%",
};

export class GoogleMap extends Component {
  render() {
    return (
      <Map
        style={mapStyle}
        google={this.props.google}
        initialCenter={{
          lat: 22.8456,
          lng: 89.5403,
        }}
        zoom={14}
      >
        <Marker onClick={this.onMarkerClick} name={"Current location"} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD7sLlIcLeAvJcNKMX3mzD1xKDSUnCeOgY",
})(GoogleMap);
