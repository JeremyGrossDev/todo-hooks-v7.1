import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

const tasksForState = JSON.parse(localStorage.getItem("tasks")) || [];
const configsForState = JSON.parse(localStorage.getItem("configs")) || [
  {
    showTaskInfo: false,
    showTodays: false,
    sortTaskManual: false,
    editTaskInfo: null,
  },
];

const isSortTaskManual = configsForState[0].configsForState;

const sortedTasks = tasksForState.sort(
  (a, b) => a.priority - b.priority || a.title.localeCompare(b.title)
);

const orderdTasks = sortedTasks.map((task, i) => {
  return {
    order: i,
    id: task.id,
    title: task.title,
    priority: task.priority,
    today: task.today,
    isComplete: task.isComplete,
  };
});

const tasks = isSortTaskManual ? tasksForState : orderdTasks;

//console.log(tasksForState);
//console.log(tasks);

/* const sortedTasks = tasksForState.sort(
  (a, b) => a.priority - b.priority || a.title.localeCompare(b.title)
);

const orderdTasks = sortedTasks.map((task, i) => {
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
  tasks: tasks,
  configs: configsForState,
};
/* const initialState = {
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
}; */

export const GlobalContext = createContext(initialState);

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  //console.log(state);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
    localStorage.setItem("configs", JSON.stringify(state.configs));
  });

  /* console.log(state.tasks);
  const sortedTasks = state.tasks.sort(
    (a, b) => a.priority - b.priority || a.title.localeCompare(b.title)
  );

  const orderdTasks = sortedTasks.map((task, i) => {
    return {
      order: i,
      id: task.id,
      title: task.title,
      priority: task.priority,
      today: task.today,
      isComplete: task.isComplete,
    };
  }); */

  /* const relocateIndex = (array, index, delta) => {
    console.log("move", array, index, delta);

    var newIndex = index + delta;
    if (newIndex < 0 || newIndex === array.length) return; //Already at the top or bottom.
    var indexes = [index, newIndex].sort((a, b) => a - b); //Sort the indixes (fixed)
    array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); //Replace from lowest index, two elements, reverting the order

    return array;
  }; */

  //console.log(relocateIndex(orderdTasks, 3, -1));

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
