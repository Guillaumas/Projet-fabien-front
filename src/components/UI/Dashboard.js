import React, {useState, useEffect} from 'react';
import {fetchData, postData} from "../tools/requests";
import TodoList from './TodoList';
import Task from './Task';
import Label from './Label';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';

function Dashboard({onLogout, successMessage}) {
    const [tasks, setTasks] = useState([]);
    const [labels, setLabels] = useState([]);
    const [todoLists, setTodoLists] = useState([]);
    const [selectedTodoList, setSelectedTodoList] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetchData('http://localhost:8080/api/tasks', setTasks);
        fetchData('http://localhost:8080/api/labels', setLabels);
        fetchData('http://localhost:8080/api/todolists', setTodoLists);
    }, []);


    const checkToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            onLogout();
            return;
        }
        postData('http://localhost:8080/api/auth/checkToken', { token: token }, (response) => {
            if (!response.valid) {
                onLogout();
            }
        });
    };

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <div>
            <Typography variant="h1">Dashboard</Typography>
            {successMessage && <p>{successMessage}</p>}
            <Button onClick={onLogout} variant="contained" color="primary">Logout</Button>
            <TodoList todoLists={todoLists} setTodoLists={setTodoLists} setSelectedTodoList={setSelectedTodoList} />
            {selectedTodoList && (selectedTodoList.tasks.length > 0 ? <Task tasks={tasks} setTasks={setTasks} todoListId={selectedTodoList.id} setSelectedTask={setSelectedTask} /> : <Label task={{labels: []}} setTask={setSelectedTask} />)}
            {selectedTask && <Label task={selectedTask} setTask={setSelectedTask} />}
        </div>
    );
}

export default Dashboard;