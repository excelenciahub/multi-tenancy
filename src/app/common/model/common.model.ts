export class ErrorModel {
    message: string;
    status: boolean;

    constructor(data) {
        this.message = data.message || '';
        this.status = data.status || false;
    }
}

export class ResponseModel {
    message: string;
    status: boolean;
    token: string;

    constructor(data) {
        this.message = data.message || '';
        this.token = data.token;
        this.status = data.status || false;
    }
}
