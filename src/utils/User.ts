export class User {
    token: string;
    username: string;
    email: string;

    constructor() {

    }

    private static get(key: string) {
        if (this[key]) return this[key]

        if (!localStorage.getItem(key)) return null

        this[key] = localStorage.getItem(key)
        return this[key]
    }

    public IsLogin(): boolean {
        return !!this.getToken()
    }

    public setToken(token: string) {
        localStorage.setItem('token', token);
    }

    public getToken(): string | null {
        return User.get('token')
    }

    public setEmail(email: string) {
        localStorage.setItem('email', email);
    }

    public getEmail(): string | null {
        return User.get('email')
    }

    public setUserName(UserName: string) {
        localStorage.setItem('username', UserName);
    }

    public getUserName(): string | null {
        return User.get('username')
    }

    public clear(){
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('token');
    }

}
