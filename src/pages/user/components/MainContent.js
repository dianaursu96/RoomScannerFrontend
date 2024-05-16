import React, { Fragment, useState } from "react";
import RoomsList from "./RoomsList";
import "./MainContent.css";
import Pagination from "./Pagination";

const MainContent = ({ rooms }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 4;
  const indexOfLastRecipe = currentPage * roomsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - roomsPerPage;
  const currentRooms =
    rooms.length > 0 && rooms.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => {
    if (pageNumber === "previous" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (
      pageNumber === "next" &&
      currentPage < Math.ceil(rooms.length / roomsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    } else if (!isNaN(pageNumber)) {
      setCurrentPage(pageNumber);
    }
  };

  const content =
    rooms.length > 0 ? (
      <RoomsList rooms={currentRooms} />
    ) : (
      <h1 className="no-content-container">No results found</h1>
    );
  return (
    <Fragment>
      <main id="main-content" className="main-content-container">
        {content}
      </main>
      {rooms.length > 0 && (
        <Pagination
          currentPageNumber={currentPage}
          roomsPerPage={roomsPerPage}
          totalRooms={rooms.length}
          paginate={paginate}
        />
      )}
    </Fragment>
  );
};

export default MainContent;
