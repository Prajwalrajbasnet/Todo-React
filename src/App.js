import React from "react";
import List from "./List";
import TaskInput from "./TaskInput";
import Header from "./Header";
import Search from "./Search";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

const LOCAL_STORAGE_KEY = "ToDoList";

class App extends React.Component {
  constructor() {
    super();
    const saved = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY),
      this.dateParser
    );
    this.state = {
      todos: saved,
    };
    this.originalTodos = this.state.todos;
  }

  dateParser(key, value) {
    //reviver which parses JSON date string to javascript DATE object
    const dateFormat = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
    if (typeof value === "string" && dateFormat.test(value)) {
      return new Date(value);
    }
    return value;
  }

  componentDidUpdate() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state.todos));
  }

  toggleMark = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  addTask = (task, deadline) => {
    console.log("deadline in add task: ", deadline);
    if (task) {
      const newTodo = {
        id: uuidv4(),
        task,
        completed: false,
      };
      if (deadline) {
        newTodo.deadline = deadline;
      }
      const addedList = [...this.originalTodos, newTodo];
      this.setState(
        {
          todos: [...addedList],
        },
        () => {
          this.originalTodos = this.state.todos;
        }
      );
    }
  };

  deleteTask = (id) => {
    this.setState(
      {
        todos: this.originalTodos.filter((todo) => todo.id !== id),
      },
      () => {
        this.originalTodos = this.state.todos;
      }
    );
  };

  countIncomplete = () => {
    return this.state.todos.reduce((counter, todo) => {
      const item = todo.completed ? 1 : 0;
      return counter + item;
    }, 0);
  };

  countTotal = () => {
    return this.state.todos.length;
  };

  filterList = (query) => {
    const queryString = query.toUpperCase();
    let filteredTodo = [];
    if (queryString === "") {
      filteredTodo = [...this.originalTodos];
    } else {
      filteredTodo = this.originalTodos.filter((todo) => {
        return todo.task.toUpperCase().indexOf(queryString) > -1;
      });
    }
    this.setState({
      todos: [...filteredTodo],
    });
  };

  render() {
    return (
      <div className="app-container">
        <Header />
        <p className="completion-counter">
          {this.countIncomplete()} completed out of {this.countTotal()}
        </p>
        <Search filterList={this.filterList} />
        <List
          todos={this.state.todos}
          toggleMark={this.toggleMark}
          deleteTask={this.deleteTask}
        />
        <TaskInput addTask={this.addTask} setDeadline={this.setDeadline} />
      </div>
    );
  }
}

export default App;
