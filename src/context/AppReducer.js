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
      return {
        state,
      };

    case "MOVE_TASK_DOWN":
      console.log("Task moved Down");
      console.log(action.payload);
      const relocateIndex = (array, index, delta) => {
        console.log("move", array, index, delta);

        var newIndex = index + delta;
        if (newIndex < 0 || newIndex === array.length) return; //Already at the top or bottom.
        var indexes = [index, newIndex].sort((a, b) => a - b); //Sort the indixes (fixed)
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); //Replace from lowest index, two elements, reverting the order
        console.log(array);
        return array;
      };

      //console.log(relocateIndex(state.tasks, action.payload, 1));
      return {
        ...state,
        tasks: relocateIndex(state.tasks, action.payload, 1),
      };

    default:
      return state;
  }
};
