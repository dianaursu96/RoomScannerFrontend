import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../redux/store/alert-slice";
import Map from "./components/Map/Map";
import SearchLocation from "./components/SearchLocation";
import RadiusSlider from "./components/RadiusSlider";
import { Grid } from "@material-ui/core";
import List from "./components/List/List";
import axios from "axios";

const fallbackCoordinates = {
  lat: 46.75188680890758,
  lng: 23.604036376833683,
}; // Cluj

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [radius, setRadius] = useState(5); // in km
  const [coords, setCoords] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJib2dkYW4uYXJzZW5lQGhvdGVsUmVzLnJvIiwiaWF0IjoxNzE1ODg3ODA1LCJleHAiOjE3MTU4OTE0MDV9.mIAvOTY1D9OEiA13KVCSwp5SK1nOFsTg7MgqUSs4mp32hrdPnSWOd0UdOGsP1klmMHESICoM8nCJXtd1MgQQ8Q";
  const dispatch = useDispatch();

  const onLoad = (autoC) => setAutocomplete(autoC);
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoords({ lat, lng });
  };
  const onRadiusChange = (e, newValue) => {
    setRadius(newValue / 5); // accounting for slider scale ratio 5:4
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      //return a promise
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }, // success callback
      () => {
        setCoords(fallbackCoordinates);
      } // error callback (if user does't allow the browser to access his location)
    );
  }, []);
  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "POST",
      url: "http://localhost:8081/location/hotels",
      data: {
        userLatitude: coords.lat,
        userLongitude: coords.lng,
        radius: radius,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setHotels(res.data);
        } else {
          dispatch(alertActions.setErrorMessage(res.error.message));
        }
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch(alertActions.setErrorMessage(err.message));
        setIsLoading(false);
      });
  }, [autocomplete, radius, coords]);

  return (
    <>
      <div className="banner-container">
        <div className="banner-title">
          <h1>
            {"Discover"} <span>{"hotels"}</span>
          </h1>
        </div>
        <SearchLocation onLoad={onLoad} onPlaceChanged={onPlaceChanged} />
        <RadiusSlider radius={radius * 5} onChange={onRadiusChange} />
      </div>
      <div className="banner-container">
        <Grid container spacing={3} style={{ width: "100%" }}>
          <Grid
            item
            xs={12}
            md={8}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Map
              isLoading={isLoading}
              setChildClicked={setChildClicked}
              coords={coords}
              radius={radius * 1000} // in meters
              hotels={hotels}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <List
              isLoading={isLoading}
              childClicked={childClicked}
              hotels={hotels}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Home;
