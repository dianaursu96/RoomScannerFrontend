import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import {
  FaWater,
  FaWifi,
  FaMoneyBillWave,
  FaHotel,
  FaClock,
  FaArrowLeft,
} from "react-icons/fa6";
import { useLocation, useParams, useNavigate } from "react-router";
import axios from "axios";
import { alertActions } from "../../redux/store/alert-slice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../UI/components/Spinner";

const BookingRoomPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState("");
  const [room, setRoom] = useState({});
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (location.state?.room) {
      setRoom(location.state?.room);
      return;
    }
    setIsLoading(true);
    axios({
      method: "GET",
      url: `http://localhost:8081/rooms/${id}`,
    })
      .then((res) => {
        if (res.status === 200) {
          setRoom(res.data);
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
  // Function to calculate total price based on checkin and checkout dates
  const calculateTotalPrice = (checkinDate, checkoutDate, pricePerNight) => {
    // Calculate the number of days between checkin and checkout
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(checkinDate);
    const secondDate = new Date(checkoutDate);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    // Calculate total price
    const totalPrice = diffDays * pricePerNight;
    return totalPrice;
  };

  const handleClickOpen = () => {
    if (!checkInDate || !checkOutDate) {
      setValidationError("Check-in and check-out dates are required.");
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      setValidationError("Check-out date must be after check-in date.");
      return;
    }

    setValidationError("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    setIsLoading(true);
    axios({
      method: "POST",
      url: `http://localhost:8081/user/reservation/create`,
      params: {
        roomId: room.id,
        checkin: `${checkInDate}T15:00:00`,
        checkout: `${checkOutDate}T12:00:00`,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            alertActions.setSuccessMessage(
              "Reservation created sucessfully! You can find on 'My Reservations' tab."
            )
          );
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

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <Container
          style={{
            padding: "20px",
            border: "2px solid var(--inverse)",
            borderRadius: "8px",
            marginTop: "20px",
          }}
        >
          <Typography
            variant="h4"
            style={{
              display: "flex",
              color: "var(--primary)",
              marginBottom: "20px",
            }}
          >
            <div onClick={() => navigate(-1)}>
              <FaArrowLeft style={{ marginRight: "15px", cursor: "pointer" }} />
            </div>
            Book Your Room
          </Typography>
          <Typography
            variant="h6"
            style={{ color: "var(--secondary)", marginBottom: "10px" }}
          >
            Room Details
          </Typography>
          <Card style={{ marginBottom: "20px" }}>
            <CardMedia
              component="img"
              alt="Deluxe Room"
              height="400"
              image={room.imageURL}
              title="Deluxe Room with Sea View"
            />
            <CardContent>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{ color: "var(--secondary-hover)" }}
              >
                Deluxe Room with Sea View
              </Typography>
              <Grid container spacing={2} style={{ marginTop: "10px" }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography
                    variant="body2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "var(--secondary-hover)",
                    }}
                  >
                    <FaMoneyBillWave style={{ marginRight: "5px" }} />
                    Price: ${room.price}/night
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "var(--secondary-hover)",
                    }}
                  >
                    <FaHotel style={{ marginRight: "5px" }} />
                    Room Type: {room.type}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography
                    variant="body2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "var(--secondary-hover)",
                    }}
                  >
                    <FaWifi style={{ marginRight: "5px" }} />
                    Free WiFi
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "var(--secondary-hover)",
                    }}
                  >
                    <FaWater style={{ marginRight: "5px" }} />
                    Swimming Pool
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <form noValidate autoComplete="off">
            <TextField
              label="Check-in Date"
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              style={{ marginBottom: "20px", width: "100%" }}
            />
            <TextField
              label="Check-out Date"
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              style={{ marginBottom: "20px", width: "100%" }}
            />
            {validationError && (
              <Typography
                variant="body2"
                style={{ color: "var(--error)", marginBottom: "20px" }}
              >
                {validationError}
              </Typography>
            )}
            <Button
              variant="contained"
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                textTransform: "none",
              }}
              onClick={handleClickOpen}
            >
              Reserve this room for the selected period
            </Button>
          </form>
          <Dialog
            sx={{ borderRadius: "8px" }}
            open={open}
            onClose={handleClose}
          >
            <DialogTitle>Reservation summary</DialogTitle>
            <DialogContent style={{ padding: "60px" }}>
              <DialogContentText style={{ marginBottom: "20px" }}>
                Please confirm your booking details:
              </DialogContentText>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <Typography variant="h5" style={{ color: "var(--primary)" }}>
                  Deluxe Room with Sea View
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                }}
              >
                <div>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}
                  >
                    Check in:
                  </Typography>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FaClock style={{ marginRight: "5px" }} />
                    <Typography variant="body2">From 15.00h</Typography>
                  </div>
                </div>
                <div>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}
                  >
                    Check out:
                  </Typography>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FaClock style={{ marginRight: "5px" }} />
                    <Typography variant="body2">Before 12.00h</Typography>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                  Reservation date:
                </Typography>
                <Typography variant="body2">
                  From <strong>{checkInDate}</strong> to{" "}
                  <strong>{checkOutDate}</strong>
                </Typography>
              </div>
              <div
                className="card-total"
                style={{
                  borderTop: "1px solid var(--secondary-opacity)",
                  paddingTop: "20px",
                  marginBottom: "30px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <Typography variant="body1">Room Price:</Typography>
                    <Typography
                      variant="body1"
                      style={{ color: "var(--primary)" }}
                    >
                      € {room.price}
                    </Typography>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    Total:
                  </Typography>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body1"
                      style={{ fontWeight: "bold", color: "var(--primary)" }}
                    >
                      €{" "}
                      {calculateTotalPrice(
                        checkInDate,
                        checkOutDate,
                        room.price
                      )}
                    </Typography>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between" }}>
              <Button
                onClick={handleClose}
                style={{ color: "var(--error)", textTransform: "None" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                style={{
                  backgroundColor: "var(--primary)",
                  color: "white",
                  textTransform: "None",
                }}
              >
                Complete Booking
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      )}
    </>
  );
};

export default BookingRoomPage;
