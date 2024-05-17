import React, { Fragment, useState, useEffect } from "react";
import { FaFireAlt, FaRegClock, FaArrowLeft } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import classes from "./RecipeDetail.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../UI/components/Spinner";
import { MdOutlineStarPurple500 as Star } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CategoryBar from "./components/CategoryBar";
import AvailabilityForm from "./components/AvailabilityForm";
import MainContent from "./components/MainContent";
import { alertActions } from "../../redux/store/alert-slice";

const RecipeDetail = () => {
  const error = useSelector((state) => state.alert.hasError);
  const [hotel, setHotel] = useState({});
  const [rooms, setRooms] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const [isLoading, setIsLoading] = useState(false);

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
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
        dispatch(alertActions.setErrorMessage(err.response.data));
        setIsLoading(false);
      });
  }, []);

  const handleCheckAvailability = () => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: `http://localhost:8081/rooms/availability`,
      params: {
        hotelId: 1,
        checkin: `${checkInDate}T11:00:00`,
        checkout: `${checkOutDate}T11:00:00`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setRooms(res.data);
        } else {
          dispatch(alertActions.setErrorMessage(res.error.message));
        }
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch(alertActions.setErrorMessage(err.response.data));
        setIsLoading(false);
      });
  };

  const handleCheckInDateChange = (event) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutDateChange = (event) => {
    setCheckOutDate(event.target.value);
  };

  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value);
  };

  return (
    <Fragment>
      {isLoading && <Spinner />}
      <main id="main-content" className="main-content-container">
        {error && <h1>Error: {error}</h1>}
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
                  {hotel.rating !== "NaN" ? (
                    <>
                      <div>
                        <span>
                          <Star />
                        </span>
                        <span>{hotel.rating}</span>
                      </div>
                      <div>
                        out of <span>{hotel.reviews?.length}</span>review
                        {hotel.reviews?.length !== 1 && "s"}
                      </div>
                    </>
                  ) : (
                    <div>
                      <span>No reviews</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={classes["favorites-button-group"]}>
                <button>
                  <span>
                    <FaPhone />
                    Contact hotel
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
