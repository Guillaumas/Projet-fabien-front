import React from 'react';
import Task from '../model/Task';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';

const TaskList = ({ tasks, onDelete, onUpdate }) => {
    if (!Array.isArray(tasks)) {
        return null;
    }

    return (
        <List>
            {tasks.map(task => (
                <ListItem key={task.id}>
                    <Task task={task} onDelete={onDelete} onUpdate={onUpdate} />
                </ListItem>
            ))}
        </List>
    );
};

export default TaskList;