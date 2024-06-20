import Label from "../UI/Label";

export default class Task {
    constructor(id, title, description, completed, todoListId, labels = []) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.todoListId = todoListId;
        this.labels = labels;
    }

    static fromApiResponse(apiResponse) {
        const labels = apiResponse.labels.map(label => Label.fromApiResponse(label));
        return new Task(apiResponse.id, apiResponse.title, apiResponse.description, apiResponse.completed, apiResponse.todoListId, labels);
    }
}
