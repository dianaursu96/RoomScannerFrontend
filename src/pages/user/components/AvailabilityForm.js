import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: "60px",
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
        '& .MuiButton-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
        '& .MuiPaper-root': {
            padding: theme.spacing(2),
        },
    },
    primary: {
        width: "80%",
        backgroundColor: 'var(--primary)',
        color: 'var(--inverse)',
        '&:hover': {
            backgroundColor: 'var(--primary-hover)',
        },
    },
}));

export default function ReservationForm() {
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
                        <Button className={`${classes.primary}`} variant="contained" color="primary">
                            Check Availability
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </form>
    );
}
