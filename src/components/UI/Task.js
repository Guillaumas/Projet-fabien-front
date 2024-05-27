import React, { useState } from 'react';
import { postData } from "../tools/requests";

const Task = ({ tasks, setTasks, todoListId }) => {
    const [newTask, setNewTask] = useState('');

    const handleAddTask = () => {
        if (!newTask) {
            console.log('Task name cannot be null or empty');
            return;
        }
        postData('http://localhost:8080/api/tasks', {title: newTask, todoListId: todoListId}, (newTask) => {
            setTasks([...tasks, newTask]);
            setNewTask('');
        });
    };

    return (
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
    );
};

export default Task;