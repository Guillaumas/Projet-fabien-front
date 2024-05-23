// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:8080/api/tasks');
    setTasks(response.data);
  };

  const addTask = async (task) => {
    const response = await axios.post('http://localhost:8080/api/tasks', task);
    setTasks([...tasks, response.data]);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8080/api/tasks/${id}`);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = async (task) => {
    const response = await axios.put(`http://localhost:8080/api/tasks/${task.id}`, task);
    setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
    setEditTask(null);
  };

  const handleUpdate = (task) => {
    setEditTask(task);
  };

  return (
      <div className="App">
        <h1>Todo List</h1>
        <TaskForm onSubmit={editTask ? updateTask : addTask} initialTask={editTask} />
        <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={handleUpdate} />
      </div>
  );
};

export default App;
