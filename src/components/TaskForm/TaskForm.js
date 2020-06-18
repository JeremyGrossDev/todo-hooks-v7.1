import React, { useState, useContext, useEffect } from "react";
import CheckBox from "../CheckBox/CheckBox";
import { GlobalContext } from "../../context/GlobalState";
import { v4 as uuidv4 } from "uuid";
import "./TaskForm.scss";
//import TaskList from "../TaskList/TaskList";

const TaskForm = () => {
  const { addTask, configs, editTask } = useContext(GlobalContext);

  const [task, setTask] = useState({
    id: uuidv4(),
    title: "",
    priority: "3",
    today: false,
    isComplete: false,
  });

  const { title, priority, today } = task;
  const editInfo = configs[0].editTaskInfo;
  //console.log(editInfo);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    //console.log(task);
  };

  const handleCheckBoxChange = (check) => {
    const todayValue = today;
    setTask({ ...task, today: !todayValue });
    //console.log(task);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editInfo === null ? addTask(task) : editTask(task);

    setTask({
      id: uuidv4(),
      title: "",
      priority: "3",
      today: false,
      isComplete: false,
    });
  };

  useEffect(() => {
    if (editInfo === null) {
      setTask({
        id: uuidv4(),
        title: "",
        priority: "3",
        today: false,
        isComplete: false,
      });
    } else {
      setTask({
        id: editInfo.id,
        title: editInfo.title,
        priority: editInfo.priority,
        today: editInfo.today,
        isComplete: editInfo.isComplete,
      });
    }
  }, [editInfo]);

  return (
    <form className="task-form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-form-input"
        placeholder="Add Todo..."
        name="title"
        required
        value={title}
        onChange={handleChange}
      />
      <div className="task-form-secondRow">
        <div>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            onChange={handleChange}
            value={priority}
          >
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </div>
        <CheckBox title="Today" change={handleCheckBoxChange} checked={today} />
        <button>{editInfo === null ? "Add" : "Edit"}</button>
      </div>
    </form>
  );
};

export default TaskForm;
