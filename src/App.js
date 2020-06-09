import React from "react";
import Header from "./components/Header/Header";
import TaskForm from "./components/TaskForm/TaskForm";
import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="app-wrapper">
        <div className="main">
          <Header />
          <TaskForm />
        </div>
      </div>
    </div>
  );
}

export default App;
