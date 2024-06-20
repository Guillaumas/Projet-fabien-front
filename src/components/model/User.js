export default class User {
    constructor(id, username, role, auth0Id, todoLists = [], labels = []) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.auth0Id = auth0Id;
        this.todoLists = todoLists;
        this.labels = labels;
    }

    static fromApiResponse(apiResponse) {
        const role = Role.fromApiResponse(apiResponse.role);
        return new User(apiResponse.id, apiResponse.username, role, apiResponse.auth0Id);
    }
}
