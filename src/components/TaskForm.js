// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialTask }) => {
    const [task, setTask] = useState({ title: '', description: '', completed: false });

    useEffect(() => {
        if (initialTask) {
            setTask(initialTask);
        }
    }, [initialTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(task);
        setTask({ title: '', description: '', completed: false });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={task.title}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                placeholder="Description"
                value={task.description}
                onChange={handleChange}
                required
            />
            <button type="submit">Save Task</button>
        </form>
    );
};

export default TaskForm;
