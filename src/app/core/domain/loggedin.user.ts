export class LoggedInUser {
    constructor(access_token: string, username: string, fullName: string, email: string, avatar: string) {
        this.access_token = access_token;
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.avatar = avatar;
    }
    // tslint:disable-next-line:member-ordering
    public id: string;
    // tslint:disable-next-line:member-ordering
    public access_token: string;
    // tslint:disable-next-line:member-ordering
    public username: string;
    // tslint:disable-next-line:member-ordering
    public fullName: string;
    // tslint:disable-next-line:member-ordering
    public email: string;
    // tslint:disable-next-line:member-ordering
    public avatar: string;
}
