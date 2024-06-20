import Task from './Task';
import User from './User';

export default class TodoList {
    constructor(id, title, user, tasks = []) {
        this.id = id;
        this.title = title;
        this.user = user;
        this.tasks = tasks;
    }

    static fromApiResponse(apiResponse) {
        const user = User.fromApiResponse(apiResponse.user);
        const tasks = apiResponse.tasks.map(task => Task.fromApiResponse(task));
        return new TodoList(apiResponse.id, apiResponse.title, user, tasks);
    }
}
