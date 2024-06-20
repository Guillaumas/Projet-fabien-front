import React, {useEffect, useState} from 'react';
import {fetchData, updateData} from "../tools/requests";
import {useAuth0} from "@auth0/auth0-react";
import {getUserId} from "../../auth";

const EditTodoListForm = ({todoList, setTodoLists, setTasks}) => {
    const [title, setTitle] = useState(todoList.title);
    const {getAccessTokenSilently} = useAuth0();

    useEffect(() => {
        const fetchTasks = async () => {
            const token = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            });
            await fetchData(`/api/todoLists/${todoList.id}/tasks`, setTasks, token);
        };
        fetchTasks();
    }, [getAccessTokenSilently, todoList.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        await updateData(`/api/todolists/${todoList.id}`, {title: title}, token, () => {
            fetchData(`/api/todolists/user/${getUserId()}`, setTodoLists, token);
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
