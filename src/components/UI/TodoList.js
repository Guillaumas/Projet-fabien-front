import React, {useState} from 'react';
import {postData, fetchData} from "../tools/requests";
import EditTodoListForm from "./EditTodoListForm";
import TaskForm from "./TaskForm";
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';

const TodoList = ({todoLists, setTodoLists}) => {
    const [newListTitle, setNewListTitle] = useState('');
    const [editTodoList, setEditTodoList] = useState(null);
    const [selectedList, setSelectedList] = useState(null);
    const [creatingTaskForList, setCreatingTaskForList] = useState(null);
    const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);
    const [isTodoListFormVisible, setIsTodoListFormVisible] = useState(false);


    const createTodoList = () => {
        if (!newListTitle) {
            console.log('List title cannot be null or empty');
            return;
        }
        postData('http://localhost:8080/api/todolists', {title: newListTitle}, () => {
            setNewListTitle('');
            fetchData('http://localhost:8080/api/todolists', setTodoLists);
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
        <div className="todo-list">
            <h2>Todo Lists</h2>
            <TextField
                type="text"
                placeholder="New Todo List"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
            />
            <Button onClick={createTodoList} variant="contained" color="primary">Create Todo List</Button>
            <List>
                {todoLists.map((list) => (
                    <ListItem key={list.id} className="todo-list-item">
                        <h2>{list.title}</h2>
                        <Button onClick={() => handleEditTodoList(list)} variant="contained" color="primary">Edit Name</Button>
                        <Button onClick={() => handleCreateTask(list)} variant="contained" color="primary">Create Task</Button>
                        {isTaskFormVisible && creatingTaskForList === list &&
                            <TaskForm onSubmit={handleTaskCreated}/>}
                        {isTodoListFormVisible && selectedList === list.id && editTodoList === list &&
                            <EditTodoListForm todoList={editTodoList} setTodoLists={setTodoLists}/>}
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default TodoList;