import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import Task from "../Task/Task";
import CheckBox from "../CheckBox/CheckBox";
import "./TaskList.scss";

const TaskList = () => {
  const { tasks, configs, toggleToday } = useContext(GlobalContext);
  console.log(configs[0].showTodays);

  const todayTasks = tasks.filter((task) => {
    return task.today;
  });

  const handleCheckBoxChange = (check) => {
    const todayValue = configs[0].showTodays;
    toggleToday(!todayValue);
    console.log(check.target.value);
  };

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <div>{<CheckBox title="Task info" />}</div>
        <div>
          {
            <CheckBox
              title="Show Today's"
              change={handleCheckBoxChange}
              checked={configs[0].showTodays}
            />
          }
        </div>
      </div>
      {configs[0].showTodays ? (
        <ul className="task-list-ul">
          {todayTasks.map((task) => {
            return <Task key={task.id} task={task} />;
          })}
        </ul>
      ) : (
        <ul className="task-list-ul">
          {tasks.map((task) => {
            return <Task key={task.id} task={task} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
