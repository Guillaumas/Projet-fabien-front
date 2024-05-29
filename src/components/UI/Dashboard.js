import React, {useState, useEffect} from 'react';
import {fetchData, postData} from "../tools/requests";
import TodoList from './TodoList';
import Task from './Task';
import Label from './Label';

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
            <h1>Dashboard</h1>
            {successMessage && <p>{successMessage}</p>}
            <button onClick={onLogout}>Logout</button>
            <TodoList todoLists={todoLists} setTodoLists={setTodoLists} setSelectedTodoList={setSelectedTodoList} />
            {selectedTodoList && (selectedTodoList.tasks.length > 0 ? <Task tasks={tasks} setTasks={setTasks} todoListId={selectedTodoList.id} setSelectedTask={setSelectedTask} /> : <Label task={{labels: []}} setTask={setSelectedTask} />)}            {selectedTask && <Label task={selectedTask} setTask={setSelectedTask} />}
        </div>
    );
}

export default Dashboard;