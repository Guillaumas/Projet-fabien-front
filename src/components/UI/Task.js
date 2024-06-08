import React, {useState} from 'react';
import {postData} from "../tools/requests";
import EditTaskForm from "./EditTaskForm";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const Task = ({tasks, setTasks, todoListId}) => {
    const [newTask, setNewTask] = useState('');
    const [editTask, setEditTask] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleAddTask = () => {
        if (!newTask) {
            console.log('Task name cannot be null or empty');
            return;
        }
        postData('http://localhost:8080/api/tasks', {title: newTask, todoListId: todoListId}, (newTask) => {
            setTasks([...tasks, newTask]);
            setNewTask('');
        });
    };

    const handleEditTask = (task) => {
        setSelectedTask(task.id);
        setEditTask(task);
    };

    return (
        <div>
            <h2>Tasks</h2>
            <TextField
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="New task"
            />
            <Button onClick={handleAddTask} variant="contained" color="primary">Add Task</Button>
            <List>
                {tasks.map(task => (
                    <ListItem key={task.id}>
                        <span>{task.title}</span>
                        <Button onClick={() => handleEditTask(task)} variant="contained" color="primary">Details</Button>
                        <Button variant="contained" color="primary">Tags</Button>
                        {selectedTask === task.id && editTask === task && <EditTaskForm task={editTask} setTasks={setTasks} />}
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Task;