import React from "react";
import "./Header.scss";

const Header = () => {
  let date = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["Sun", "Monday", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const displayDate =
    days[date.getDay()] +
    " " +
    months[date.getMonth()] +
    " " +
    date.getUTCDate() +
    " " +
    date.getUTCFullYear();
  return (
    <div className="header">
      <div>Machen</div>
      <div className="header-date">{displayDate}</div>
    </div>
  );
};

export default Header;
