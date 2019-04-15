export class UserModel {
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    gender: string;
    dob: string;
    password: string;
    password_confirmation: string;

    constructor(data) {
        this.first_name = data.first_name || '';
        this.last_name = data.last_name || '';
        this.email = data.email || '';
        this.mobile = data.mobile || '';
        this.gender = data.gender || '';
        this.dob = data.dob || '';
        this.password = data.password || '';
        this.password_confirmation = data.password_confirmation || '';
    }
}

export class LoginModel {

    username: string;
    password: string;

    constructor(data) {
        this.username = data.username || '';
        this.password = data.password || '';
    }
}
