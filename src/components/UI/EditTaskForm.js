import React, {useState} from 'react';
import {fetchData, updateData} from "../tools/requests";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

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