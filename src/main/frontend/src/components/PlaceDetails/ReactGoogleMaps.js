import _ from "lodash";
import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={15} defaultCenter={{ lat: props.coordinate.latitude, lng: props.coordinate.longitude }}>
    <Marker position={{ lat: props.coordinate.latitude, lng: props.coordinate.longitude }} />
  </GoogleMap>
));

const enhance = _.identity;

const ReactGoogleMaps = (props) =>
  <MyMapComponent key="map" coordinate={props.coordinate}/>


export default enhance(ReactGoogleMaps);
