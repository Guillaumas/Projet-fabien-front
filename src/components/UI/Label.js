import React, {useState} from 'react';
import {postData} from "../tools/requests";
import EditLabelForm from "./EditLabelForm";

const Label = ({task, setTask}) => {
    const [newLabel, setNewLabel] = useState('');
    const [editLabel, setEditLabel] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState(null);

    const handleAddLabel = () => {
        if (!newLabel) {
            console.log('Label name cannot be null or empty');
            return;
        }
        postData('http://localhost:8080/api/labels', {name: newLabel, taskId: task.id}, (newLabel) => {
            setTask({...task, labels: [...task.labels, newLabel]});
            setNewLabel('');
        });
    };

    const handleEditLabel = (label) => {
        setSelectedLabel(label.id);
        setEditLabel(label);
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
                    <li key={label.id}>
                        <span>{label.name}</span>
                        <button onClick={() => handleEditLabel(label)}>Edit</button>
                        {editLabel === label && <EditLabelForm label={editLabel} setLabels={setTask.labels}/>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Label;