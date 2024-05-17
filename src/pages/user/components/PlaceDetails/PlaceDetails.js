import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";

const PlaceDetails = ({ hotel, selected, refProp }) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Card elevation={6}>
      <CardMedia
        component={Link}
        to={`hotel/${hotel.id}`}
        state={{
          hotel: hotel,
        }}
        style={{ height: 350 }}
        image={hotel.imageURL}
        title={hotel.name}
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom variant="h5">
            {hotel.name}
          </Typography>
          <CardActions>
            <Link
              to={`hotel/${hotel.id}`}
              state={{
                hotel: hotel,
              }}
              style={{
                fontSize: "1rem",
                fontWeight: "700",
                color: "var(--primary)",
                backgroundColor: "var(--inverse)",
                textDecoration: "none",
                padding: "7px 7px",
                border: "2px solid var(--primary)",
                borderRadius: "8px",
              }}
            >
              Check out rooms
            </Link>
          </CardActions>
        </Box>
        <Box
          style={{ marginBottom: "10px" }}
          display="flex"
          justifyContent="space-between"
        >
          <Typography component="legend">Rating</Typography>
          <Box display="flex">
            <Rating name="read-only" value={Number(hotel.rating)} readOnly />
            <Typography component="legend">
              ({hotel.reviews?.length})
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Distance</Typography>
          <Typography gutterBottom variant="subtitle1">
            {`${
              hotel.distanceFromCenter > 1000
                ? (hotel.distanceFromCenter / 1000).toFixed(2)
                : hotel.distanceFromCenter
            } ${hotel.distanceFromCenter > 1000 ? "km" : "m"}`}
          </Typography>
        </Box>
        {/* <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(hotel.rating)} readOnly />
          <Typography component="legend">
            {hotel.reviews?.length} review{hotel.reviews?.length !== 1 && "s"}
          </Typography>
        </Box> */}
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            starts from €
            {hotel.rooms.sort((a, b) => a.price - b.price)[0].price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
