import React, {useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import EditTodoListForm from "./EditTodoListForm";
import TaskForm from "./TaskForm";
import axiosInstance from "../../axiosConfig";

const TodoList = ({todoLists = [], setTodoLists}) => {
    const {getAccessTokenSilently} = useAuth0();
    const [newListTitle, setNewListTitle] = useState('');
    const [editTodoList, setEditTodoList] = useState(null);
    const [selectedList, setSelectedList] = useState(null);
    const [creatingTaskForList, setCreatingTaskForList] = useState(null);
    const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);
    const [isTodoListFormVisible, setIsTodoListFormVisible] = useState(false);


    const createTodoList = async () => {
        if (!newListTitle) {
            console.log('List title cannot be null or empty');
            return;
        }
        const token = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        axiosInstance.post('http://localhost:8080/api/todolists', {title: newListTitle}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            setNewListTitle('');
            axiosInstance.get('http://localhost:8080/api/todolists', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(response => {
                setTodoLists(response.data);
            });
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