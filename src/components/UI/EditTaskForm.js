import React, {useEffect, useState} from 'react';
import {fetchData, updateData} from "../tools/requests";
import {useAuth0} from "@auth0/auth0-react";

const EditTaskForm = ({task, setTasks, setLabels}) => {
    const {getAccessTokenSilently} = useAuth0();
    const [title, setTitle] = useState(task.title);

    useEffect(() => {
        const fetchLabels = async () => {
            const token = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            });
            await fetchData(`/api/tasks/${task.id}/labels`, setLabels, token);
        };
        fetchLabels();
    }, [getAccessTokenSilently, task.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        await updateData(`/api/tasks/${task.id}`, {title: title}, token, () => {
            fetchData('/api/tasks', setTasks, token);
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
            <button type="submit">Update Task</button>
        </form>
    );
};

export default EditTaskForm;
