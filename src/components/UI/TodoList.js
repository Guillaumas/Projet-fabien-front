import React, {useContext, useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import EditTodoListForm from "./EditTodoListForm";
import TaskForm from "./TaskForm";
import {fetchData, postData} from "../tools/requests";
import {UserIdContext} from '../../UserIdContext';

const TodoList = () => {
    const {getAccessTokenSilently} = useAuth0();
    const [newListTitle, setNewListTitle] = useState('');
    const [editTodoList, setEditTodoList] = useState(null);
    const [selectedList, setSelectedList] = useState(null);
    const [creatingTaskForList, setCreatingTaskForList] = useState(null);
    const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);
    const [isTodoListFormVisible, setIsTodoListFormVisible] = useState(false);
    const { userId } = useContext(UserIdContext);
    const [todoLists, setTodoLists] = useState([]);

    useEffect(() => {
        if (!userId) return;
        const fetchResources = async () => {
            const token = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            });
            await fetchData(`/api/todolists/user/${userId}`, setTodoLists, token);
        };
        fetchResources();
    }, [getAccessTokenSilently, setTodoLists, userId]);

    const createTodoList = async () => {
        if (!newListTitle) {
            alert('List title cannot be null or empty');
            return;
        }
        const token = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        postData(`/api/todolists/user/${userId}`, {title: newListTitle}, token, () => {
            setNewListTitle('');
            fetchData(`/api/todolists/user/${userId}`, setTodoLists, token);
        });
    };

    const handleEditTodoList = (list) => {
        setSelectedList(list.id);
        setEditTodoList(list);
        setIsTodoListFormVisible(true);
        setIsTaskFormVisible(false);
    };

    const handleCreateTask = (list) => {
        setCreatingTaskForList(list);
        setIsTaskFormVisible(true);
        setIsTodoListFormVisible(false);
    };

    const handleTaskCreated = (newTask) => {
        const updatedLists = todoLists.map(list =>
            list.id === newTask.todoListId
                ? {...list, tasks: [...list.tasks, newTask]}
                : list
        );
        setTodoLists(updatedLists);
        setCreatingTaskForList(null);
    };
console.log(todoLists)



    return (
        <div>
            <h2>Todo Lists</h2>
            <input
                type="text"
                placeholder="New Todo List"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
            />
            <button onClick={createTodoList}>Create Todo List</button>
            {Array.isArray(todoLists) && todoLists.map((list) => (
                <div key={list.id}>
                    <h2>{list.title}</h2>
                    <button onClick={() => handleEditTodoList(list)}>Edit Name</button>
                    <button onClick={() => handleCreateTask(list)}>Create Task</button>
                    {isTaskFormVisible && creatingTaskForList === list &&
                        <TaskForm onSubmit={handleTaskCreated}/>}
                    {isTodoListFormVisible && selectedList === list.id && editTodoList === list &&
                        <EditTodoListForm todoList={editTodoList} setTodoLists={setTodoLists}/>}
                </div>
            ))}
        </div>
    );
};

export default TodoList;
