import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readerActions } from "../../redux/store/reader-slice";
import Map from "./components/Map/Map";
import { styled } from '@mui/material/styles';
import SearchLocation from "./components/SearchLocation";
import RadiusSlider from "./components/RadiusSlider";
import { Grid } from '@material-ui/core';
import List from './components/List/List';
const hotels = [
    {
        "id": 1,
        "name": "Hotel Ramada",
        "rating": 4.7,
        "numberOfReviews": 313,
        "latitude": 46.764654252624204,
        "longitude": 23.598674125224626,
        "rooms": [
            {
                "roomNumber": 210,
                "type": 2,
                "price": 200,
                "isAvailable": true
            },
            {
                "roomNumber": 125,
                "type": 1,
                "price": 350,
                "isAvailable": true
            },
            {
                "roomNumber": 87,
                "type": 1,
                "price": 300,
                "isAvailable": false
            }
        ]
    },
    {
        "id": 2,
        "name": "Grand Hotel Italia",
        "rating": 4.2,
        "numberOfReviews": 88,
        "latitude": 46.7522792440665,
        "longitude": 23.605990381045697,
        "rooms": [
            {
                "roomNumber": 41,
                "type": 3,
                "price": 240,
                "isAvailable": true
            }
        ]
    },
    {
        "id": 3,
        "name": "Hampton by Hilton",
        "rating": 4.9,
        "numberOfReviews": 108,
        "latitude": 46.77539900854998,
        "longitude": 23.60182699638966,
        "rooms": [
            {
                "roomNumber": 32,
                "type": 2,
                "price": 410,
                "isAvailable": false
            },
            {
                "roomNumber": 21,
                "type": 2,
                "price": 350,
                "isAvailable": true
            },
            {
                "roomNumber": 64,
                "type": 3,
                "price": 300,
                "isAvailable": true
            }
        ]
    }
]

const Home = () => {
    const recipes = useSelector((state) => state.reader.recipes);
    const searchInput = useSelector((state) => state.reader.searchInput);
    const currentCategory = useSelector((state) => state.reader.currentCategory);
    const token = useSelector((state) => state.auth.token);
    const error = useSelector((state) => state.alert.hasError);

    const [isLoading, setIsLoading] = useState(false);
    const [autocomplete, setAutocomplete] = useState(null);
    const [radius, setRadius] = useState(20000)
    const [coords, setCoords] = useState({});
    const [childClicked, setChildClicked] = useState(null);


    const onLoad = (autoC) => setAutocomplete(autoC);
    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCoords({ lat, lng });
    };
    const onRadiusChange = (e, newValue) => {
        setRadius(newValue * 1000)
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoords({ lat: latitude, lng: longitude });
        });
    }, []);

    const banner =
        searchInput !== "" ? (
            <h1>
                {recipes.length}{" "}
                <span>
                    Hotels Found {searchInput !== "" ? `for '${searchInput}'` : ""}
                </span>
            </h1>
        ) : (
            <h1>
                {"Discover"} <span>{"hotels"}</span>
            </h1>
        );



    return (
        <>
            <div className="banner-container" >
                <div className="banner-title">{banner}</div>
                <SearchLocation onLoad={onLoad} onPlaceChanged={onPlaceChanged} />
                <RadiusSlider
                    radius={radius}
                    onChange={onRadiusChange}
                />
            </div>
            <div className="banner-container" >
                <Grid container spacing={3} style={{ width: '100%' }}>
                    <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Map setChildClicked={setChildClicked}
                            coords={coords}
                            radius={radius}
                            hotels={hotels} />
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
