import React from "react";
import PropTypes from "prop-types";
import Deadline from "./Deadline";

import plusicon from "./plus.png";
import "./TaskInput.css";

class TaskInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
    };
    this.datetimePicker = React.createRef();
  }

  takeInput = (e) => {
    this.setState({
      task: e.target.value,
    });
  };

  addToDo = (e) => {
    e.preventDefault();
    this.props.addTask(this.state.task, this.state.deadline);
    this.setState(
      {
        task: "",
        deadline: "",
      },
      () => {
        this.datetimePicker.current.resetInput();
      }
    );
  };

  setDeadline = (date) => {
    console.log(date);
    if (date) {
      this.setState(
        {
          deadline: date,
        },
        () => {
          console.log(typeof this.state.deadline);
          return true;
        }
      );
    }
  };

  render() {
    console.log("rendered taskinput");
    return (
      <form className="new-entry" onSubmit={this.addToDo}>
        <input
          type="text"
          className="task-field"
          placeholder="Enter new task......."
          onChange={this.takeInput}
          value={this.state.task}
        ></input>
        <div className="deadline-input">
          <Deadline setDeadline={this.setDeadline} ref={this.datetimePicker} />
        </div>
        <button type="submit" className="add-btn">
          <img src={plusicon} className="add-icon" alt="add"></img>
        </button>
      </form>
    );
  }
}
TaskInput.propTypes = {
  addTask: PropTypes.func.isRequired,
};
export default TaskInput;
