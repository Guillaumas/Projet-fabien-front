import React, {useState} from 'react';
import {postData} from "../tools/requests";
import EditTaskForm from "./EditTaskForm";

const Task = ({tasks, setTasks, todoListId}) => {
    const [newTask, setNewTask] = useState('');
    const [editTask, setEditTask] = useState(null);

    const [selectedTask, setSelectedTask] = useState(null);


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