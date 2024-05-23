// src/components/Task.js
import React from 'react';

const Task = ({ task, onDelete, onUpdate }) => {
    if (!task) {
        return null;
    }

    return (
        <div className="task">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.completed ? 'Completed' : 'Incomplete'}</p>
            <button onClick={() => onDelete(task.id)}>Delete</button>
            <button onClick={() => onUpdate(task)}>Update</button>
        </div>
    );
};

export default Task;
