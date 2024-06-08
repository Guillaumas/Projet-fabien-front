import React, { useState } from 'react';
import { postData } from "../tools/requests";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const LabelPopup = ({ onLabelCreated }) => {
    const [newLabel, setNewLabel] = useState('');

    const handleAddLabel = () => {
        if (!newLabel) {
            console.log('Label name cannot be null or empty');
            return;
        }
        postData('http://localhost:8080/api/labels', {name: newLabel}, (newLabel) => {
            onLabelCreated(newLabel);
            setNewLabel('');
        });
    };

    return (
        <div>
            <TextField
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="New label"
            />
            <Button onClick={handleAddLabel} variant="contained" color="primary">Add Label</Button>
        </div>
    );
};

export default LabelPopup;