import React, {useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import EditLabelForm from "./EditLabelForm";
import axiosInstance from "../../axiosConfig";

const Label = ({task, setTask}) => {
    const {getAccessTokenSilently} = useAuth0();

    const [newLabel, setNewLabel] = useState('');
    const [editLabel, setEditLabel] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState(null);

    const handleAddLabel = async () => {
        if (!newLabel) {
            console.log('Label name cannot be null or empty');
            return;
        }
        const token = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        axiosInstance.post('http://localhost:8080/api/labels', {name: newLabel, taskId: task.id}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            setTask({...task, labels: [...task.labels, response.data]});
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