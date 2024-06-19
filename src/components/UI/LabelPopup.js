import React, {useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import axiosInstance from "../../axiosConfig";

const LabelPopup = ({ onLabelCreated }) => {
    const { getAccessTokenSilently } = useAuth0();
    const [newLabel, setNewLabel] = useState('');

    const handleAddLabel = async () => {
    if (!newLabel) {
        console.log('Label name cannot be null or empty');
        return;
    }
    const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    });
    axiosInstance.post('http://localhost:8080/api/labels', {name: newLabel}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(response => {
        onLabelCreated(response.data);
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