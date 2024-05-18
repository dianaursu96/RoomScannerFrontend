import React from "react";
import "./Pagination.css";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const Pagination = ({
  currentPageNumber,
  roomsPerPage,
  totalRooms,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRooms / roomsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li>
          <a onClick={() => paginate("previous")}>
            <FaArrowCircleLeft />
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={currentPageNumber === number ? "active" : ""}
          >
            <a onClick={() => paginate(number)}>{number}</a>
          </li>
        ))}
        <li>
          <a onClick={() => paginate("next")}>
            <FaArrowCircleRight />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
