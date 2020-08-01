import React from "react";
import Todo from "./Todo.js";
import PropTypes from "prop-types";

import listicon from "./list.png";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: true,
    };
  }

  static getDerivedStateFromProps(props) {
    let empty = props.todos.length > 0 ? false : true;
    return { empty };
  }

  render() {
    return (
      <ul className="list-container">
        {this.props.todos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              id={todo.id}
              task={todo.task}
              completed={todo.completed}
              deadline={todo.deadline}
              toggleMark={this.props.toggleMark}
              deleteTask={this.props.deleteTask}
            />
          );
        })}
        {this.state.empty && (
          <div className="empty-list">
            <div className="notifiers-wrapper">
              <img className="list-icon" src={listicon} alt="list"></img>
              <p className="empty-info">The tasklist is empty!</p>
            </div>
          </div>
        )}
      </ul>
    );
  }
}

List.propTypes = {
  todos: PropTypes.array.isRequired,
  toggleMark: PropTypes.func.isRequired,
};

export default List;
