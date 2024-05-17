import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFireAlt, FaRegClock, FaHeart } from "react-icons/fa";
import { BedDouble } from "lucide-react";
import "./RoomCard.css";
import Card from "./Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { readerActions } from "../../../redux/store/reader-slice";
import { alertActions } from "../../../redux/store/alert-slice";

const RoomCard = ({ id, name, imageURL, price, type, isAvailable }) => {
  const token = useSelector((state) => state.auth.token);

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
            to={`/room/${id}`}
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
