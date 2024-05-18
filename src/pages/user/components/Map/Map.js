import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Hotel } from "lucide-react";

import mapStyles from "./mapStyles";
import useStyles from "./styles.js";

const Map = ({ hotels, coords, setChildClicked, radius }) => {
  const matches = useMediaQuery("(min-width:600px)");
  const classes = useStyles();
  const [circle, setCircle] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (marker) {
      marker.setPosition(coords);
    }
    // Update circle radius when radius prop changes
    if (circle) {
      circle.setRadius(radius);
      circle.setCenter(coords);
    }
  }, [radius, coords]);

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyA5CmH402pzq5p59qUKRM3yYuvLKKlKOuQ" }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={13}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          const newCircle = new maps.Circle({
            strokeColor: "green",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "var(--primary)",
            fillOpacity: 0.35,
            map,
            center: coords,
            radius: radius,
          });
          setCircle(newCircle);
          const newMarker = new maps.Marker({
            position: coords,
            map,
          });
          setMarker(newMarker);
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {hotels.length &&
          hotels.map((hotel, i) => (
            <div
              key={i}
              className={classes.markerContainer}
              lat={Number(hotel.latitude)}
              lng={Number(hotel.longitude)}
            >
              {!matches ? (
                <Hotel />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                    className={classes.typography}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {" "}
                    {hotel.name}{" "}
                  </Typography>
                  <img className={classes.pointer} src={hotel.imageURL} />
                  <Rating
                    name="read-only"
                    size="small"
                    value={Number(hotel.rating)}
                    readOnly
                  />
                </Paper>
              )}
            </div>
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
