import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:8080/api/tasks', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(response.data);
  };

  const addTask = async (task) => {
    const response = await axios.post('http://localhost:8080/api/tasks', task, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks([...tasks, response.data]);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8080/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = async (task) => {
    const response = await axios.put(`http://localhost:8080/api/tasks/${task.id}`, task, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
    setEditTask(null);
  };

  const handleUpdate = (task) => {
    setEditTask(task);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  if (!token) {
    return (
        <div className="App">
          <h1>Todo List</h1>
          <LoginForm setToken={(token) => {
            setToken(token);
            localStorage.setItem('token', token);
          }} />
          <SignupForm />
        </div>
    );
  }

  return (
      <div className="App">
        <h1>Todo List</h1>
        <button onClick={handleLogout}>Logout</button>
        <TaskForm onSubmit={editTask ? updateTask : addTask} initialTask={editTask} />
        <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={handleUpdate} />
      </div>
  );
};

export default App;
