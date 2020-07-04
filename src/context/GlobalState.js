import React, { createContext, useReducer, useEffect } from "react";
import logger from "use-reducer-logger";
import AppReducer from "./AppReducer";
//import Tasks from "./TasksData";

const tasksForState = JSON.parse(localStorage.getItem("tasks")) || [];
const configsForState = JSON.parse(localStorage.getItem("configs")) || [
  {
    showTaskInfo: false,
    showTodays: false,
    sortTaskManual: false,
    editTaskInfo: null,
  },
];
//console.log(tasksForState);
const isSortTaskManual = configsForState[0].sortTaskManual;

if (!isSortTaskManual) {
  tasksForState.sort(
    (a, b) => a.priority - b.priority || a.title.localeCompare(b.title)
  );
}

//const isSorted = isSortTaskManual ? tasksForState : tasksForState;
//console.log(isSortTaskManual);
//console.log(sortedTasks);

/* const orderdTasks = sortedTasks.map((task, i) => {
  return {
    order: i,
    id: task.id,
    title: task.title,
    priority: task.priority,
    today: task.today,
    isComplete: task.isComplete,
  };
}); */

const initialState = {
  tasks: tasksForState,
  configs: configsForState,
};

export const GlobalContext = createContext(initialState);

export const GlobalContextProvider = ({ children }) => {
  //const [state, dispatch] = useReducer(logger(AppReducer), initialState);
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
    localStorage.setItem("configs", JSON.stringify(state.configs));
  });

  const addTask = (task) => {
    dispatch({
      type: "ADD_TASK",
      payload: task,
    });
  };

  const deleteTask = (id) => {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  };

  const findTask = (id) => {
    dispatch({
      type: "FIND_TASK",
      payload: id,
    });
  };

  const editTask = (task) => {
    dispatch({
      type: "EDIT_TASK",
      payload: task,
    });
  };

  const toggleToday = (value) => {
    dispatch({
      type: "TOGGLE_TODAY",
      payload: value,
    });
  };

  const toggleTask = (value) => {
    dispatch({
      type: "TOGGLE_TASK",
      payload: value,
    });
  };

  const toggleSort = (value) => {
    dispatch({
      type: "TOGGLE_SORT",
      payload: value,
    });
  };

  const moveTaskUp = (value) => {
    dispatch({
      type: "MOVE_TASK_UP",
      payload: value,
    });
  };

  const moveTaskDown = (index) => {
    dispatch({
      type: "MOVE_TASK_DOWN",
      payload: index,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        tasks: state.tasks,
        configs: state.configs,
        addTask,
        deleteTask,
        findTask,
        editTask,
        toggleToday,
        toggleTask,
        toggleSort,
        moveTaskUp,
        moveTaskDown,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
