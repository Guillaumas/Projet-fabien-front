import React, {useState, useEffect} from 'react';
import LabelPopup from './LabelPopup';
import {postData} from "../tools/requests";
import {useAuth0} from '@auth0/auth0-react';


const TaskForm = async ({onSubmit, initialTask}) => {
    const [task, setTask] = useState({title: '', description: '', completed: false});
    const {getAccessTokenSilently} = useAuth0();
    const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    });

    useEffect(() => {
        if (initialTask) {
            setTask(initialTask);
        }
    }, [initialTask]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTask({...task, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(task);
        postData('/api/tasks', {
            title: task.title,
            description: task.description,
            completed: task.completed
        }, token, (response) => {
            onSubmit(response.data);
            setTask({title: '', description: '', completed: false});
        });
    };

    const handleLabelCreated = (newLabel) => {
        setTask({...task, labels: [...task.labels, newLabel]});
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={task.title}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                placeholder="Description"
                value={task.description}
                onChange={handleChange}
                required
            />
            <LabelPopup onLabelCreated={handleLabelCreated}/>
            <button type="submit">Save Task</button>
        </form>
    );
};

export default TaskForm;
