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
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        configs: {
          showTaskInfo: showTaskInfo,
          showTodays: showTodays,
          editTask: state.tasks.find((task) => task.id === action.payload),
        },
      };

    default:
      return state;
  }
};
