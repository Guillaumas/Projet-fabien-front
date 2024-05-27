import React, { useState } from 'react';
import { postData } from "../tools/requests";

const Label = ({ task, setTask }) => {
    const [newLabel, setNewLabel] = useState('');

    const handleAddLabel = () => {
        if (!newLabel) {
            console.log('Label name cannot be null or empty');
            return;
        }
        postData('http://localhost:8080/api/labels', {name: newLabel, taskId: task.id}, (newLabel) => {
            setTask({ ...task, labels: [...task.labels, newLabel] });
            setNewLabel('');
        });
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