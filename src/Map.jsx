import React from "react";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  DirectionsRenderer,
  KmlLayer,
} from "react-google-maps";
import { withProps, compose, lifecycle } from "recompose";

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA_rtOADiUmm7w1ueQv0JId_HZeBUr82Lc&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: 'Delhi railway station, KH-758, Siraspur Road, Sector 18, Rohini, Delhi, Delhi',
          // origin: new google.maps.LatLng(28.026400, 79.134903),
          destination: 'Jaipur, Rajasthan',
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
            console.log('====================================');
            console.log(result.routes[0].legs[0].distance.text);
            console.log(result.routes[0].legs[0].duration.text);
            console.log('====================================');
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  })
)(props => (
  <GoogleMap
    defaultZoom={10}
    defaultCenter={new google.maps.LatLng(-37.8136, 144.9631)}
    options={{
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    }}
  >
    <KmlLayer
      url="http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml"
      options={{ preserveViewport: true }}
    />
    {props.directions && props.directions.routes[0].legs[0].distance.text}
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

// class Map extends React.Component {
//   render() {
//     return (
//       <React.Fragment>
//         <MapWithADirectionsRenderer />
//       </React.Fragment>
//     );
//   }
// }

const Map = () => {
  return (
    <React.Fragment>
      <MapWithADirectionsRenderer />
    </React.Fragment>
  )
}

export default Map;
