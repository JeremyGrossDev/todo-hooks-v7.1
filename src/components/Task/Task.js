import React from "react";
import "./Task.scss";

const Task = ({ task }) => {
  return (
    <li className="task-container">
      <div className="task-info-bar">
        <div>{task.title}</div>
        <div className="task-info-bar-second-row">
          <div>Priority: {task.priority}</div>
          <div>Today: {task.today === true ? "Yes" : "No"}</div>
        </div>
      </div>
      <div>
        <button className="task-btn ">
          <i className="fas fa-pen"></i>
        </button>
        <button className="task-btn">
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </li>
  );
};

export default Task;
