import React, { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
//import logger from "use-reducer-logger";
import AppReducer from "./AppReducer";
//import Tasks from "./TasksData";

const tasksForState = [];
//const tasksForState = JSON.parse(localStorage.getItem("tasks")) || [];
const configsForState = JSON.parse(localStorage.getItem("configs")) || [
  {
    showTaskInfo: false,
    showTodays: false,
    sortTaskManual: false,
    editTaskInfo: null,
  },
];

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
    console.log("useEffect: Get data");
    axios({
      url: "http://10.1.2.40:3010/getTasksJSON",
      method: "get",
    })
      .then((res) => {
        const isSortTaskManual = configsForState[0].sortTaskManual;
        const result = res.data;
        if (!isSortTaskManual) {
          result.sort(
            (a, b) => a.priority - b.priority || a.title.localeCompare(b.title)
          );
        }
        setTasks(result);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);

  useEffect(() => {
    console.log("useEffect: Set Configs");
    //localStorage.setItem("tasks", JSON.stringify(state.tasks));
    localStorage.setItem("configs", JSON.stringify(state.configs));
  });

  useEffect(() => {
    console.log("useEffect: Set data");
    axios({
      url: "http://10.1.2.40:3010/setTasksJSON",
      method: "post",
      data: { tasks: state.tasks },
    })
      .then((res) => {
        const isSortTaskManual = configsForState[0].sortTaskManual;
        const result = res.data;
        if (!isSortTaskManual) {
          result.sort(
            (a, b) => a.priority - b.priority || a.title.localeCompare(b.title)
          );
        }
        //setTasks(result);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, [state]);

  const setTasks = (task) => {
    dispatch({
      type: "SET_TASKS",
      payload: task,
    });
  };

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

  const closeTask = (id) => {
    dispatch({
      type: "CLOSE_TASK",
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
        setTasks,
        addTask,
        deleteTask,
        findTask,
        closeTask,
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
