import React from "react";
import "./CheckBox.scss";

const CheckBox = ({ title = "", change, checked }) => {
  return (
    <div className="checkbox-cantainer">
      <div className="checkbox-title">{title}</div>
      <div className="checkbox-center">
        <input type="checkbox" onChange={change} checked={checked} />
      </div>
    </div>
  );
};

export default CheckBox;
