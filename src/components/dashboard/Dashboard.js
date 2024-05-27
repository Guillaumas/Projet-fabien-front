import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard({ onLogout, successMessage}) {
  const [tasks, setTasks] = useState([]);
  const [labels, setLabels] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [todoLists, setTodoLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState('');
  const [newTag, setNewTag] = useState({ name: '', taskId: null });

  useEffect(() => {
    fetchTasks();
    fetchLabels();
    fetchTodoLists();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:8080/api/tasks');
    setTasks(response.data);
  };

  const fetchLabels = async () => {
    const response = await axios.get('http://localhost:8080/api/labels');
    setLabels(response.data);
  };

  const fetchTodoLists = async () => {
    const response = await axios.get('http://localhost:8080/api/todolists', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    setTodoLists(response.data);
  };

  const handleAddTask = async () => {
    const response = await axios.post('http://localhost:8080/api/tasks', { title: newTask });
    setTasks([...tasks, response.data]);
    setNewTask('');
  };

  const handleAddLabel = async () => {
    const response = await axios.post('http://localhost:8080/api/labels', { name: newLabel });
    setLabels([...labels, response.data]);
    setNewLabel('');
  };

  const createTodoList = async () => {
    try {
      await axios.post('http://localhost:8080/api/todolists', { title: newListTitle }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setNewListTitle('');
      fetchTodoLists();
    } catch (error) {
      console.error('Error creating todo list:', error);
    }
  };

  return (
      <div>
        <h1>Dashboard</h1>
        {successMessage && <p>{successMessage}</p>}
        <button onClick={onLogout}>Logout</button>
      <div>
        <h2>Tasks</h2>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <button onClick={handleAddTask}>Add Task</button>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Labels</h2>
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="New label"
        />
        <button onClick={handleAddLabel}>Add Label</button>
        <ul>
          {labels.map(label => (
            <li key={label.id}>{label.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Todo Lists</h2>
        <input
          type="text"
          placeholder="New Todo List"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
        />
        <button onClick={createTodoList}>Create Todo List</button>
        {todoLists.map((list) => (
          <div key={list.id}>
            <h2>{list.title}</h2>
            <ul>
              {list.tasks.map((task) => (
                <li key={task.id}>
                  {task.title}
                  <ul>
                    {task.tags.map((tag) => (
                      <li key={tag.id}>{tag.name}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;