export default (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };
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

    case "CLOSE_TASK":
      console.log("close");
      const newTaskArray = [...state.tasks];
      const elementsIndex = state.tasks.findIndex(
        (element) => element.id === action.payload
      );

      newTaskArray[elementsIndex] = {
        ...newTaskArray[elementsIndex],
        isComplete: !newTaskArray[elementsIndex].isComplete,
      };

      return {
        ...state,
        tasks: newTaskArray,
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
      const isToday = state.configs[0].showTodays;
      let currentTask = action.payload;
      let indexNumber = -1;
      if (isToday) {
        console.log(action.payload);
        const todayTasks = state.tasks.filter((task) => {
          return task.today;
        });

        const currentTodayTaskIndex = todayTasks[action.payload].id;
        const nextTodayTaskIndex = todayTasks[action.payload - 1].id;

        currentTask = state.tasks.findIndex(
          (r) => r.id === currentTodayTaskIndex
        );
        const nextTask = state.tasks.findIndex(
          (i) => i.id === nextTodayTaskIndex
        );

        indexNumber = nextTask - currentTask;
      }

      let relocateIndexUp = (array, index, delta) => {
        const newIndex = index + delta;
        if (newIndex < 0 || newIndex === array.length) return;
        const indexes = [index, newIndex].sort((a, b) => a - b);
        if (!isToday) {
          array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]);
        } else {
          const taskReorder = array[indexes[0]];
          array.splice(indexes[0], 1);
          array.splice(indexes[1], 0, taskReorder);
        }
        return array;
      };

      return {
        ...state,
        tasks: relocateIndexUp(state.tasks, currentTask, indexNumber),
      };

    case "MOVE_TASK_DOWN":
      console.log("Task moved Down");
      const isToday1 = state.configs[0].showTodays;
      let currentTask1 = action.payload;
      let indexNumber1 = 1;
      if (isToday1) {
        console.log(action.payload);
        const todayTasks = state.tasks.filter((task) => {
          return task.today;
        });

        const currentTodayTaskIndex = todayTasks[action.payload].id;
        const nextTodayTaskIndex = todayTasks[action.payload + 1].id;

        currentTask1 = state.tasks.findIndex(
          (r) => r.id === currentTodayTaskIndex
        );
        const nextTask = state.tasks.findIndex(
          (i) => i.id === nextTodayTaskIndex
        );

        indexNumber1 = nextTask - currentTask1;
      }

      let relocateIndexDown = (array, index, delta) => {
        const newIndex = index + delta;
        if (newIndex < 0 || newIndex === array.length) return;
        const indexes = [index, newIndex].sort((a, b) => a - b);
        if (!isToday1) {
          array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]);
        } else {
          const taskReorder = array[indexes[0]];
          array.splice(indexes[0], 1);
          array.splice(indexes[1], 0, taskReorder);
        }
        return array;
      };

      return {
        ...state,
        tasks: relocateIndexDown(state.tasks, currentTask1, indexNumber1),
      };

    default:
      return state;
  }
};
