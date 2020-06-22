import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import CheckBox from "../CheckBox/CheckBox";
import "./DisplayOptions.scss";

const DisplayOptions = () => {
  const { configs, toggleToday, toggleTask } = useContext(GlobalContext);

  const handleCheckBoxChange = (setting) => {
    const todayValue = configs[0].showTodays;
    const taskValue = configs[0].showTaskInfo;
    //console.log(setting);
    setting === "showTodays"
      ? toggleToday(!todayValue)
      : toggleTask(!taskValue);
  };

  return (
    <div className="displayOptions">
      <div>
        {
          <CheckBox
            title="Task info"
            change={() => handleCheckBoxChange("showTaskInfo")}
            checked={configs[0].showTaskInfo}
          />
        }
      </div>
      {/* <div>
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" name="sort">
            <option value="3">Task</option>
            <option value="2">Manual</option>
          </select>
        </div> */}
      <div>
        {
          <CheckBox
            title="Show Today's"
            change={() => handleCheckBoxChange("showTodays")}
            checked={configs[0].showTodays}
          />
        }
      </div>
    </div>
  );
};

export default DisplayOptions;
