import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../UI/components/Logo";
import classes from "./Registration.module.css";

const Registration = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return (
    <div className={classes.registration}>
      <Logo />
      <div className={classes.registration__buttons}>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Registration;
