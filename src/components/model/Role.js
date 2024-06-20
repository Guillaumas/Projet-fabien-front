export default class Role {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static fromApiResponse(apiResponse) {
        return new Role(apiResponse.id, apiResponse.name);
    }
}
