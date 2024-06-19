import React, { useState } from 'react';
import {fetchData, updateData} from "../tools/requests";

const EditTodoListForm = ({ todoList, setTodoLists }) => {
    const [title, setTitle] = useState(todoList.title);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateData(`http://localhost:8080/api/todolists/${todoList.id}`, { title: title }, () => {
            fetchData('http://localhost:8080/api/todolists', setTodoLists);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <button type="submit">Update TodoList</button>
        </form>
    );
};

export default EditTodoListForm;