// TaskItem.js

import React from "react";
import "./index.css"; // Import the CSS file

class TaskItem extends React.Component {
  onStatusChange = (taskId) => {
    const { onClickS } = this.props;
    onClickS(taskId);
  };

  onDelete = (taskId) => {
    // Implement your onDelete logic here
    const { onClickDelete } = this.props;
    onClickDelete(taskId);
  };

  render() {
    const { task } = this.props;

    return (
      <li className="task-item" key={task.id}>
        <div>
          <div className="task-info">
            <h1 className="task-title">{task.title}</h1>
            <p className="task-description">{task.description}</p>
            <p className="task-due-date">
              Due Date: {task.dueDate.toDateString()}
            </p>
            <p className="task-priority">Priority: {task.priority}</p>
          </div>
          <div className="task-status">
            <p
              className={`status-indicator ${
                task.status === "completed"
                  ? "status-completed"
                  : "status-in-progress"
              }`}
            >
              {" "}
            </p>
            <p> {task.status}</p>
          </div>
        </div>
        <div>
          <button onClick={() => this.onStatusChange(task.id)}>
            {task.status === "completed" ? "Completed" : "Mark as completed"}
          </button>
          <button onClick={() => this.onDelete(task.id)}>Delete</button>
        </div>
      </li>
    );
  }
}

export default TaskItem;
