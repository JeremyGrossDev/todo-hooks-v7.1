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
    default:
      return state;
  }
};
