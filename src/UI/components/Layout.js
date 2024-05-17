import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { FaBars, FaAngleLeft } from "react-icons/fa";
import { IconButton, Divider } from "@mui/material";
import classes from "./Layout.module.css";
import { useSelector } from "react-redux";

function Layout({ children, menuItems }) {
  const token = useSelector((state) => state.auth.token);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <div className={classes.layout}>
      <Header />
      <Divider />
      <div className={classes.contentContainer}>
        {token && (
          <div
            className={`${classes.sidebar} ${
              openDrawer ? classes.open : classes.closed
            }`}
          >
            <IconButton onClick={toggleDrawer} className={classes.toggleButton}>
              {openDrawer ? <FaAngleLeft /> : <FaBars />}
            </IconButton>
            <Sidebar menuItems={menuItems} collapsed={!openDrawer} />
          </div>
        )}
        <main className={classes.mainContent}>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
