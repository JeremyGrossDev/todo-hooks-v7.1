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
      const { showTaskInfo, showTodays, sortTaskManual } = state.configs[0];
      return {
        ...state,
        configs: {
          0: {
            showTaskInfo: showTaskInfo,
            showTodays: showTodays,
            sortTaskManual: sortTaskManual,
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
            sortTaskManual: state.configs[0].sortTaskManual,
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
            sortTaskManual: state.configs[0].sortTaskManual,
            editTaskInfo: state.configs[0].editTaskInfo,
          },
        },
      };

    case "TOGGLE_TASK":
      return {
        ...state,
        configs: {
          0: {
            showTaskInfo: action.payload,
            showTodays: state.configs[0].showTodays,
            sortTaskManual: state.configs[0].sortTaskManual,
            editTaskInfo: state.configs[0].editTaskInfo,
          },
        },
      };

    case "TOGGLE_SORT":
      const isSortTaskManual = state.configs[0].sortTaskManual;
      if (isSortTaskManual) {
        state.tasks.sort(
          (a, b) => a.priority - b.priority || a.title.localeCompare(b.title)
        );
      }
      return {
        ...state,
        configs: {
          0: {
            showTaskInfo: state.configs[0].showTaskInfo,
            showTodays: state.configs[0].showTodays,
            sortTaskManual: action.payload,
            editTaskInfo: state.configs[0].editTaskInfo,
          },
        },
      };

    case "MOVE_TASK_UP":
      console.log("Task moved up");
      let relocateIndexUp = (array, index, delta) => {
        const newIndex = index + delta;
        if (newIndex < 0 || newIndex === array.length) return;
        const indexes = [index, newIndex].sort((a, b) => a - b);
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]);
        return array;
      };

      return {
        ...state,
        tasks: relocateIndexUp(state.tasks, action.payload, -1),
      };

    case "MOVE_TASK_DOWN":
      console.log("Task moved Down");

      let relocateIndexDown = (array, index, delta) => {
        console.log(array, index, delta);
        const newIndex = index + delta;
        if (newIndex < 0 || newIndex === array.length) return;
        const indexes = [index, newIndex].sort((a, b) => a - b);
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]);
        return array;
      };

      return {
        ...state,
        tasks: relocateIndexDown(state.tasks, action.payload, 1),
      };

    default:
      return state;
  }
};
