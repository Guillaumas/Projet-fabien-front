import React, {useState} from 'react';
import {fetchData, updateData} from "../tools/requests";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const EditLabelForm = ({label, setLabels}) => {
    const [name, setName] = useState(label.name);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateData(`http://localhost:8080/api/labels/${label.id}`, {name: name}, () => {
            fetchData('http://localhost:8080/api/labels', setLabels);
        });
    };

    return (
        <FormControl onSubmit={handleSubmit}>
            <TextField
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary">Update Label</Button>
        </FormControl>
    );
};

export default EditLabelForm;