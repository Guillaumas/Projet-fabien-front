import React, {useState} from 'react';
import {postData, fetchData} from "../tools/requests";
import EditTodoListForm from "./EditTodoListForm";
import TaskForm from "./TaskForm";

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
        <div>
            <h2>Todo Lists</h2>
            <input
                type="text"
                placeholder="New Todo List"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
            />
            <button onClick={createTodoList}>Create Todo List</button>
            {todoLists.map((list) => (
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