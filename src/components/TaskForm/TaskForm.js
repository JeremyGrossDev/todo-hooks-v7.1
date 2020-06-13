import React, { useState } from "react";
import CheckBox from "../CheckBox/CheckBox";
import "./TaskForm.scss";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    priority: "3",
  });

  const { title, priority } = task;

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    console.log(task);
  };

  return (
    <form className="task-form-container">
      <input
        type="text"
        className="task-form-input"
        placeholder="Add Todo..."
        name="title"
        required
        onChange={handleChange}
      />
      <div className="task-form-secondRow">
        <div>
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" onChange={handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <CheckBox title="Today" />
        <button>Add</button>
      </div>
    </form>
  );
};

export default TaskForm;
