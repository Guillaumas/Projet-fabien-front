import React, { useState } from 'react';
import { postData } from "../tools/requests";

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
            <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="New label"
            />
            <button onClick={handleAddLabel}>Add Label</button>
        </div>
    );
};

export default LabelPopup;