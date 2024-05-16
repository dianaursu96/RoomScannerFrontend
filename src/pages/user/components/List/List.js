import React, { useState, useEffect, createRef } from "react";
import { CircularProgress, Grid, Typography } from "@material-ui/core";

import PlaceDetails from "../PlaceDetails/PlaceDetails";
import useStyles from "./styles.js";

const List = ({ hotels, childClicked, isLoading }) => {
  const [elRefs, setElRefs] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setElRefs((refs) =>
      Array(hotels.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [hotels]);

  return (
    <div className={classes.container}>
      <Typography style={{ marginBottom: "10px" }} variant="h4">
        {hotels.length} Hotels around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <Grid container spacing={3} className={classes.list}>
            {hotels?.map((hotel, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                  hotel={hotel}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
