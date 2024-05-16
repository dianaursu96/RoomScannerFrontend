import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';

const PlaceDetails = ({ hotel, selected, refProp }) => {
    if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    return (
        <Card elevation={6}>
            <CardMedia
                component={Link}
                to={`hotel/${hotel.id}`}
                style={{ height: 350 }}
                image={'https://suretyhotel.com/wp-content/uploads/2021/01/Deluxe-King-and-Surety-King-scaled-1280x0-c-default.webp'}
                title={hotel.name}
            />
            <CardContent>
                <Box display="flex" justifyContent="space-between">
                    <Typography gutterBottom variant="h5">{hotel.name}</Typography>
                    <CardActions>
                        <Button component={Link}
                            to={`hotel/${hotel.id}`} size="small" color="primary">
                            Check out rooms
                        </Button>
                    </CardActions>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography component="legend">Rating</Typography>
                    <Typography gutterBottom variant="subtitle1">
                        {hotel.rating}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" my={2}>
                    <Rating name="read-only" value={Number(hotel.rating)} readOnly />
                    <Typography component="legend">{hotel.numberOfReviews} review{hotel.numberOfReviews > 1 && 's'}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography component="legend">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">
                        starts from €{hotel.rooms.sort((a, b) => a.price - b.price)[0].price}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PlaceDetails;
