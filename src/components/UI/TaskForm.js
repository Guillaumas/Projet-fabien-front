import React, { useState, useEffect } from 'react';
import LabelPopup from './LabelPopup';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { FormControl } from '@mui/material';

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

    const handleLabelCreated = (newLabel) => {
        setTask({ ...task, labels: [...task.labels, newLabel] });
    };

    return (
        <FormControl onSubmit={handleSubmit}>
            <TextField
                type="text"
                name="title"
                placeholder="Title"
                value={task.title}
                onChange={handleChange}
                required
            />
            <TextField
                multiline
                name="description"
                placeholder="Description"
                value={task.description}
                onChange={handleChange}
                required
            />
            <LabelPopup onLabelCreated={handleLabelCreated} />
            <Button type="submit" variant="contained" color="primary">Save Task</Button>
        </FormControl>
    );
};

export default TaskForm;