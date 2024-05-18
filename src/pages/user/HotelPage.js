import React, { Fragment, useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import classes from "./HotelDetail.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../UI/components/Spinner";
import { MdOutlineStarPurple500 as Star } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CategoryBar from "./components/CategoryBar";
import AvailabilityForm from "./components/AvailabilityForm";
import MainContent from "./components/MainContent";
import { alertActions } from "../../redux/store/alert-slice";

const HotelDetail = () => {
  const error = useSelector((state) => state.alert.hasError);
  const [hotel, setHotel] = useState({});
  const [rooms, setRooms] = useState([]);
  const [type, setType] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const [isLoading, setIsLoading] = useState(false);

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const handleRoomTypeChange = (type) => {
    setType(type);
  };

  useEffect(() => {
    if (location.state?.hotel) {
      setHotel(location.state.hotel);
      setRooms(location.state.hotel.rooms);
      return;
    }
    setIsLoading(true);
    axios({
      method: "GET",
      url: `https://room-scanner-srv-cca7f170ae6f.herokuapp.com/hotels/${id}`,
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
        dispatch(
          alertActions.setErrorMessage(
            err.response ? err.responseData : err.message
          )
        );
        setIsLoading(false);
      });
  }, []);

  const [validationError, setValidationError] = useState("");
  const handleSubmitDates = (e) => {
    e.preventDefault();
    if (!checkInDate || !checkOutDate) {
      setValidationError("Check-in and check-out dates are required.");
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      setValidationError("Check-out date must be after check-in date.");
      return;
    }

    setValidationError("");
    checkAvailability();
  };

  const checkAvailability = () => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: `https://room-scanner-srv-cca7f170ae6f.herokuapp.com/rooms/availability`,
      params: {
        hotelId: id,
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
        dispatch(
          alertActions.setErrorMessage(
            err.response ? err.responseData : err.message
          )
        );
        setIsLoading(false);
      });
  };

  const handleCheckInDateChange = (event) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutDateChange = (event) => {
    setCheckOutDate(event.target.value);
  };

  return (
    <Fragment>
      {isLoading && <Spinner />}
      <main id="main-content" className="main-content-container">
        {error && <h1>Error: {error}</h1>}
        {!error && hotel && (
          <>
            <div className={classes.hotel__container}>
              <div className={classes["hotel-image"]}>
                <div className={classes["hotel-image__container"]}>
                  <img src={hotel.imageURL} alt="" />
                </div>
              </div>
              <div className={classes["hotel-details"]}>
                <h1>{hotel.name}</h1>
                <div className={classes["hotel-review"]}>
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

              <div className={classes["action-button-group"]}>
                <button>
                  <span>
                    <FaPhone />
                    Contact hotel
                  </span>
                </button>
                <button onClick={() => navigate("/")}>
                  <span>
                    <FaArrowLeft />
                    Return home
                  </span>
                </button>
              </div>
            </div>
            <AvailabilityForm
              handleSubmitDates={handleSubmitDates}
              handleCheckInDateChange={handleCheckInDateChange}
              handleCheckOutDateChange={handleCheckOutDateChange}
              validationError={validationError}
            />
            <CategoryBar handleRoomTypeChange={handleRoomTypeChange} />
            <>
              {isLoading && <Spinner />}
              {!isLoading && !error && hotel && (
                <MainContent
                  rooms={
                    type != ""
                      ? rooms.filter((room) => room.type === type)
                      : rooms
                  }
                />
              )}
            </>
          </>
        )}
      </main>
    </Fragment>
  );
};

export default HotelDetail;
