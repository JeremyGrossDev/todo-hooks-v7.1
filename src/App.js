import React from "react";
import Header from "./components/Header/Header";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import DisplayOptions from "./components/DisplayOptions/DisplayOptions";
import { GlobalContextProvider } from "./context/GlobalState";
import "./App.css";

function App() {
  return (
    <GlobalContextProvider>
      <div className="container">
        <div className="app-wrapper">
          <div className="main">
            <Header />
            <TaskForm />
            <DisplayOptions />
            <TaskList />
          </div>
        </div>
      </div>
    </GlobalContextProvider>
  );
}

export default App;
