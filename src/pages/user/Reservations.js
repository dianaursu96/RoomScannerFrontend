import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../UI/components/Spinner";
import { Modal, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../redux/store/alert-slice";

const types = [
  {
    label: "Single",
    value: "SINGLE",
  },
  {
    label: "Double",
    value: "DOUBLE",
  },
  {
    label: "Matrimonial",
    value: "MATRIMONIAL",
  },
  {
    label: "Suite",
    value: "SUITE",
  },
];

const Reservations = () => {
  const error = useSelector((state) => state.alert.hasError);
  const token = useSelector((state) => state.auth.token);
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentRowId, setCurrentRowId] = useState(null);
  const navigate = useNavigate();

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

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: `http://localhost:8081/user/reservations`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setRows(res.data);
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
  }, [dispatch]);

  const handleCancel = async (reservationId) => {
    try {
      setIsLoading(true);
      await axios({
        method: "DELETE",
        url: `http://localhost:8081/user/reservation/delete/${reservationId}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setRows(rows.filter((row) => row.reservation.id !== reservationId));
      dispatch(
        alertActions.setSuccessMessage("Reservation canceled successfully")
      );
    } catch {
      dispatch(alertActions.setErrorMessage("Error deleting reservation"));
    } finally {
      setIsLoading(false);
      setOpenModal(false);
    }
  };

  return (
    <div>
      {isLoading && <Spinner />}
      {!isLoading && !error && (
        <TableContainer component={Paper} style={{ padding: "2em" }}>
          <Table style={{ minWidth: 400 }}>
            <TableHead style={{ backgroundColor: "var(--inverse)" }}>
              <TableRow>
                <TableCell
                  style={{
                    color: "var(--primary)",
                    fontWeight: "bold",
                    width: "12.5%",
                  }}
                  align="center"
                >
                  RESERVATION ID
                </TableCell>
                <TableCell
                  style={{
                    color: "var(--primary)",
                    fontWeight: "bold",
                    width: "12.5%",
                  }}
                  align="center"
                >
                  HOTEL NAME
                </TableCell>
                <TableCell
                  style={{
                    color: "var(--primary)",
                    fontWeight: "bold",
                    width: "12.5%",
                  }}
                  align="center"
                >
                  ROOM TYPE
                </TableCell>
                <TableCell
                  style={{
                    color: "var(--primary)",
                    fontWeight: "bold",
                    width: "12.5%",
                  }}
                  align="center"
                >
                  TOTAL PRICE
                </TableCell>

                <TableCell
                  style={{
                    color: "var(--primary)",
                    fontWeight: "bold",
                    width: "12.5%",
                  }}
                  align="center"
                >
                  CHECK-IN
                </TableCell>
                <TableCell
                  style={{
                    color: "var(--primary)",
                    fontWeight: "bold",
                    width: "12.5%",
                  }}
                  align="center"
                >
                  CHECK-OUT
                </TableCell>
                <TableCell
                  style={{
                    color: "var(--primary)",
                    fontWeight: "bold",
                    width: "12.5%",
                  }}
                  align="center"
                >
                  STATUS
                </TableCell>
                <TableCell
                  style={{
                    color: "var(--primary)",
                    fontWeight: "bold",
                    width: "12.5%",
                  }}
                  align="center"
                >
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell component="th" scope="row" align="center">
                    <Box
                      sx={{
                        border: "1px solid var(--primary)",
                        width: "25px",
                        marginLeft: "40px",
                        background: "var(--inverse)",
                        borderRadius: "5px !important",
                      }}
                    >
                      <b>{row.reservation.id}</b>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <b>{row.hotelName}</b>
                  </TableCell>
                  <TableCell align="center">
                    {types.find((type) => type.value === row.roomType).label}
                  </TableCell>
                  <TableCell align="center">
                    €{" "}
                    {calculateTotalPrice(
                      row.reservation.checkin.split("T")[0],
                      row.reservation.checkout.split("T")[0],
                      row.price
                    )}
                  </TableCell>

                  <TableCell align="center">
                    {new Date(row.reservation.checkin).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(row.reservation.checkout).toLocaleString(
                      "en-US",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        border: "1px solid var(--primary)",
                        width: "100px",
                        marginLeft: "40px",
                        background: "var(--inverse)",
                        borderRadius: "10px !important",
                      }}
                    >
                      <b>{row.status}</b>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {row?.status === "Completed" ? (
                      <Button
                        onClick={() => navigate(`/review/${row.hotelId}`)}
                        variant="contained"
                        sx={{
                          background: "var(--primary)",
                          color: "var(--inverse)",
                          textTransform: "none",
                          fontWeight: "bold",
                          "&:hover": {
                            background: "var(--primary-hover)",
                            color: "var(--inverse)",
                          },
                        }}
                      >
                        Leave a review
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setOpenModal(true);
                          setCurrentRowId(row.reservation.id);
                        }}
                        variant="contained"
                        sx={{
                          background: "var(--error)",
                          color: "var(--inverse)",
                          textTransform: "none",
                          fontWeight: "bold",
                          "&:hover": {
                            background: "var(--error-hover)",
                            color: "var(--inverse)",
                          },
                        }}
                      >
                        Cancel reservation
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Cancelation Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "var(--inverse)",
            padding: "20px",
          }}
        >
          <>
            <h1 id="delete-modal-title">Confirm cancelation</h1>
            <h2 id="delete-modal-description">
              Are you sure you want to cancel this reservation?
            </h2>
          </>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              onClick={() => handleCancel(currentRowId)}
              variant="outlined"
              style={{
                marginTop: "10px",
                background: "var(--primary)",
                color: "var(--inverse)",
                fontFamily: "var(--font-family)",
                fontWeight: "bold",
                borderRadius: "8%",
                borderColor: "var(--primary)",
                textTransform: "None",
                "&:hover": {
                  background: "var(--primary)",
                  color: "var(--inverse)",
                },
              }}
            >
              Yes, cancel it
            </Button>

            <Button
              onClick={() => setOpenModal(false)}
              variant="outlined"
              style={{
                marginTop: "10px",
                background: "var(--inverse)",
                color: "var(--primary)",
                fontFamily: "var(--font-family)",
                fontWeight: "bold",
                borderRadius: "8%",
                borderColor: "var(--primary)",
                textTransform: "None",
                marginLeft: "20px",
                "&:hover": {
                  background: "var(--primary)",
                  color: "var(--inverse)",
                },
              }}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Reservations;
