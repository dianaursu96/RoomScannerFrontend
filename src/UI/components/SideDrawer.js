import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./SideDrawer.css";
import { MdLogout, MdLogin } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/store/auth-slice";

const SideDrawer = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <div className="side-drawer">
      {token ? (
        <ul>
          <li>
            <NavLink className=".active" to={`/profile`}>
              <FaRegUser />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              className=".active"
              onClick={() => dispatch(authActions.logout())}
              to={`/login`}
            >
              <MdLogout />
              Logout
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <li>
              <NavLink className=".active" to={`/signup`}>
                <FaRegUser />
                Register
              </NavLink>
            </li>
            <NavLink
              className=".active"
              onClick={() =>
                dispatch(authActions.setCurrentPage(location.pathname))
              }
              to={`/login`}
            >
              <MdLogin />
              Sign in
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default SideDrawer;
