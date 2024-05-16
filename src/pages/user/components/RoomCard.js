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

const RoomCard = ({ id, name, imageURL, price, type }) => {
  const token = useSelector((state) => state.auth.token);

  return (
    // <Card className="recipe-item-container">
    //     <div className="recipe-card-header">
    //         <div>
    //             <Link
    //                 to={`/room/${id}`}
    //                 state={{
    //                     id: id,
    //                 }}
    //             >
    //                 <img src='https://suretyhotel.com/wp-content/uploads/2021/01/Deluxe-King-and-Surety-King-scaled-1280x0-c-default.webp' alt="not available" />
    //             </Link>
    //             <div className="favorites-button-group">
    //                 <button
    //                     style={{
    //                         background: "var(--inverse)",
    //                         color: "var(--primary)",
    //                     }}
    //                 >
    //                     €{price}
    //                 </button>
    //             </div>
    //         </div>
    //     </div>
    //     <div className="recipe-card-body">
    //         <div className="recipe-title">
    //             <h1>{name}</h1>
    //         </div>
    //         <div className="recipe-details">
    //             <div className="recipe-tag__calorie-time">
    //                 <span>
    //                     <BedDouble />
    //                     {type}
    //                 </span>
    //             </div>
    //         </div>
    //     </div>
    //     <button style={{
    //         background: "var(--primary)",
    //         color: "var(--inverse)",
    //     }}>Book now</button>
    // </Card>
    <article className="room">
      <div className="img-container">
        <img src={imageURL} alt="single room" />

        <div className="price-top">
          <h6>€ {price}</h6>
          <p>per night</p>
        </div>

        <Link to={`/rooms/${id}`} className="btn-primary room-link">
          Book now
        </Link>
      </div>
      <p className="room-info">{name}</p>
    </article>
  );
};

export default React.memo(RoomCard);
