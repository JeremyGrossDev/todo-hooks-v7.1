import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  tasks: [
    {
      id: 1,
      title: "Feed the cat to the dog",
      priority: 2,
      today: true,
      isComplete: false,
    },
    {
      id: 2,
      title: "Give the fish a bath",
      priority: 1,
      today: false,
      isComplete: false,
    },
    {
      id: 3,
      title: "Watch a snells for a race",
      priority: 3,
      today: true,
      isComplete: true,
    },
  ],
  configs: [
    {
      showTaskInfo: false,
      showTodays: false,
      editTaskInfo: null,
    },
  ],
};

export const GlobalContext = createContext(initialState);

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

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

  return (
    <GlobalContext.Provider
      value={{
        tasks: state.tasks,
        configs: state.configs,
        addTask,
        deleteTask,
        findTask,
        editTask,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
