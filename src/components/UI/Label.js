import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { postData } from "../tools/requests";

const Label = ({ task, setTask }) => {
    const { getAccessTokenSilently } = useAuth0();
    const [newLabel, setNewLabel] = useState('');

    const handleAddLabel = async () => {
        if (!newLabel) {
            console.log('Label name cannot be null or empty');
            return;
        }
        const token = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE.toString(),
        });
        postData('http://localhost:8080/api/labels', {name: newLabel, taskId: task.id}, (newLabel) => {
            setTask({ ...task, labels: [...task.labels, newLabel] });
            setNewLabel('');
        }, token);
    };

    return (
        <div>
            <h2>Labels</h2>
            <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="New label"
            />
            <button onClick={handleAddLabel}>Add Label</button>
            <ul>
                {task.labels.map(label => (
                    <li key={label.id}>{label.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Label;