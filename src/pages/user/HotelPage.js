import React, { Fragment, useState, useEffect } from "react";
import { FaFireAlt, FaRegClock, FaArrowLeft } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import classes from "./RecipeDetail.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../UI/components/Spinner";
import { MdOutlineStarPurple500 as Star } from "react-icons/md";
import { BedDouble } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import CategoryBar from "./components/CategoryBar";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import AvailabilityForm from "./components/AvailabilityForm";
import MainContent from "./components/MainContent";
import { alertActions } from "../../redux/store/alert-slice";

const RecipeDetail = () => {
  const error = useSelector((state) => state.alert.hasError);
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  //   const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const [isLoading, setIsLoading] = useState(false);

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [roomType, setRoomType] = useState("Single");

  useEffect(() => {
    if (location.state?.hotel) {
      setHotel(location.state.hotel);
      setRooms(location.state.hotel.rooms);
      return;
    }
    setIsLoading(true);
    axios({
      method: "GET",
      url: `http://localhost:8081/hotels/${id}`,
    })
      .then((res) => {
        if (res.status === 200) {
          setHotel(res.data);
          setRooms(res.data.rooms);
        } else {
          dispatch(alertActions.setErrorMessage(res.error.message));
        }
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch(alertActions.setErrorMessage(err.message));
        setIsLoading(false);
      });
  }, []);

  const handleCheckAvailability = () => {};

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value);
  };
  // Fetch recipe details

  // useEffect(() => {
  //     if (recipes.length) {
  //         setRecipe(recipes?.find((recipe) => recipe.id === id));
  //         return;
  //     }
  //     setIsLoading(true);
  //     axios({
  //         method: "GET",
  //         url: `https://recipe-hub-srv-9501da59a43f.herokuapp.com/reader/recipes/${id}`,
  //         headers: {
  //             Authorization: "Bearer " + token,
  //         },
  //     })
  //         .then((res) => {
  //             if (res.status === 200) {
  //                 setRecipe(res.data);
  //             } else {
  //                 dispatch(alertActions.setErrorMessage(res.error.message));
  //             }
  //             setIsLoading(false);
  //         })
  //         .catch((err) => {
  //             dispatch(alertActions.setErrorMessage(err.message));
  //             setIsLoading(false);
  //         });
  // }, []);

  return (
    <Fragment>
      {isLoading && <Spinner />}
      <main id="main-content" className="main-content-container">
        {error && <h1>Error: {error.message}</h1>}
        {!isLoading && !error && hotel && (
          <>
            <div className={classes.recipe__container}>
              <div className={classes["recipe-image"]}>
                <div className={classes["recipe-image__container"]}>
                  <img src={hotel.imageURL} alt="" />
                </div>
              </div>
              <div className={classes["recipe-details"]}>
                <h1>{hotel.name}</h1>
                <div className={classes["recipe-tag__calorie-time"]}>
                  <div>
                    <span>
                      <Star />
                    </span>
                    <span>{hotel.rating}</span>
                  </div>
                  <div>
                    out of <span>{hotel.numberOfReviews}</span>reviews
                  </div>
                </div>
                {/* <div className={classes["recipe-tag-group"]}>{hotel.facilities}</div> */}
              </div>
              {/* <div className={classes["recipe-preparation"]}>
                                <TextField
                                    id="check-in-date"
                                    label="Check In"
                                    type="date"
                                    value={checkInDate}
                                    onChange={handleCheckInDateChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div className={classes["recipe-ingredients"]}>
                                <TextField
                                    id="check-out-date"
                                    label="Check Out"
                                    type="date"
                                    value={checkOutDate}
                                    onChange={handleCheckOutDateChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div className={classes["recipe-nutritional-facts"]}>
                                <FormControl>
                                    <InputLabel >Room Type</InputLabel>
                                    <Select
                                        label="Room Type"
                                        value={roomType}
                                        onChange={handleRoomTypeChange}
                                    >
                                        <MenuItem value="Single">Single</MenuItem>
                                        <MenuItem value="Double">Double</MenuItem>
                                        <MenuItem value="Matrimonial">Matrimonial</MenuItem>
                                        <MenuItem value="Suite">Suite</MenuItem>
                                    </Select>
                                </FormControl>
                            </div> */}

              <div className={classes["favorites-button-group"]}>
                <button>
                  <span>
                    <FaPhone />
                    Contact this hotel
                  </span>
                </button>
                <button onClick={() => navigate(-1)}>
                  <span>
                    <FaArrowLeft />
                    Return home
                  </span>
                </button>
              </div>
            </div>
            <AvailabilityForm
              handleCheckAvailability={handleCheckAvailability}
              handleCheckInDateChange={handleCheckInDateChange}
              handleCheckOutDateChange={handleCheckOutDateChange}
              handleRoomTypeChange={handleRoomTypeChange}
            />
            <CategoryBar />
            <>
              <MainContent rooms={rooms} />
            </>
          </>
        )}
      </main>
    </Fragment>
  );
};

export default RecipeDetail;
