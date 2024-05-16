import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  CircleF,
} from "@react-google-maps/api";

const containerStyle = {
  width: "2000px",
  height: "600px",
};

const fallbackCoordinates = {
  lat: 44.4304,
  lng: 26.10529,
};

const points = [
  {
    lat: 44.4204,
    lng: 26.10329,
  },
  {
    lat: 44.4304,
    lng: 26.13329,
  },
  {
    lat: 44.4305,
    lng: 26.10329,
  },
];

function Map({ userCoordinates, radius }) {
  const coords = userCoordinates.lat ? userCoordinates : fallbackCoordinates;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCsLIRxYGykQSLKoFkgNWmNVgd05fdXMxs",
  });

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(coords);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coords}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      <CircleF center={coords} radius={radius} />
      <MarkerF position={coords} />
      {/* {points.map((point, i) => (
                <MarkerF position={point} />
            ))} */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
