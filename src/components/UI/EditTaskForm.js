import React, {useState} from 'react';
import {postData, fetchData} from "../tools/requests";

const EditTaskForm = ({task, setTasks}) => {
    const [title, setTitle] = useState(task.title);

    const handleSubmit = (e) => {
        e.preventDefault();
        postData(`http://localhost:8080/api/tasks/${task.id}`, {title: title}, () => {
            fetchData('http://localhost:8080/api/tasks', setTasks);
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