import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import Task from "../Task/Task";
import "./TaskList.scss";

const TaskList = () => {
  const { tasks, configs } = useContext(GlobalContext);

  const todayTasks = tasks.filter((task) => {
    return task.today;
  });

  return (
    <div className="task-list-container">
      {tasks.length !== 0 ? (
        configs[0].showTodays ? (
          <ul className="task-list-ul">
            {todayTasks.map((task, index) => {
              const isUpArrowHidden = index === 0 ? true : false;
              const isDownArrowHidden =
                index === todayTasks.length - 1 ? true : false;
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
