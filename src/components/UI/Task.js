import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { postData } from "../tools/requests";
import EditTaskForm from "./EditTaskForm";

const Task = ({ tasks, setTasks, todoListId }) => {
    const { getAccessTokenSilently } = useAuth0();
    const [newTask, setNewTask] = useState('');
    const [editTask, setEditTask] = useState(null);

    const [selectedTask, setSelectedTask] = useState(null);


    const handleAddTask = async () => {
        if (!newTask) {
            console.log('Task name cannot be null or empty');
            return;
        }
        const token = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE.toString(),
        });
        postData('http://localhost:8080/api/tasks', {title: newTask, todoListId: todoListId}, (newTask) => {
            setTasks([...tasks, newTask]);
            setNewTask('');
        }, token);
    };

    const handleEditTask = (task) => {
        setSelectedTask(task.id);
        setEditTask(task);
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
                    <li key={task.id}>
                        <span>{task.title}</span>
                        <button onClick={() => handleEditTask(task)}>Details</button>
                        <button>Tags</button>
                        {selectedTask === task.id && editTask === task && <EditTaskForm task={editTask} setTasks={setTasks} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Task;