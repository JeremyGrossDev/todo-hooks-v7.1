import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

import "./Task.scss";

const Task = ({ task }) => {
  const { deleteTask, findTask, configs } = useContext(GlobalContext);

  const isTaskInfo = configs[0].showTaskInfo
    ? "task-info-bar-second-row"
    : "task-info-bar-second-row task-hidden";

  return (
    <li className="task-container">
      <div className="task-info-bar">
        <div>{task.title}</div>
        <div className={isTaskInfo}>
          <div>Priority: {task.priority}</div>
          <div>Today: {task.today === true ? "Yes" : "No"}</div>
        </div>
      </div>
      <div>
        <button className="task-btn" onClick={() => findTask(task.id)}>
          <i className="fas fa-pen"></i>
        </button>
        <button className="task-btn" onClick={() => deleteTask(task.id)}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </li>
  );
};

export default Task;
