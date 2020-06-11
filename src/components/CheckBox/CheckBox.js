import React from "react";
import "./CheckBox.scss";

const CheckBox = ({ title = "" }) => {
  return (
    <div className="checkbox-cantainer">
      <div className="checkbox-title">{title}</div>
      <div className="checkbox-center">
        <input type="checkbox" />
      </div>
    </div>
  );
};

export default CheckBox;
