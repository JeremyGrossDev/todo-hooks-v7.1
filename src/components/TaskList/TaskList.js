import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import Task from "../Task/Task";
import CheckBox from "../CheckBox/CheckBox";
import "./TaskList.scss";

const TaskList = () => {
  const { tasks, configs, toggleToday, toggleTask } = useContext(GlobalContext);
  //console.log(configs[0].showTaskInfo);

  /* const sortedTasks = tasks.sort(
    (a, b) => a.priority - b.priority || a.title.localeCompare(b.title)
  ); */

  //console.log(sortedTasks);

  const todayTasks = tasks.filter((task) => {
    return task.today;
  });

  const handleCheckBoxChange = (setting) => {
    const todayValue = configs[0].showTodays;
    const taskValue = configs[0].showTaskInfo;
    //console.log(setting);
    setting === "showTodays"
      ? toggleToday(!todayValue)
      : toggleTask(!taskValue);
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
            {todayTasks.map((task, index) => {
              return <Task key={task.id} index={index} task={task} />;
            })}
          </ul>
        ) : (
          <ul className="task-list-ul">
            {tasks.map((task, index) => {
              const isUpArrowHidden = index === 0 ? true : false;
              const isDownArrowHidden =
                index === tasks.length - 1 ? true : false;

              return (
                <Task
                  key={task.id}
                  index={index}
                  task={task}
                  isUpArrowHidden={isUpArrowHidden}
                  isDownArrowHidden={isDownArrowHidden}
                />
              );
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
