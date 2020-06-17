export default (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((tasks) => tasks.id !== action.payload),
      };

    case "FIND_TASK":
      const { showTaskInfo, showTodays } = state.configs[0];
      return {
        ...state,
        configs: {
          0: {
            showTaskInfo: showTaskInfo,
            showTodays: showTodays,
            editTaskInfo: state.tasks.find(
              (task) => task.id === action.payload
            ),
          },
        },
      };

    case "EDIT_TASK":
      const { tasks } = state;
      const tid = action.payload.id;
      const newTasks = tasks.map((task) => {
        return task.id === tid ? action.payload : task;
      });

      return {
        ...state,
        tasks: newTasks,
        configs: {
          0: {
            showTaskInfo: state.configs[0].showTaskInfo,
            showTodays: state.configs[0].showTodays,
            editTaskInfo: null,
          },
        },
      };

    case "TOGGLE_TODAY":
      return {
        ...state,
        configs: {
          0: {
            showTaskInfo: state.configs[0].showTaskInfo,
            showTodays: action.payload,
            editTaskInfo: state.configs[0].editTaskInfo,
          },
        },
      };

    default:
      return state;
  }
};
