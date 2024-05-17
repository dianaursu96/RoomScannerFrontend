import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Registration from "./pages/registration/Registration";
import Login from "./pages/registration/Login";
import SignUp from "./pages/registration/SignUp";
import GuestHomePage from "./pages/user/Home";
import AdminHomePage from "./pages/admin/Home";
import Profile from "./UI/components/ProfilePage";
import HotelPage from "./pages/user/HotelPage";
import Layout from "./UI/components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./redux/store/auth-slice";
import { readerActions } from "./redux/store/reader-slice";
import { FaHome, FaHeart, FaBook } from "react-icons/fa";
import { BsCalendarCheckFill as ReservationIcon } from "react-icons/bs";
import AlertPopup from "./UI/components/AlertPopup";
import Reservations from "./pages/user/Reservations";
import BookingRoomPage from "./pages/user/BookingRoomPage";

function App() {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      dispatch(
        authActions.login({
          id: storedData.uid,
          token: storedData.token,
          firstName: storedData.firstName,
          lastName: storedData.lastName,
          email: storedData.email,
          role: storedData.role,
        })
      );
    }
  }, []);

  const menuItemsUser = [
    { label: "Home", path: "/", icon: <FaHome /> },
    { label: "Reservations", path: "/reservations", icon: <ReservationIcon /> },
  ];
  const menuItemsAdmin = [{ label: "Home", path: "/", icon: <FaHome /> }];
  const guestRoutes = (
    <>
      <Route
        path="/"
        element={
          <Layout>
            <GuestHomePage />
          </Layout>
        }
      />
      <Route
        path="/hotel/:id/*"
        element={
          <Layout>
            <HotelPage />
          </Layout>
        }
      />
    </>
  );
  const userRoutes = (
    <>
      <Route
        path="/"
        element={
          <Layout menuItems={menuItemsUser}>
            <GuestHomePage />
          </Layout>
        }
      />
      <Route
        path="/hotel/:id/*"
        element={
          <Layout menuItems={menuItemsUser}>
            <HotelPage />
          </Layout>
        }
      />
      <Route
        path="/room/:id/*"
        element={
          <Layout menuItems={menuItemsUser}>
            <BookingRoomPage />
          </Layout>
        }
      />
      <Route
        path="/reservations"
        element={
          <Layout menuItems={menuItemsUser}>
            <Reservations />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout menuItems={menuItemsUser}>
            <Profile />
          </Layout>
        }
      />
    </>
  );

  const adminRoutes = (
    <>
      <Route
        path="/"
        element={
          <Layout menuItems={menuItemsAdmin}>
            <AdminHomePage />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout menuItems={menuItemsAdmin}>
            <Profile />
          </Layout>
        }
      />
    </>
  );

  return (
    <>
      <AlertPopup />

      <Routes>
        {!token && (
          <>
            <Route
              path="/login"
              element={
                <Layout>
                  <Login />
                </Layout>
              }
            />
            <Route
              path="/signup"
              element={
                <Layout>
                  <SignUp />
                </Layout>
              }
            />
            {guestRoutes}
          </>
        )}

        {token && role === "USER" && userRoutes}
        {token && role === "ADMIN" && adminRoutes}
      </Routes>
    </>
  );
}

export default App;
