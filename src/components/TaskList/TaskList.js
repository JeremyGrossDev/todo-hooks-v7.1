import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import Task from "../Task/Task";
import "./TaskList.scss";

const TaskList = () => {
  const { tasks } = useContext(GlobalContext);
  console.log(tasks);
  return (
    <div className="task-list-container">
      <ul className="task-list-ul">
        {tasks.map((task) => {
          return <Task key={task.id} task={task} />;
        })}
      </ul>
    </div>
  );
};

export default TaskList;
