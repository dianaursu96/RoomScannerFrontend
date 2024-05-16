import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Registration from "./pages/registration/Registration";
import Login from "./pages/registration/Login";
import SignUp from "./pages/registration/SignUp";
import GuestHomePage from "./pages/user/Home";
import AdminHomePage from "./pages/admin/Home";
import Profile from "./UI/components/ProfilePage";
import Favorites from "./pages/user/Favorites";
import HotelPage from "./pages/user/HotelPage";
import Layout from "./UI/components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./redux/store/auth-slice";
import { readerActions } from "./redux/store/reader-slice";
import { FaHome, FaHeart, FaBook } from "react-icons/fa";
import AlertPopup from "./UI/components/AlertPopup";

function App() {
    //   const token = useSelector((state) => state.auth.token);
    //   const role = useSelector((state) => state.auth.role);
    //   const dispatch = useDispatch();

    //   useEffect(() => {
    //     const storedData = JSON.parse(localStorage.getItem("userData"));
    //     if (storedData && storedData.token) {
    //       dispatch(
    //         authActions.login({
    //           id: storedData.uid,
    //           token: storedData.token,
    //           firstName: storedData.firstName,
    //           lastName: storedData.lastName,
    //           email: storedData.email,
    //           role: storedData.role,
    //         })
    //       );
    //       dispatch(readerActions.initializeFavourites(storedData.favourites));
    //     }
    //   }, []);

    const menuItemsGuest = [
        { label: "Home", path: "/", icon: <FaHome /> },
        { label: "Favourites", path: "/favorites", icon: <FaHeart /> },
    ];
    const menuItemsAdmin = [{ label: "Home", path: "/", icon: <FaHome /> }];

    const guestRoutes = (
        <>
            <Route
                path="/"
                element={
                    <Layout menuItems={menuItemsGuest}>
                        <GuestHomePage />
                    </Layout>
                }
            />
            <Route
                path="/favorites"
                element={
                    <Layout menuItems={menuItemsGuest}>
                        <Favorites />
                    </Layout>
                }
            />
            <Route
                path="/hotel/:id/*"
                element={
                    <Layout menuItems={menuItemsGuest}>
                        <HotelPage />
                    </Layout>
                }
            />
            <Route
                path="/hotel/:id/room/:roomId*"
                element={
                    <Layout menuItems={menuItemsGuest}>
                        {/* <HotelPage /> */}
                    </Layout>
                }
            />
            <Route
                path="/profile"
                element={
                    <Layout menuItems={menuItemsGuest}>
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
                {/* {!token && (
          <>
            <Route
              path="*"
              element={
                <h1>
                  Unauthorized Access.{" "}
                  <Link to="/login">Click here to login your account</Link>
                </h1>
              }
            />
            <Route path="/" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )} */}
                {guestRoutes}
                {/* {token && role === "GUEST" && guestRoutes} */}
                {/* {token && role === "ADMIN" && adminRoutes} */}
            </Routes>
        </>
    );
}

export default App;
