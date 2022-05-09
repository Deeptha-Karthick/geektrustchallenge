import React from "react";
import "./pagination.css";

const Pagination = ({ detailsPerPage, totalDetails, paginate }) => {
  const pageNumbers = [];

  const totalPages = Math.ceil(totalDetails / detailsPerPage);

  for (let i = 1; i <= Math.ceil(totalDetails / detailsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="nav">
      <ul className="pagination">
        <li className="page-item">
          <a onClick={() => paginate(1)} href="!#" className="page-link">
            {`<<`}
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            onClick={() => paginate(totalPages)}
            href="!#"
            className="page-link"
          >
            {`>>`}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
