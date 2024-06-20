import React, {useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {updateData, fetchData} from "../tools/requests";

const EditLabelForm = ({label, setLabels}) => {
    const {getAccessTokenSilently} = useAuth0();
    const [name, setName] = useState(label.name);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        await updateData(`/api/labels/${label.id}`, {name: name}, token, () => {
            fetchData('/api/labels', setLabels, token);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <button type="submit">Update Label</button>
        </form>
    );
};

export default EditLabelForm;
