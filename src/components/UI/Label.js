import React, {useState} from 'react';
import {postData} from "../tools/requests";
import EditLabelForm from "./EditLabelForm";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
            <Typography variant="h2">Labels</Typography>
            <TextField
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="New label"
            />
            <Button onClick={handleAddLabel} variant="contained" color="primary">Add Label</Button>
            <ul>
                {task.labels.map(label => (
                    <li key={label.id}>
                        <span>{label.name}</span>
                        <Button onClick={() => handleEditLabel(label)} variant="contained" color="primary">Edit</Button>
                        {editLabel === label && <EditLabelForm label={editLabel} setLabels={setTask.labels}/>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Label;