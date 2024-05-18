import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { alertActions } from "../../redux/store/alert-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

const ReviewForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const params = useParams();
  const hotelId = Number(params.id);

  const [formData, setFormData] = useState({
    content: "",
    cleanliness: 0,
    staff: 0,
    facilities: 0,
    comfort: 0,
    hotelId: hotelId,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRatingChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: "POST",
      url: `https://room-scanner-srv-cca7f170ae6f.herokuapp.com/user/review/create`,
      data: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            alertActions.setSuccessMessage("Review submitted successfully!")
          );
          setFormData({
            content: "",
            cleanliness: 0,
            staff: 0,
            facilities: 0,
            comfort: 0,
            hotelId: hotelId,
          });
        } else {
          dispatch(alertActions.setErrorMessage(res.error.message));
        }
      })
      .catch((err) => {
        dispatch(
          alertActions.setErrorMessage(
            err.response?.data ? err.response.data : err.message
          )
        );
      })
      .finally(() => navigate("/reservations"));
  };

  return (
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
        style={{ color: "var(--primary)", marginBottom: "20px" }}
      >
        Leave a Review
      </Typography>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          label="Review Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          style={{ marginBottom: "20px" }}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography component="legend">Cleanliness</Typography>
            <Rating
              name="cleanliness"
              value={formData.cleanliness}
              onChange={(event, newValue) =>
                handleRatingChange("cleanliness", newValue)
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Typography component="legend">Staff</Typography>
            <Rating
              name="staff"
              value={formData.staff}
              onChange={(event, newValue) =>
                handleRatingChange("staff", newValue)
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Typography component="legend">Facilities</Typography>
            <Rating
              name="facilities"
              value={formData.facilities}
              onChange={(event, newValue) =>
                handleRatingChange("facilities", newValue)
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Typography component="legend">Comfort</Typography>
            <Rating
              name="comfort"
              value={formData.comfort}
              onChange={(event, newValue) =>
                handleRatingChange("comfort", newValue)
              }
            />
          </Grid>
        </Grid>
        <Box textAlign="center" marginTop="20px">
          <Button
            variant="contained"
            style={{
              backgroundColor: "var(--incerse)",
              color: "black",
              textTransform: "none",
              marginRight: "29px",
            }}
            onClick={() => navigate("/reservations")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "var(--primary)",
              color: "white",
              textTransform: "none",
            }}
          >
            Submit Review
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default ReviewForm;
