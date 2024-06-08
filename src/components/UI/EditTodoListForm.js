import React, { useState } from 'react';
import {fetchData, updateData} from "../tools/requests";
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';

const EditTodoListForm = ({ todoList, setTodoLists }) => {
    const [title, setTitle] = useState(todoList.title);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateData(`http://localhost:8080/api/todolists/${todoList.id}`, { title: title }, () => {
            fetchData('http://localhost:8080/api/todolists', setTodoLists);
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
            <Button type="submit" variant="contained" color="primary">Update TodoList</Button>
        </FormControl>
    );
};

export default EditTodoListForm;