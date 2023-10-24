/**Importing React Components */
import React from 'react'

/**Importing React Icons */
import {IoReturnDownBackOutline} from 'react-icons/io5'

/**Importing Firebase Components */
import { db } from '../Firebase';
import { collection, addDoc, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function AddTask(props) {
  const { manager } = props;
  const [taskDetails, setTaskDetails] = React.useState({
    name: '',
    description: '',
    status: 'todo',
    priority: 'low',
    deadline: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskDetails((prevTaskDetails) => ({
      ...prevTaskDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Add logic to submit task details
  };

  return (
    <>
      <div className="header">
        <p>Add Task</p>
        <IoReturnDownBackOutline onClick={() => props.changeTab('task-board')} className="add-icon" />
      </div>

      <div className="add-task-form">
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" value={taskDetails.name} onChange={handleChange} />

        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          value={taskDetails.description}
          onChange={handleChange}
          maxLength={300}
        />

        <label htmlFor="status">Status:</label>
        <select name="status" id="status" value={taskDetails.status} onChange={handleChange}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <label htmlFor="priority">Priority:</label>
        <select name="priority" id="priority" value={taskDetails.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label htmlFor="deadline">Deadline:</label>
        <input type="date" name="deadline" id="deadline" value={taskDetails.deadline} onChange={handleChange} />

        <button type="submit">Add Task</button>
      </div>
    </>
  );
}