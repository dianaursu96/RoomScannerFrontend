import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import Logo from "../../UI/components/Logo";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/store/auth-slice";
import { alertActions } from "../../redux/store/alert-slice";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lastAccesedPage = useSelector((state) => state.auth.currentPage);
  const onLoginHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8081/login`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(alertActions.setSuccessMessage(res.data.message));
          localStorage.setItem(
            "userData",
            JSON.stringify({
              id: res.data.id,
              token: res.data.token,
              email: res.data.email,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              role: res.data.role,
              favourites: res.data.favourites,
            })
          );
          dispatch(authActions.login(res.data));
          if (lastAccesedPage !== "") {
            navigate(lastAccesedPage);
          } else {
            navigate("/");
          }
        }
      })
      .catch((error) => {
        if (error?.response?.data) {
          dispatch(alertActions.setErrorMessage(error?.response?.data));
        } else {
          dispatch(alertActions.setErrorMessage(error.message));
        }
      });
  };
  return (
    <div className={classes.login__container}>
      <Logo />
      <form
        onSubmit={onLoginHandler}
        className={classes["login__form-container"]}
      >
        <label htmlFor="userName">
          Email:
          <input
            ref={emailRef}
            type="email"
            name="email"
            required
            placeholder="Enter your email"
          ></input>
        </label>
        <label htmlFor="userName">
          Password:
          <input
            ref={passwordRef}
            type="password"
            name="password"
            required
            placeholder="Enter your password"
          ></input>
        </label>

        <div className={classes.login__cta}>
          <button>Login</button>
          <Link to="/signup">No account yet? Click here to register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
