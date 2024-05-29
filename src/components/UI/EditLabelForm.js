import React, {useState} from 'react';
import { postData, fetchData } from "../tools/requests";

const EditLabelForm = ({label, setLabels}) => {
    const [name, setName] = useState(label.name);

    const handleSubmit = (e) => {
        e.preventDefault();
        postData(`http://localhost:8080/api/labels/${label.id}`, {name: name}, () => {
            fetchData('http://localhost:8080/api/labels', setLabels);
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