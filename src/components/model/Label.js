export default class Label {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static fromApiResponse(apiResponse) {
        return new Label(apiResponse.id, apiResponse.name);
    }
}
