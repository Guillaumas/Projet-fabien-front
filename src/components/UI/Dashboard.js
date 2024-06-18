import React, {useState, useEffect} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import TodoList from './TodoList';
import Task from './Task';
import Label from './Label';
import { fetchData, postData } from '../tools/requests';

function Dashboard({onLogout, successMessage}) {
    const { isAuthenticated, logout, getAccessTokenSilently } = useAuth0();
    const [tasks, setTasks] = useState([]);
    const [labels, setLabels] = useState([]);
    const [todoLists, setTodoLists] = useState([]);
    const [selectedTodoList, setSelectedTodoList] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const fetchResources = async () => {
            const token = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE.toString(),
            });
            console.log(token);
            fetchData('http://localhost:8080/api/tasks', setTasks, token);
            fetchData('http://localhost:8080/api/labels', setLabels, token);
            fetchData('http://localhost:8080/api/todolists', setTodoLists, token);
        };
        fetchResources();
    }, [getAccessTokenSilently]);


    useEffect(() => {
        if (!isAuthenticated) {
            logout();
        }
    }, [isAuthenticated, logout]);

    return (
        <div>
            <h1>Dashboard</h1>
            {successMessage && <p>{successMessage}</p>}
            <button onClick={onLogout}>Logout</button>
            <TodoList todoLists={todoLists} setTodoLists={setTodoLists} setSelectedTodoList={setSelectedTodoList} />
            {selectedTodoList && <Task tasks={tasks} setTasks={setTasks} todoListId={selectedTodoList.id} setSelectedTask={setSelectedTask} />}
            {selectedTask && <Label task={selectedTask} setTask={setSelectedTask} />}
        </div>
    );
}

export default Dashboard;