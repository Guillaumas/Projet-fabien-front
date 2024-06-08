import React, {useState} from 'react';
import {fetchData, updateData} from "../tools/requests";
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';

const EditTaskForm = ({task, setTasks}) => {
    const [title, setTitle] = useState(task.title);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateData(`http://localhost:8080/api/tasks/${task.id}`, {title: title}, () => {
            fetchData('http://localhost:8080/api/tasks', setTasks);
        });
    };

    return (
        <FormControl onSubmit={handleSubmit}>
            <TextField
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary">Update Task</Button>
        </FormControl>
    );
};

export default EditTaskForm;