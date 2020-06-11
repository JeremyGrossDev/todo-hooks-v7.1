import React from "react";
import CheckBox from "../CheckBox/CheckBox";
import "./TaskForm.scss";

const TaskForm = () => {
  return (
    <form className="task-form-container">
      <input
        type="text"
        className="task-form-input"
        placeholder="Add Todo..."
        required
      />
      <div className="task-form-secondRow">
        <div>
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority">
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
