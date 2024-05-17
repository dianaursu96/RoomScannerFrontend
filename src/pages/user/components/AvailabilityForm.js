import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid, Paper } from "@material-ui/core";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "60px",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
    "& .MuiButton-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
    "& .MuiPaper-root": {
      padding: theme.spacing(2),
    },
  },
  // style buton check availability
  primary: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    margin: "10px",
    backgroundColor: "var(--primary)",
    color: "var(--inverse)",
    "&:hover": {
      backgroundColor: "var(--primary-hover)",
    },
  },
}));

const AvailabilityForm = ({
  validationError,
  handleSubmitDates,
  handleCheckInDateChange,
  handleCheckOutDateChange,
}) => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Paper style={{ padding: "1em 7em 2em 7em" }} elevation={3}>
        <Grid container spacing={7} alignItems="center">
          <Grid item md={3}>
            <TextField
              id="check-in"
              label="Check in"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleCheckInDateChange}
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              id="check-out"
              label="Check Out"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleCheckOutDateChange}
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              id="guests"
              label="Guests"
              type="number"
              defaultValue="2"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={3}>
            <button
              className={`${classes.primary}`}
              variant="contained"
              color="primary"
              onClick={handleSubmitDates}
            >
              Check Availability
            </button>
          </Grid>
        </Grid>
        {validationError && (
          <Typography
            variant="body2"
            style={{ color: "var(--error)", marginBottom: "20px" }}
          >
            {validationError}
          </Typography>
        )}
      </Paper>
    </form>
  );
};

export default AvailabilityForm;
