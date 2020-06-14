import React, { useState, useContext } from "react";
import CheckBox from "../CheckBox/CheckBox";
import { GlobalContext } from "../../context/GlobalState";
import { v4 as uuidv4 } from "uuid";
import "./TaskForm.scss";

const TaskForm = () => {
  const { addTask } = useContext(GlobalContext);

  const [task, setTask] = useState({
    id: uuidv4(),
    title: "",
    priority: "3",
    today: false,
    isComplete: false,
  });

  const { title, priority, today } = task;

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
    addTask(task);

    setTask({
      id: uuidv4(),
      title: "",
      priority: "3",
      today: false,
      isComplete: false,
    });
  };

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
        <button>Add</button>
      </div>
    </form>
  );
};

export default TaskForm;
