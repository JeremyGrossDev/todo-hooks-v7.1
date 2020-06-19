import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import Task from "../Task/Task";
import CheckBox from "../CheckBox/CheckBox";
import "./TaskList.scss";

const TaskList = () => {
  const { tasks, configs, toggleToday, toggleTask } = useContext(GlobalContext);
  //console.log(configs[0].showTaskInfo);

  const sortedTasks = tasks.sort(
    (a, b) => a.priority - b.priority || a.title.localeCompare(b.title)
  );

  console.log(sortedTasks);

  const todayTasks = sortedTasks.filter((task) => {
    return task.today;
  });

  const handleCheckBoxChange = (setting) => {
    const todayValue = configs[0].showTodays;
    const taskValue = configs[0].showTaskInfo;
    //console.log(setting);
    setting === "showTodays"
      ? toggleToday(!todayValue)
      : toggleTask(!taskValue);

    function compare(a, b) {
      // Use toUpperCase() to ignore character casing
      console.log(a);
      console.log(b);
      const bandA = a.priority;
      const bandB = b.priority;

      let comparison = 0;
      if (bandA > bandB) {
        comparison = 1;
      } else if (bandA < bandB) {
        comparison = -1;
      }
      return comparison;
    }

    /* const sortedData = tasks.sort(compare);

    const sortedTasks = tasks.sort(
      (a, b) =>
        b.priority.localeCompare - a.priority.localeCompare ||
        a.title.localeCompare(b.title)
    );

    //console.log(rats); */
  };

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <div>
          {
            <CheckBox
              title="Task info"
              change={() => handleCheckBoxChange("showTaskInfo")}
              checked={configs[0].showTaskInfo}
            />
          }
        </div>
        <div>
          {
            <CheckBox
              title="Show Today's"
              change={() => handleCheckBoxChange("showTodays")}
              checked={configs[0].showTodays}
            />
          }
        </div>
      </div>
      {tasks.length !== 0 ? (
        configs[0].showTodays ? (
          <ul className="task-list-ul">
            {todayTasks.map((task) => {
              return <Task key={task.id} task={task} />;
            })}
          </ul>
        ) : (
          <ul className="task-list-ul">
            {sortedTasks.map((task) => {
              return <Task key={task.id} task={task} />;
            })}
          </ul>
        )
      ) : (
        <div className="task-no-task-text">No tasks</div>
      )}
    </div>
  );
};

export default TaskList;
