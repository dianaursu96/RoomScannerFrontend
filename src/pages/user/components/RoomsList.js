import React from "react";
import "./RoomsList.css";
import RoomCard from "./RoomCard";

const RoomsList = ({ rooms }) => {
    return (
        <div>
            <h1>Available rooms</h1>
            <div className="recipeList__container">
                {rooms.map((room) => (
                    <RoomCard
                        key={room.id}
                        id={room.id}
                        imageURL={room.imageURL}
                        name={room.name}
                        price={room.price}
                        type={room.type}
                    />
                ))}
            </div>
        </div>

    );
};

export default RoomsList;
