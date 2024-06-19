import React, {useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import TodoList from './TodoList';
import Task from './Task';
import Label from './Label';
import axiosInstance from "../../axiosConfig";

function Dashboard({onLogout, successMessage}) {
    const {isAuthenticated, logout, getAccessTokenSilently, user, isLoading} = useAuth0();
    const [tasks, setTasks] = useState([]);
    const [labels, setLabels] = useState([]);
    const [todoLists, setTodoLists] = useState([]);
    const [selectedTodoList, setSelectedTodoList] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const fetchResources = async () => {
            const token = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            });
            axiosInstance.get('http://localhost:8080/api/tasks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(response => {
                setTasks(response.data);
            });
            axiosInstance.get('http://localhost:8080/api/labels', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(response => {
                setLabels(response.data);
            });
            axiosInstance.get('http://localhost:8080/api/todolists', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(response => {
                setTodoLists(response.data);
            });
        };
        fetchResources();
    }, [getAccessTokenSilently]);
    if (isLoading) return <div>Loading</div>

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {user.name}</p>
            {successMessage && <p>{successMessage}</p>}
            <button onClick={onLogout}>Logout</button>
            <TodoList todoLists={todoLists} setTodoLists={setTodoLists} setSelectedTodoList={setSelectedTodoList}/>
            {selectedTodoList && (selectedTodoList.tasks.length > 0 ?
                <Task tasks={tasks} setTasks={setTasks} todoListId={selectedTodoList.id}
                      setSelectedTask={setSelectedTask}/> :
                <Label task={{labels: []}} setTask={setSelectedTask}/>)} {selectedTask &&
            <Label task={selectedTask} setTask={setSelectedTask}/>}
        </div>
    );
}

export default Dashboard;