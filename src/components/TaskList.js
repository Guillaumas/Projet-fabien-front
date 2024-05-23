// src/components/TaskList.js
import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onDelete, onUpdate }) => {
    if (!Array.isArray(tasks)) {
        return null;
    }

    return (
        <div>
            {tasks.map(task => (
                <Task key={task.id} task={task} onDelete={onDelete} onUpdate={onUpdate} />
            ))}
        </div>
    );
};

export default TaskList;
