import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFireAlt, FaRegClock, FaHeart } from "react-icons/fa";
import { BedDouble } from "lucide-react";
import "./RoomCard.css";
import Card from "./Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../redux/store/auth-slice";

const RoomCard = ({ id, name, imageURL, price, type, isAvailable }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    if (token) {
      return;
    }
    dispatch(authActions.setCurrentPage(`/room/${id}`));
  };
  return (
    <article
      className={`room ${
        isAvailable === undefined || isAvailable ? "" : "booked"
      }`}
    >
      <div className="img-container">
        <img src={imageURL} alt="single room" />

        <div className="price-top">
          <h6>€ {price}</h6>
          <p>per night</p>
        </div>

        {isAvailable === undefined || isAvailable ? (
          <Link
            onClick={handleClick}
            to={token ? `/room/${id}` : "/login"}
            state={{
              room: {
                id: id,
                name: name,
                imageURL: imageURL,
                price: price,
                type: type,
              },
            }}
            className="btn-primary room-link"
          >
            <h1>Book now</h1>
          </Link>
        ) : (
          <Link />
        )}
      </div>
      <p className="room-info">{type}</p>
    </article>
  );
};

export default React.memo(RoomCard);
