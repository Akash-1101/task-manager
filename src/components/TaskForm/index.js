import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TaskItem from "../TaskItem";
import "./index.css";

class TaskForm extends Component {
  state = {
    title: "",
    description: "",
    dueDate: new Date(),
    priority: "low",
    status: "in-progress",
    tasksList: [],
    searchInput: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      description,
      dueDate,
      priority,
      status,
      tasksList,
    } = this.state;

    if (title.trim() === "" || description.trim() === "") {
      alert("Title and Description are required!");
      return;
    }

    // You should handle form submission logic here
    const newData = {
      id: uuidv4(),
      title,
      description,
      dueDate,
      priority,
      status,
    };

    // Reset the form
    this.setState({
      title: "",
      description: "",
      dueDate: new Date(),
      priority: "low",
      status: "in-progress",
      tasksList: [...tasksList, newData],
    });
  };

  onClickDelete = (id) => {
    const { tasksList } = this.state;
    const filteredList = tasksList.filter((each) => each.id !== id);
    this.setState({ tasksList: filteredList });
  };

  onClickS = (id) => {
    const { tasksList } = this.state;
    const n = tasksList.map((each) => {
      if (each.id === id) {
        let a;
        if (each.status === "in-progress") {
          a = "completed";
        } else {
          a = "in-progress";
        }
        return { ...each, status: a };
      }
      return each;
    });
    this.setState({ tasksList: n });
  };

  onSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  render() {
    const {
      title,
      description,
      dueDate,
      priority,
      tasksList,
      searchInput,
    } = this.state;
    const filtered = tasksList.filter((each) =>
      each.title.includes(searchInput)
    );

    return (
      <div>
        <div className="form-main-container">
          <h1 className="main-headingEl">Task Manager</h1>
          <form onSubmit={this.handleSubmit} className="task-form">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => this.setState({ title: e.target.value })}
              required
              className="input1"
            />

            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => this.setState({ description: e.target.value })}
              required
              className="input1"
            />

            <label>Due Date:</label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => this.setState({ dueDate: date })}
            />

            <label>Priority:</label>
            <select
              value={priority}
              onChange={(e) => this.setState({ priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <button className="addTask-btn" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="">
          <h1 className="main-headingEl">Tasks</h1>
          <div className="search-container">
            <input
              onChange={this.onSearchInput}
              placeholder="search for the task"
              type="search"
            />
          </div>
          <ul className="taskItem-container">
            {filtered.map((task) => (
              <TaskItem
                onClickDelete={this.onClickDelete}
                onClickS={this.onClickS}
                task={task}
                key={task.title}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default TaskForm;
