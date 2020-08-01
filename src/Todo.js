import React from "react";
import PropTypes from "prop-types";

import deadlineIcon from "./deadline.png";
import deadlineMissedIcon from "./deadline-missed.png";
import deleticon from "./delete.png";
import "./Todo.css";

class Todo extends React.Component {
  getTextStyle = () => {
    return {
      textDecoration: this.props.completed ? "line-through" : "none",
      color: this.props.completed ? "#7f8285" : "black",
    };
  };

  formatDeadline(date) {
    const month = date.getMonth() + 1; //javascript counts month starting from 0
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const rn = new Date();
    const d =
      day === rn.getDate() && month === rn.getMonth() + 1
        ? "Today"
        : day + 1 === rn.getDate() && month === rn.getMonth() + 1
        ? "Yesterday"
        : day - 1 === rn.getDate() && month === rn.getMonth() + 1
        ? "Tomorrow"
        : month.toString().padStart(2, "0") +
          "/" +
          day.toString().padStart(2, "0");
    const t =
      hour.toString().padStart(2, "0") +
      ":" +
      minute.toString().padStart(2, "0");
    const formatted = d + " " + t;
    return formatted;
  }

  hasDeadlineMissed(date) {
    const now = new Date();
    if (now.getTime() > date.getTime()) return true;
    return false;
  }

  render() {
    return (
      <li className="todo" style={this.getTextStyle()}>
        <input
          type="checkbox"
          className="completion-checkbox"
          name="completion-status"
          onChange={this.props.toggleMark.bind(this, this.props.id)}
          defaultChecked={this.props.completed}
        ></input>
        <span className="task">{this.props.task}</span>
        <button
          className="delete-task"
          onClick={this.props.deleteTask.bind(this, this.props.id)}
        >
          <img src={deleticon} className="delete-icon" alt="delete"></img>
        </button>
        {this.props.deadline && (
          <p
            className={
              this.hasDeadlineMissed(this.props.deadline)
                ? "deadline missed"
                : "deadline"
            }
          >
            <img
              className="deadline-icon"
              src={
                this.hasDeadlineMissed(this.props.deadline)
                  ? deadlineMissedIcon
                  : deadlineIcon
              }
              alt="deadline"
            ></img>{" "}
            {this.formatDeadline(this.props.deadline)}
          </p>
        )}
      </li>
    );
  }
}

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  task: PropTypes.string.isRequired,
  deadline: PropTypes.object,
  toggleMark: PropTypes.func.isRequired,
};

export default Todo;
